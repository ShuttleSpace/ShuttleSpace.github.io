---
title:
  "{ title }": 
date:
  "{ date }": 
updated:
  "{ date }": 
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
flutter ffi plugin 开发有3中模式:
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

2、新建 flutter ffi plugin project

#android 
在 `build.gradle` `dependencies` 中添加 `implementation('cn.humphreyd.flujs-android:quickjs:0.6.1.2')`
#iOS
```ruby
archs = ENV['ARCHS'] || 'arm64'
spec.subspec 'Framework' do |framework| 
framework.vendored_frameworks = "Frameworks/qjs.xcframework/ios-#{archs}/qjs.framework"
end
```
#macOS
```ruby
archs = ENV['ARCHS'] || 'arm64'
spec.subspec 'Framework' do |framework|
# framework.vendored_frameworks = 'Frameworks/**/*.framework'
framework.vendored_frameworks = "Frameworks/qjs.xcframework/macos-#{archs}/qjs.framework"
end
```
#linux/windows
linux 和 mac 都使用 cmake 编译,所以这里共用一套逻辑.

 `script/artifact.cmake`  
 ```cmake
 set(BASEURL_GITEE "https://gitee.com/flujs/flujs_libs_quickjs/releases/download/")
set(BASEURL_GITHUB "https://gitee.com/flujs/flujs_libs_quickjs/releases/download/")
set(QJS_VERSION "v0.6.1.1")
set(QJS_LINUX_ARCHIVE_arm64_MD5 "fde244492cd7c525cad267a03955188b")
set(QJS_LINUX_ARCHIVE_x86_64_MD5 "b83e80e0007be64e81593f6fd5647c30")
set(QJS_MINGW_ARCHIVE_x86_64_MD5 "74150ccfa52c43ca462dd6cd8b891bfd")

if(CMAKE_HOST_SYSTEM_NAME MATCHES "Linux")
  if (CMAKE_HOST_SYSTEM_PROCESSOR STREQUAL "x86_64")
    set(QJS_LIB_NAME "qjs_linux_x86_64.tar.gz")
    set(QJS_ARCHIVE_MD5 "${QJS_LINUX_ARCHIVE_x86_64_MD5}")
  elseif (CMAKE_HOST_SYSTEM_PROCESSOR STREQUAL "arm64")
    set(QJS_LIB_NAME "qjs_linux_arm64.tar.gz")
    set(QJS_ARCHIVE_MD5 "${QJS_LINUX_ARCHIVE_arm64_MD5}")
  else()
    message(FATAL_ERROR "Unknown CPU!")
  endif()
elseif(CMAKE_HOST_SYSTEM_NAME MATCHES "Windows")
  if (CMAKE_HOST_SYSTEM_PROCESSOR STREQUAL "X86" OR ${CMAKE_HOST_SYSTEM_PROCESSOR} STREQUAL "AMD64" OR ${CMAKE_HOST_SYSTEM_PROCESSOR} STREQUAL "IA64")
    set(QJS_LIB_NAME "qjs_mingw_x86_64.zip")
    set(QJS_ARCHIVE_MD5 "${QJS_MINGW_ARCHIVE_x86_64_MD5}")
  elseif (CMAKE_HOST_SYSTEM_PROCESSOR STREQUAL "ARM64")
    set(CPU "arm64")
    message(FATAL_ERROR "Unknown CPU!")
  else()
    message(FATAL_ERROR "Unknown CPU!")
  endif()
endif()

# download quickjs and set QJS_LIBRARY
function(prepareQJS)
  set(QJS_LIB_CACHE "${CMAKE_BINARY_DIR}/${QJS_LIB_NAME}")
  set(QJS_LIB_PATH "${CMAKE_BINARY_DIR}/release")
  set(URL "${BASEURL_GITEE}/${QJS_VERSION}/${QJS_LIB_NAME}")
  downloadVerify("${URL}" ${QJS_LIB_CACHE} "${QJS_ARCHIVE_MD5}")
  if(CMAKE_HOST_SYSTEM_NAME MATCHES "Linux")
    add_custom_target(
      "QJS_EXTRACT"
      ALL
      COMMAND "${CMAKE_COMMAND}" -E tar xz "${QJS_LIB_CACHE}"
      WORKING_DIRECTORY "${CMAKE_BINARY_DIR}"
      COMMENT "Extracting QJS library"
    )
    set(QJS_LIBRARY "${QJS_LIB_PATH}/lib/libqjs.so" PARENT_SCOPE)
  elseif(CMAKE_HOST_SYSTEM_NAME MATCHES "Windows")
    execute_process(COMMAND powershell -Command "Expand-Archive -Path '${QJS_LIB_CACHE}' -DestinationPath '${CMAKE_BINARY_DIR}' -Force" RESULT_VARIABLE extractResult)
    if(NOT extractResult EQUAL 0)
        message(FATAL_ERROR "Failed to extract ZIP file: ${QJS_LIB_CACHE}")
    endif()
    set(QJS_LIBRARY "${QJS_LIB_PATH}/lib/libqjs.dll" PARENT_SCOPE)
  endif()
endfunction(prepareQJS)

# download url resource to locationForArchive and check md5
function(downloadVerify url locationForArchive md5 )
  message(STATUS "[downloadVerify] info = ${url}")
  if (EXISTS "${locationForArchive}")
    file(MD5 "${locationForArchive}" ARCHIVE_MD5)
    message(STATUS "[downloadVerify] md5 = ${ARCHIVE_MD5}")
    if(NOT md5 STREQUAL ARCHIVE_MD5)
      file(REMOVE "${locationForArchive}")
      message(WARN "[downloadVerify] MD5 mismatch. ${locationForArchive} deleted!")
    endif()
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
    if(NOT md5)
      file(MD5 "${locationForArchive}" ARCHIVE_MD5)
      if(md5 STREQUAL ARCHIVE_MD5)
        message(STATUS "[downloadVerify] ${locationForArchive} Verification successful.")
      else()
        message(FATAL_ERROR_ERROR "[downloadVerify] ${locationForArchive} Integrity check failed, please try to rebuild project again.")
      endif()
    endif(NOT md5)
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

这里首先需要将 linux/windows 的库上传到可访问的地址,然后通过 cmake 下载.
核心点是设置 `set(QJS_LIBRARY "${QJS_LIB_PATH}/lib/libqjs.so" PARENT_SCOPE)` 动态库的地址

然后在 `qjs/src/CMakeLists.txt` 中添加 `QJS` target(也可以在上面的 cmake 脚本中设置)
```cmake
cmake_minimum_required(VERSION 3.10)
project(${PROJECT_NAME}  VERSION 0.0.1 LANGUAGES C)

set(PLUGIN_NAME "flujs") # for current scope
set(PLUGIN_NAME ${PLUGIN_NAME} PARENT_SCOPE) # for parent scope

set(QJS "quickjs") # for current scope
set(QJS ${QJS} PARENT_SCOPE) # for parent scope

# add qjs prebuilt library
include("${CMAKE_CURRENT_SOURCE_DIR}/../../script/artifact.cmake")
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
# !!! must be called in this scope,otherwise qjs lib will not be bundled into package.
set("${PLUGIN_NAME}_bundled_libraries"  $<TARGET_FILE:${QJS}> PARENT_SCOPE)
```

`set("${PLUGIN_NAME}_bundled_libraries"  $<TARGET_FILE:${QJS}> PARENT_SCOPE)` 必须设置,否则动态库无法打包到产物里.

