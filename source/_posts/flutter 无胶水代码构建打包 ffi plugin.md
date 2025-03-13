---
title: flutter 无胶水代码构建打包 ffi plugin
date: 2024-12-02T09:35:00
updated: 2024-12-02T09:40:00
permalink: 
top: 0
comments: 
copyright: true
tags:
  - flutter
  - ffi
categories: flutter
keywords: flutter
description:
---
flutter ffi plugin 开发有3种模式:
- 有 ffi 源码, flutter 可以直接打包构建
- 没有 ffi 源码,只有预购建好的库或者二进制文件
- 有 ffi 源码,也有二进制
其中1和3都比较简单,因为 flutter ffi plugin 模版默认都把构建打包脚本生成好了,只需要修改一下即可用.
模式2在全网搜了没有找到先例. 本文就是主要讨论如何在 flutter ffi plugin 项目中构建打包预编译二进制文件而不需要胶水代码.

这里以我自己写的 flutter js engine 为例.
> 社区已经有一个 [flutter_js](https://pub.dev/packages/flutter_js) 引擎, 但是在使用过程中发现其在同时运行多个 JSContext 时会被顺序执行,无法并行执行.
> 所以借鉴这个项目,实现了一个基于 JavaScriptCore 和 Quickjs 引擎的 flutter 库.支持 Android/iOS/MacOS/Windows/Linux(后续计划通过基于 quickjs-wasm 支持 Web).
> [flujs](https://gitee.com/humphreyos/flujs)

1、依赖库打包

依赖的 JavaScriptCore iOS/macOS 系统默认自带,所以不需要单独打包.

quickjs 主要有两个版本: 
- [bellard 原版](https://bellard.org/quickjs/) 截止目前最新版是 2024-01-13
- [quickjs-ng](https://github.com/quickjs-ng/quickjs) 截止目前最新版是 0.7.0
因为 quickjs-ng 项目还在持续维护更新,所以这里选择它.

1) git clone quickjs 并 checkout 到 v0.7.0 tag
2) 编写 xmake 脚本,见[xmake quickjs-ng 交叉编译实践](https://blog.dang8080.cn/2024/11/17/09/)
3) 编译生成跨平台动态库
4) 将各个平台的动态库打包为 tar.gz 

2、新建 flutter ffi plugin project

#android 
~~在 `build.gradle` `dependencies` 中添加 `implementation('cn.humphreyd.flujs-android:quickjs:0.6.1.2')`~~
> 上面是需要手动将 qjs 动态库打包为aar,然后发布到 mvn 仓库.详情见[安卓发布纯so库到maven](https://blog.dang8080.cn/2024/12/01/00/)

> 相比较之下还是比较麻烦,所以直接使用 gradle 脚本下载 so 到 jniLibs 并打包

```groovy
def targetAbis = android.defaultConfig.ndk.abiFilters
def vers = Prop("flujs.qjs.qjs_version", "8.0.0")
def baseUrl = Prop("flujs.qjs.baseUrl", "https://gitee.com/flujs_project/flujs_libs_quickjs/releases/download/${vers}")
def forceDownload = Prop("flujs.qjs.force_download", "false").toBoolean()

targetAbis.each { abi ->
    println("[🌹] ${abi}")

    def jniLibsDir = file("$projectDir/src/main/jniLibs/${abi}")
    def soFile = file("${jniLibsDir}/libqjs.so")

    if (forceDownload || !soFile.exists()) {
        def downloadTaskName = "downloadQjs${abi.capitalize()}"
        tasks.register(downloadTaskName, DownloadTask) {
            group 'QuickJS'
            arch = abi
            sourceUrl = "${baseUrl}/qjs_android_${abi}.tar.gz"
            destDir = file("${project.buildDir}/tmp/qjs/${abi}")
        }

        def tarFile = file("${tasks.getByName(downloadTaskName).destDir}/qjs_android_${abi}.tar.gz")

        def extractTaskName = "extractQjs${abi.capitalize()}"
        tasks.register(extractTaskName, Copy) {
            group 'QuickJS'
            dependsOn tasks.getByName(downloadTaskName)
            from({ tarTree(
                tarFile.path.endsWith('.gz') ? 
                    resources.gzip(tarFile) : 
                    resources.bzip2(tarFile)
            )})
            into "$projectDir/src/main/jniLibs/${abi}"
            includeEmptyDirs = false
        }
        preBuild.dependsOn tasks.getByName(extractTaskName)
    } else {
        println("[🌹] libqjs.so already exists for ${abi}, skipping download and extraction. use flutter clean, and rerun  if you insist on download and extraction. or Set flujs.qjs.force_download=true to force download.")
    }
}

class DownloadTask extends DefaultTask {
    @Input String arch
    @Input String sourceUrl
    @Input boolean overwrite = false
    @OutputDirectory File destDir

    @TaskAction
    void download() {
        destDir.mkdirs()
        def outputFile = new File(destDir, "qjs_android_${arch}.tar.gz")
        println("[🌹] DownloadTask ✈️ arch=${arch},sourceUrl=${sourceUrl},overwrite=${overwrite},outputFile=${outputFile}")
        if (!outputFile.exists() || overwrite) {
            URL url = new URL(sourceUrl)
            HttpURLConnection connection = (HttpURLConnection) url.openConnection()
            connection.setInstanceFollowRedirects(true) // 启用自动重定向
            connection.setRequestProperty("User-Agent", "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36") // 添加 User-Agent
            connection.connect()

            if (connection.getResponseCode() == HttpURLConnection.HTTP_OK) {
                connection.getInputStream().withStream { input ->
                    outputFile.withOutputStream { it << input }
                }
            } else {
                throw new IOException("Failed to download file: HTTP ${connection.getResponseCode()}, ${connection.getURL().toString()}")
            }
        }
    }
}

def Prop(String name, String defaultValue = null) {
    if (project.hasProperty(name)) {
        return project.findProperty(name)
    } else if (System.getenv(name) != null) {
        return System.getenv(name)
    } else {
        return defaultValue
    }
}
```

```ruby
require "open-uri"
require "pathname"
require "fileutils"
require "digest"

QJS_VERSION = ENV["QJS_VERSION"] || "0.8.0".freeze
QJS_BASEURL = ENV["QJS_BASEURL"] || "https://gitee.com/flujs_project/flujs_libs_quickjs/releases/download/#{QJS_VERSION}"

class FlujsUtil
  attr_reader :framework_path

  def initialize(platform)
    @framework_path = ""
    @force_download = ENV["FORCE_DOWNLOAD"] == "true"

    framework_lib = "Frameworks/libqjs.dylib"
    cache_lib = ".cache/libqjs.dylib"

    if File.exist?(framework_lib) && !@force_download
      puts "[darwin] libqjs.dylib already exists in Frameworks/, skipping download and extraction.use flutter clean, and rerun  if you insist on download and extraction. or set FORCE_DOWNLOAD=true"
      @framework_path = "Frameworks/"
      return
    elsif File.exist?(cache_lib)
      puts "[darwin] libqjs.dylib found in .cache/, execute extraction."
      @framework_path = "Frameworks/"
      FileUtils.mkdir_p(@framework_path)
      FileUtils.cp(cache_lib, @framework_path)
      return
    end

    FileUtils.mkdir_p('.cache')
    puts "[darwin] #{platform} libqjs.dylib not found, downloading and extracting..."
    _download(platform)
  end

  def _download(platform)
    # make destdir
    dest_dir = ".cache/"
    tar_name = ENV["QJS_TAR_NAME"] || "qjs_#{platform}.tar.gz"
    tar_path = "#{dest_dir}/#{tar_name}"
    # fetch from remote
    _fetch("#{QJS_BASEURL}/#{tar_name}", tar_path)
    # unzip
    _unzip(tar_path, dest_dir)
    @framework_path = "Frameworks/" 
    FileUtils.mkdir_p("#{@framework_path}")
    FileUtils.cp("#{dest_dir}/libqjs.dylib", "#{@framework_path}")
  end

  def _unzip(file, destination)
    system("tar -xzf #{file} -C #{destination}")
  end

  def _fetch(link, dest)
    begin
      URI.open(link) do |file|
        File.open(dest, "wb") do |output|
          output.write(file.read)
        end
      end
    puts "[_fetch] succeed #{dest}"
    rescue StandardError => e
      puts "[_fetch] failed: #{e.message}, #{link}"
    end
  end

end
```
#iOS
```ruby
flujsutil = FlujsUtil.new('iphoneos')
spec.vendored_libraries = "Frameworks/libqjs.dylib"

spec.preserve_paths = "Frameworks/libqjs.dylib"
```
#macOS
```ruby
flujsutil = FlujsUtil.new('macosx')
spec.vendored_libraries = "Frameworks/libqjs.dylib"

spec.preserve_paths = "Frameworks/libqjs.dylib"
```
#linux/windows
linux 和 mac 都使用 cmake 编译,所以这里共用一套逻辑.

 `script/artifact.cmake`  
 ```cmake
 # Set BASEURL from environment variable or use default
if(DEFINED ENV{BASEURL})
  set(BASEURL "$ENV{BASEURL}")
else()
  set(BASEURL "https://gitee.com/flujs_project/flujs_libs_quickjs/releases/download")
endif()

# Set QJS_VERSION from environment variable or use default
if(DEFINED ENV{QJS_VERSION})
  set(QJS_VERSION "$ENV{QJS_VERSION}")
else()
  set(QJS_VERSION "0.8.0")
endif()

if(DEFINED ENV{QJS_TAR_NAME})
  set(QJS_TAR_NAME "$ENV{QJS_TAR_NAME}")
elseif(NOT DEFINED QJS_TAR_NAME)
  if(CMAKE_HOST_SYSTEM_NAME MATCHES "Linux")
    if (CMAKE_HOST_SYSTEM_PROCESSOR STREQUAL "x86_64")
      set(QJS_TAR_NAME "qjs_linux_x86_64.tar.gz")
    elseif (CMAKE_HOST_SYSTEM_PROCESSOR STREQUAL "arm64")
      set(QJS_TAR_NAME "qjs_linux_arm64.tar.gz")
    else()
      message(FATAL_ERROR "Unknown CPU!")
    endif()
  elseif(CMAKE_HOST_SYSTEM_NAME MATCHES "Windows")
    if (CMAKE_HOST_SYSTEM_PROCESSOR STREQUAL "X86" OR ${CMAKE_HOST_SYSTEM_PROCESSOR} STREQUAL "AMD64" OR ${CMAKE_HOST_SYSTEM_PROCESSOR} STREQUAL "IA64")
      set(QJS_TAR_NAME "qjs_mingw_x86_64.zip")
    elseif (CMAKE_HOST_SYSTEM_PROCESSOR STREQUAL "ARM64")
      set(CPU "arm64")
      message(FATAL_ERROR "Unknown CPU!")
    else()
      message(FATAL_ERROR "Unknown CPU!")
    endif()
  endif()
endif()

if(DEFINED ENV{FORCE_DOWNLOAD})
  set(FORCE_DOWNLOAD "$ENV{FORCE_DOWNLOAD}")
else()
  set(FORCE_DOWNLOAD FALSE)
endif()

# download quickjs and set QJS_LIBRARY
function(prepareQJS)
  set(QJS_TAR_PATH "${CMAKE_BINARY_DIR}/${QJS_TAR_NAME}")

  if(CMAKE_HOST_SYSTEM_NAME MATCHES "Linux")
    set(QJS_LIBRARY "${CMAKE_BINARY_DIR}/libqjs.so") # cannot use PARENT_SCOPE, it will not check the existence of QJS_LIBRARY
  elseif(CMAKE_HOST_SYSTEM_NAME MATCHES "Windows")
    set(QJS_LIBRARY "${CMAKE_BINARY_DIR}/release/lib/libqjs.dll")
  endif()

  message(STATUS "[prepareQJS] QJS_LIBRARY = ${QJS_LIBRARY} ${FORCE_DOWNLOAD}")
  if(EXISTS "${QJS_LIBRARY}" AND NOT FORCE_DOWNLOAD)
    message(STATUS "[prepareQJS] ${QJS_LIBRARY} already exists, skipping download and extraction. use flutter clean, and rerun  if you insist on download and extraction. or set FORCE_DOWNLOAD=true")
    set(QJS_LIBRARY "${QJS_LIBRARY}" PARENT_SCOPE)
    return()
  endif()

  message(STATUS "[prepareQJS] ${QJS_LIBRARY_PATH} not found, downloading and extracting...")
  set(URL "${BASEURL}/${QJS_VERSION}/${QJS_TAR_NAME}")
  downloadVerify("${URL}" ${QJS_TAR_PATH})
  if(CMAKE_HOST_SYSTEM_NAME MATCHES "Linux")
    add_custom_target(
      "QJS_EXTRACT"
      ALL
      COMMAND "${CMAKE_COMMAND}" -E tar xz "${QJS_TAR_PATH}"
      WORKING_DIRECTORY "${CMAKE_BINARY_DIR}"
      COMMENT "Extracting QJS library"
    )
    set(QJS_LIBRARY "${CMAKE_BINARY_DIR}/libqjs.so" PARENT_SCOPE)
  elseif(CMAKE_HOST_SYSTEM_NAME MATCHES "Windows")
    execute_process(COMMAND powershell -Command "Expand-Archive -Path '${QJS_TAR_PATH}' -DestinationPath '${CMAKE_BINARY_DIR}' -Force" RESULT_VARIABLE extractResult)
    if(NOT extractResult EQUAL 0)
        message(FATAL_ERROR "Failed to extract ZIP file: ${QJS_TAR_PATH}")
    endif()
    set(QJS_LIBRARY "${CMAKE_BINARY_DIR}/release/lib/libqjs.dll" PARENT_SCOPE)
  endif()
endfunction(prepareQJS)

# download url resource to locationForArchive
function(downloadVerify url locationForArchive )
  message(STATUS "[downloadVerify] info = ${url}")
  if (EXISTS "${locationForArchive}" AND NOT FORCE_DOWNLOAD)
    message(STATUS "[downloadVerify] ${locationForArchive} exists!.")
    return()
  endif()

  if(NOT EXISTS "${locationForArchive}")
    message(STATUS "[downloadVerify] downloading archive from ${url}...")
    file(DOWNLOAD "${url}" "${locationForArchive}"
      STATUS download_status
      LOG download_log)
    message(STATUS "[downloadVerify] archive saved to ${locationForArchive}")
    # check download status
    list(GET download_status 0 status_code)
    if(NOT status_code EQUAL 0)
      message(FATAL_ERROR "Error downloading ${download_log}")
    endif()
  endif()
  message(STATUS "[downloadVerify] succeed! ${locationForArchive}")
endfunction(downloadVerify url md5 locationForArchive)

# check target dir is empty, return result if it is true;
function(checkDirectoryEmpty dir result)
  if(EXISTS "${dir}")
    file(GLOB dir_contents "${dir}/*")
    if(dir_contents)
      set(${result} FALSE PARENT_SCOPE)
    else()
      set(${result} TRUE PARENT_SCOPE)
      message(WARN "[checkDirectoryEmpty] Directory ${dir} exists but empty!")
    endif()
  else()
    set(${result} TRUE PARENT_SCOPE)
    message(WARN "[checkDirectoryEmpty] Directory ${dir} not exists!")
  endif()
endfunction(checkDirectoryEmpty)
```

> 因为 linux/windows 公用一套逻辑,所以将 QJS 设置为 IMPORTED 对象,并拆分为共用的 CMakeLists.txt, 然后在各自 module 中 add_subdirectory 即可
```cmake
cmake_minimum_required(VERSION 3.10)
project(${PROJECT_NAME}  VERSION 0.0.1 LANGUAGES C)

set(QJS "quickjs") # for current scope
set(QJS ${QJS} PARENT_SCOPE) # for parent scope

# add qjs prebuilt library
include("${CMAKE_CURRENT_SOURCE_DIR}/../script/artifact.cmake")
prepareQJS()
add_library(${QJS} SHARED IMPORTED GLOBAL)
set_target_properties(${QJS} PROPERTIES IMPORTED_LOCATION "${QJS_LIBRARY}")
```

最后在 linux/windows 目录的 `CMakeLists.txt` 中引入即可
```cmake
add_subdirectory("${CMAKE_CURRENT_SOURCE_DIR}/../qjs/src" "${CMAKE_CURRENT_BINARY_DIR}/shared")

# List of absolute paths to libraries that should be bundled with the plugin.
# This list could contain prebuilt libraries, or libraries created by an
# external build triggered from this build file.
set("flujs_qjs_bundled_libraries" $<TARGET_FILE:${QJS}> PARENT_SCOPE)
```
> 注意: linux/windows cmake 中必须要设置 `set("flujs_qjs_bundled_libraries" $<TARGET_FILE:${QJS}> PARENT_SCOPE)`  `$<TARGET_FILE:${QJS}>` 就是 `libqjs.dll/libqjs.so` 的位置,这样打包时 cmake 才会通过 install 命令将动态库复制到产物目录

> [flujs](https://gitee.com/flujs_project/flujs)
> [flujs_libs_quickjs](https://gitee.com/flujs_project/flujs_libs_quickjs)
> [flujs_android_quickjs](https://gitee.com/flujs_project/flujs_android_quickjs)