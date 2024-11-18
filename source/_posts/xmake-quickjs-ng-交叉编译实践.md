---
title: xmake quickjs-ng 交叉编译实践
top: 0
copyright: true
date: 2024-11-17 09:59:09
updated: 2024-11-17 09:59:09
permalink:
comments:
tags: xmake, cross compile
categories:
keywords: xmake, quickjs, lua
description: xmake 交叉编译
---

xmake 是一个国人 waruqi(ruki)[https://github.com/waruqi] 基于 lua 脚本语言实现的跨平台够看工具.对标 CMake, 但是远优于它. 以下是两者的简单对比.

Xmake = Build backend + Project Generator + Package Manager + [Remote|Distributed] Build + Cache

Xmake ≈ Make/Ninja + CMake/Meson + Vcpkg/Conan + distcc + ccache/sccache

| 特性 | CMake | xmake | 说明 | 
| -- | -- | -- | -- |
| 跨平台 | ✅ | ✅ | |
| 配置简单 | ❌ | ✅ ||
| 配置文件格式 | lua | 自定义脚本语言 ||
| 易上手 | ❌ | ✅ ||
| 构建产物缓存 | ✅ | ✅ ||
| 远程仓库 | ❌ | ✅ xrepo ||
| 语法简单 | ❌ | ✅ ||
| 文档详细 | ✅ | ❌ ||
| 自动依赖管理 | ✅ | ✅ ||
| IDE 集成 | ✅ | ✅ ||
| 编译器支持 | GCC, Clang, MSVC, ICC等| GCC, Clang, MSVC, ICC等||
|并行构建| ✅ | ✅ ||
| 生成器支持 | ✅(Makefile, Ninja, Visual Studio 等) |  ✅(Makefile, Ninja, Visual Studio 等) ||


以上是对 xmake 的简介.虽然工具很好用,但是文档比较少,所以进阶部分还是需要研究一番.

因为自己正在写的一个 flutter binding js engine 插件 依赖 quickjs 引擎, 项目采用 flutter ffi 的方式绑定, 所以需要提前构建好 quickjs 跨平台产物.为了简便这里选择 xmake.

1、安装 xmake

按[官网](https://xmake.io/#/)指引即可

2、下载 quickjs 源码

这里选择的是 quickjs-ng 项目

3、在项目根目录编写 xmake.lua

```lua
set_project("quickjs")
set_xmakever("2.7.3")

add_rules("mode.release")
set_policy("build.optimization.lto", true)

target("qjs")
  set_kind("shared")
  add_files("quickjs.c", "libregexp.c", "libunicode.c", "cutils.c", "quickjs-libc.c", "libbf.c")
  add_headerfiles("*.h")
  add_includedirs(".")
  on_load(function (target)
    target:add("defines",  "_GNU_SOURCE" )
  end)
```

可以看到这里的配置非常简单,因为是 lua 脚本语言.相比 CMake 是相当亲切.

```lua
set_project("quickjs")
set_xmakever("2.7.3")
```
这两句配置项目名和xmake最低支持的版本.

```lua
add_rules("mode.release")
```
`add_rules` 内置的规则.规则是一种 hook, 可以在构建的各个回调中执行对应的策略. 这里添加的是生成 release 产物. TODO: 做了哪些改动

```lua
set_policy("build.optimization.lto", true)
```
`set_policy` 设置策略,指明使用 lto 优化



4、然后执行 `xmake build/b` 构建即可

这样简单的执行,生成的就是当前平台构建的产物.
要跨平台交叉编译,需要先执行平台配置

```sh
# android
xmake f -p android -a arm64-v8a
xmake b
xmake f -p android -a armeabi-v7a
xmake b
xmake f -p android -a x86_64
xmake b
# ios
xmake f -p iphoneos -a ...
xmake b
# macos
xmake f -p macosx -a ...
xmake b
# linux
xmake f -p linux -a ...
xmake b
# windows
xmake f -p mingw -a ...
xmake b
```

因为我是在 mac m3 上编译,所以可以构建 android/ios/macos 产物.而 linux/windows 需要在linux上执行,我是选择了 orbstack 上创建 ubuntu 编译的.

#### 交叉编译

可以看到上面跨平台交叉编译比较麻烦,需要一个一个平台执行.最简单的版本是写一个脚本.很显然,这样做就失去了这篇文章的意义.

xmake 提供了自定义 task 的功能,可以实现如 `xmake [taks]` 执行命令.下面就来实现一下.

首先在项目根目录创建如下文件
```
plugins
  - main.lua
  - xmake.lua
```

main.lua
```lua
import("core.base.option")

local pari = {
  iphoneos = { "armv7", "armv7s", "arm64", "i386", "x86_64" },
  linux = { "arm64", "x86_64" },
  macosx = { "arm64", "x86_64" },
  mingw = {  "arm64", "x86_64" },
  android = { "arm64-v8a", "armeabi-v7a", "x86_64" }
}

function indexOf(array, value)
  for i, v in ipairs(array) do
      if v == value then
          return i  
      end
  end
  return nil
end

function xmakeBuild(platf, archf)
  if platf and archf then
    print("🔥 ".. platf .. "🌹 " .. archf)
  end
  local config = { "f" }
  if platf then
    table.insert(config, "-p")
    table.insert(config, platf)
  end
  if archf then
    table.insert(config, "-a")
    table.insert(config, archf)
  end
  os.execv("xmake", config)
  os.execv("xmake", { "package", "-P", "."})
end

function buildForPlatformArch(platf, archf)
  local hasTarget = false
  local archs = pari[platf]
  if archs then
    if archf then
      if indexOf(archs, archf) then
        xmakeBuild(platf, archf)
        hasTarget = true
      end
    else
      for _, arch in ipairs(archs) do
        xmakeBuild(platf, arch)
      end
      hasTarget = true
    end
  end
  if not hasTarget then
    platf = platf or "Unknown platform"
    archf = archf or "Unknown architecture"
    print("🍄" .. platf .. "-".. archf .. " not supported!") 
  end
end

function main()
  local platf = option.get("platform")
  local archf = option.get("arch")
  if platf or arch then
    buildForPlatformArch(platf, archf)
  else
    xmakeBuild()
  end
end
```

xmake.lua
```lua
task("xross")
  set_category("plugin")
  on_run("main")
  set_menu {
    usage = "xmake xross [platform] [arch]",
    description = "build cross platform",
    options = {
      {nil, "platform", "v", nil, "target platform.\n\tiphoneos|linux|macosx|mingw|android"},
      {nil, "arch", "v", nil, "target arch.\n\tiphoneos: armv7|armv7s|arm64|i386|x86_64\n\tlinux: arm64|x86_64\n\tmacosx: arm64|x86_64\n\tmingw: arm64|x86_64\n\tandroid: arm64-v8a|armeabi-v7a|x86_64"}
    }
  }
```

然后在项目根目录的 xmake.lua 中添加就可以了.
```diff
++add_plugindirs("plugins")
target("qjs")
```

执行 `xmake xross android`, 一键生成 android arm64-v8a|armeabi-v7a|x86_64 三个CPU架构的产物.

#### 另一种方式

上面是通过 `add_plugindirs` 导入自定义 task, 还有一种方式是通过 `includes()`

比如创建如下目录文件
```
xmake
  - actions
    xross.lua
  - rules
    xcode_framework2.lua
```

然后在根目录 `xmake.lua` 中导入
```diff
++includes("xmake/**.lua")
target("qjs")
```

其中 xross.lua 就是上面的自定义 task, 不过有点区别

```lua
task("xross")
set_category("plugin")

set_menu({
  usage = "xmake xross [platform] [arch]",
  description = "build cross platform",
  options = {
    {'p', "platform", "v", nil, "target platform.\n\tiphoneos|linux|macosx|mingw|android"},
    {nil, "arch", "v", nil, "target arch.\n\tiphoneos: armv7|armv7s|arm64|i386|x86_64\n\tlinux: arm64|x86_64\n\tmacosx: arm64|x86_64\n\tmingw: arm64|x86_64\n\tandroid: arm64-v8a|armeabi-v7a|x86_64"},
    {'a', "archive", "k", nil, "xcode archive"}
  }
})

local pari = {
  iphoneos = { "armv7", "armv7s", "arm64", "i386", "x86_64" },
  watchos = { "arm64_32", "armv7k" },
  appletvos = { "arm64" },
  iphonesimulator = { "arm64", "x86_64" },
  watchsimulator = { "arm64", "x86_64" },
  appletvsimulator = { "arm64", "x86_64" },
  linux = { "arm64", "x86_64" },
  macosx = { "arm64", "x86_64" },
  mingw = {  "arm64", "x86_64" },
  android = { "armeabi", "arm64-v8a", "armeabi-v7a", "x86_64", "x86", } -- "mips", "mips64"
}


local function indexOf(array, value)
  for i, v in ipairs(array) do
      if v == value then
          return i  
      end
  end
  return nil
end

local function printTable(t, indent)
  indent = indent or 0
  local indentStr = string.rep("  ", indent)
  
  if type(t) ~= "table" then
      print(indentStr .. tostring(t))
      return
  end

  print(indentStr .. "{")
  for k, v in pairs(t) do
      local keyStr = tostring(k)
      if type(v) == "table" then
          print(indentStr .. "  " .. keyStr .. " = ")
          printTable(v, indent + 1)
      else
          local valueStr = tostring(v)
          print(indentStr .. "  " .. keyStr .. " = " .. valueStr)
      end
  end
  print(indentStr .. "}")
end

local function xmakeBuild(platf, archf, execvFn)
  if platf and archf then
    print("🔥 ".. platf .. "🌹 " .. archf)
  end
  local config = { "f" }
  if platf then
    table.insert(config, "-p")
    table.insert(config, platf)
  end
  if archf then
    table.insert(config, "-a")
    table.insert(config, archf)
  end
  print("⛰️ xmakeBuild: " .. table.concat(config, ", "))
  printTable(os)
  printTable(sudo)
  execvFn("xmake", config)
  execvFn("xmake", { "package", "-P", "."}) -- "--verbose"
end

local function buildForPlatformArch(platf, archf, execvFn)
  local hasTarget = false
  local archs = pari[platf]
  if archs then
    if archf then
      if indexOf(archs, archf) then
        xmakeBuild(platf, archf, execvFn)
        hasTarget = true
      end
    else
      for _, arch in ipairs(archs) do
        xmakeBuild(platf, arch, execvFn)
      end
      hasTarget = true
    end
  end
  if not hasTarget then
    platf = platf or "Unknown platform"
    archf = archf or "Unknown architecture"
    print("🍄" .. platf .. "-".. archf .. " not supported!") 
  end
end

on_run(function()
  import("core.base.option")
  local platf = option.get("platform")
  local archf = option.get("arch")
  printTable(os)
  if platf or arch then
    buildForPlatformArch(platf, archf, os.execv)
  else
    xmakeBuild(nil, nil, os.execv)
  end
end)
```
主要就是在非`on_run` scope 定义的 local function 中,无法访问到 os 模块的扩展函数 `execv`, 所以这里通过将 `execv` function 传递到函数中去. 具体修复方案等待后续排查...
> 具体原因在 [内置模块 os](https://xmake.io/mirror/manual/builtin_modules.html) 中有说明

> Only some readonly interfaces (for example: os.getenv, os.arch) in the os module can be used in the description scope. Other interfaces can only be used in the script domain, for example: os.cp, os .rmetc.

另外,在 xmake 目录中新建了一个 xcode_framework2 的 rule. 原因是内置的 `xcode.framework` 在 ios 打包 framework 时会自动签名.而本机是没有开发者账号的,所以将内置的 [`xcode.framework`](https://github.com/xmake-io/xmake/blob/dev/xmake/rules/xcode/framework/xmake.lua) 代码复制出来修改一下

```diff
--rule("xcode.framework")
++rule("xcode.framework2")
# do codesign, only for dynamic library
--local codesign_skip = target:values("xcode.codesign_skip")
++local codesign_skip = target:values("xcode.codesign_skip") or get_config("xcode_codesign_skip")
if target:is_shared() and not codesign_skip then
```
然后在 xmake.lua 中的 target 添加自定义 rule `xcode.framework2` 并且设置 `xcode_codesign_skip` 跳过签名.
```diff
target("qjs")
  set_kind("shared")
  add_files("quickjs.c", "libregexp.c", "libunicode.c", "cutils.c", "quickjs-libc.c", "libbf.c")
  add_headerfiles("*.h")
  add_includedirs(".")
  if is_plat("linux") and get_config("arch") == "x86_64" then
    -- 使用 add_toolchain 来设置工具链 在 linux x86 上可以编译 arm,x86, linux arm 上只能编译 arm
    set_arch("x86_64")
    set_toolchains("gcc")
  end
  if is_plat("macosx", "iphoneos", "iphonesimulator") then
    ++add_rules("xcode.framework2")
    add_files("Info.plist")
    ++add_values("xcode.codesign_skip", true)
  end
  on_load(function (target)
    target:add("defines",  "_GNU_SOURCE" )
  end)
```

### 参考

[xmake plugin_task](https://xmake.io/mirror/manual/plugin_task.html#:~:text=Xmake%20can%20implement%20custom%20tasks,plugins%20are%20implemented%20with%20task%20.)

[xmake extension_modules](https://xmake.io/mirror/manual/extension_modules.html)

[xmake syntax_description](https://xmake.io/mirror/guide/syntax_description.html)