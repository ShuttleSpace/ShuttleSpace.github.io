---
title: libgit2 NDK cross-compile
date: 2022-02-08 20:49:26
tags: cmake
---

libgit2 最近升级到了 v1.3,然后自己也想利用这个库在安卓上开发个小工具，所以需要 NDK 交叉编译一下。

<!-- more -->
1、代码

首先下载 libgit2 源码，然后切换到 `git checkout v1.3.0`(这里的目的是锁住代码版本，否则在 master 分支，每次重新编译的代码可能会有所差异)

2、准备 ndk 工具链

打开 AndroidStudio 下载 NDK. 这里使用的版本是最新的 `24.0.7956693`

3、依赖库准备

libgit2 有几个依赖库，在 `deps` 目录下。实际中 libgit2 有使用到 openssl 库，因为是交叉编译，所以也需要我们自己用 ndk 编译 openssl, 而不是直接使用本机上的 openssl

- 下载 openssl 源码到 deps 目录下
- 根据 openssl 目录下的 NOTES-ANDROID.md 提示编译即可

4、cmake android cross-compile 准备

在 libgit2 项目根目录下新建 `CMakeLists.android.txt` 文件.

```
SET(CMAKE_SYSTEM_NAME Android) # 交叉编译时为 Android
SET(CMAKE_ANDROID_ARCH_ABI  arm64-v8a) # arm64-v8a、Armeabi-v7a、armeabi-v6、armeabi、mips、mips64、x86、x86_64, 自动设置默认 armeabi.
SET(CMAKE_ANDROID_NDK /Users/shuttle/Library/Android/sdk/ndk/24.0.7956693) # ndk 绝对路径

SET(NDK_HOME /Users/shuttle/Library/Android/sdk/ndk/24.0.7956693)
SET(OPENSSL_DYHOME /Users/shuttle/Project/Native/libgit2/deps/openssl)

SET(OPENSSL_ROOT_DIR ${OPENSSL_DYHOME})
SET(OPENSSL_INCLUDE_DIR ${OPENSSL_DYHOME}/include)
SET(OPENSSL_CRYPTO_LIBRARY ${OPENSSL_DYHOME}/libcrypto.so) # # Could NOT find OpenSSL, try to set the path to OpenSSL root folder in the system variable OPENSSL_ROOT_DIR (missing: OPENSSL_CRYPTO_LIBRARY) 
SET(OPENSSL_SSL_LIBRARY ${OPENSSL_DYHOME}/libssl.so)
SET(OPENSSL_LIBRARIES ${OPENSSL_DYHOME})

add_definitions("--sysroot=${CMAKE_FIND_ROOT_PATH} -Wall -g")

SET(USE_SHA1 OpenSSL)
SET(USE_HTTPS OpenSSL)
SET(BUILD_TESTS OFF)
```

5、cmake configure

`cmake -S. -Bbuild_arm64 -GNinja -DCMAKE_TOOLCHAIN_FILE=CMakeLists.android.txt`

6、cmake compile

`cmake --build build_arm64`

大功告成!

> [cmake android cross-compile](https://cmake.org/cmake/help/v3.12/manual/cmake-toolchains.7.html#cross-compiling-for-android-with-the-ndk)