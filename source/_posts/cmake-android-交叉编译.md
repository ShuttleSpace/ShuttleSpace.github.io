---
title: android 交叉编译
date: 2022-03-03 22:18:01
tags:
---

当前 native 项目大多是 cmake 或 autotool 配置编译，以下就分别以 libgit2 和 openssl 来说明如何进行 NDK 交叉编译

<!-- more -->

### openssl

openssl 使用 autotool 配置，如 NOTES-ANDROID.md 所述先进行环境配置

1、`.zshrc`

因为 NDK 从 r20 后不再携带 gcc,所以需要使用 clang 编译 
```shell
export ANDROID_NDK_HOME=/Users/shuttle/Library/Android/sdk/ndk
export ANDROID_NDK_ROOT=$ANDROID_NDK_HOME/24.0.7956693
export PATH=$ANDROID_NDK_ROOT/toolchains/llvm/prebuilt/darwin-x86_64/bin:$PATH
export CC=x86_64-linux-android32-clang
```
2、执行 Configure

```shell
./Configure android-x86_64  -D__ANDROID_API__=32
```
3、编译

`make -j6`

同理，openssl 支持 `android-arm,android-arm64,android-mips,android-mip64,android-x86,android-x86_64`(其中 r20+后不再支持 mips 架构)


### libgit2

1、添加 CMakeLists.android.tx 文件

```cmake
# 交叉编译 Android
SET(CMAKE_SYSTEM_NAME Android)

# 设置安卓的 api level, 如未设置，按一下顺序取值
# - CMAKE_ANDROID_API 即 android api level
# - CMAKE_SYSROOT
# - lastes api level 都没设置则取 ndk 最新的 api level
# SET(CMAKE_SYSTEM_VERSION 32)

# 设置编译架构：arm64-v8a,armeabi-v7a,armeabi-v6,armeabi,mips,mips64,x86,x86_64 默认 armeabi
SET(CMAKE_ANDROID_ARCH_ABI arm64-v8a)

# ndk 绝对路径
SET(CMAKE_ANDROID_NDK /Users/shuttle/Library/Android/sdk/ndk/24.0.7956693)

# true -> 使用 api level 已经废弃的 header, 而不使用统一头文件。默认 false
# SET(CMAKE_ANDROID_NDK_DEPRECATED_HEADERS false)

# 设置 ndk 编译链版本。默认最新的
# SET(CMAKE_ANDROID_NDK_TOOLCHAIN_VERSION 32)

# none: No C++ Support
# system: Minimal C+++ without STL
# gabi++_static: GAbi++ Static
# gabi++_shared: GAbi++ Shared
# gnustl_static: GNU libstd++ Static
# gnustl_shared: GNU libstd++ Shared
# c++_shared: LLVM libc++ Shared
# c++_static: LLVM libc++ Static
# stlport_static: STLport Static
# stlport_shared: STLport Shared
# 默认 gnustl_static
# SET(CMAKE_ANDROID_STL_TYPE none)

# SET(CMAKE_<LANG>_ANDROID_TOOLCHAIN_PREFIX ) # 自动生成，绝对路径前缀
# SET(CMAKE_<LANG>_ANDROID_TOOLCHAIN_SUFFIX ) # 自动生成，绝对路径后缀

# SET(CMAKE_C_COMPILER ${NDK_HOME}/toolchains/llvm/prebuilt/darwin-x86_64/bin/aarch64-linux-android32-clang)
# SET(CMAKE_CXX_COMPILER ${NDK_HOME}/toolchains/llvm/prebuilt/darwin-x86_64/bin/aarch64-linux-android32-clang++)
# SET(CMAKE_FIND_ROOT_PATH ${NDK_HOME}/toolchains/llvm/prebuilt/darwin-x86_64/sysroot)
# SET(CMAKE_FIND_ROOT_PATH_MODE_PROGRAM NEVER)
# SET(CMAKE_FIND_ROOT_PATH_MODE_LIBRARY ONLY)
# SET(CMAKE_FIND_ROOT_PATH_MODE_INCLUDE ONLY)

SET(NDK_HOME /Users/shuttle/Library/Android/sdk/ndk/24.0.7956693)
SET(OPENSSL_DYHOME /Users/shuttle/Project/Native/libgit2/deps/openssl)

SET(OPENSSL_ROOT_DIR ${OPENSSL_DYHOME})
SET(OPENSSL_INCLUDE_DIR ${OPENSSL_DYHOME}/include)
# Could NOT find OpenSSL, try to set the path to OpenSSL root folder in the system variable OPENSSL_ROOT_DIR (missing: OPENSSL_CRYPTO_LIBRARY) 
SET(OPENSSL_CRYPTO_LIBRARY ${OPENSSL_DYHOME}/android_arm64/libcrypto.so)
SET(OPENSSL_SSL_LIBRARY ${OPENSSL_DYHOME}/android_arm64/libssl.so)
SET(OPENSSL_LIBRARIES ${OPENSSL_DYHOME})

add_definitions("--sysroot=${CMAKE_FIND_ROOT_PATH} -Wall -g")

SET(USE_SHA1 OpenSSL)
SET(USE_HTTPS OpenSSL)
SET(BUILD_TESTS OFF)
SET(CMAKE_GENERATOR Ninja)
```

2、cmake 配置

`cmake -S. -Bbuild_arm64 -GNinja -DCMAKE_TOOLCHAIN_FILE=CMakeLists.android.txt`

3、编译 

`cmake --build build_arm64`