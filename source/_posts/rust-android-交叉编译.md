---
title: rust android 交叉编译
date: 2022-03-03 22:16:31
tags:
---

记录下使用 rust 绑定 libgit2 动态库进行 安卓交叉编译时的过程。

<!-- more -->

# 为 libgit2 生成 rust binding

如前所述，我们生成好了 libgit2 的安卓动态库，如果需要 rust 调用安卓动态库的话，不但手写很麻烦，还需要用到 unsafe, 可能会出现各种问题。
所以我们采用官方提供的 bindgen 来为我们自动生成 binding.

1、新建 cargo 项目，并将 libgit2 头文件复制进去

```
- deps
  - libgit2
    - include
- src
  build.rs
  Cargo.toml
```

2、添加 bindgen 依赖, 同时启用 build.rs

```toml
[package]
...
build="build.rs

[build-dependencies]
bindgen = "0.59.2
```

3、编辑 build.rs

```rust
use bindgen;
use std::env;
use std::path::PathBuf;

fn main() {
  let header_path = format!("{}/deps/libgit2/include", env::current_dir().unwrap());
  let bindings = bindgen::Builder::default()
        .header("deps/libgit2/include/git2.h")
        .clang_arg(format!("-I{}", git2_header_path))
        .clang_arg(format!("--sysroot={}/toolchains/llvm/prebuilt/darwin-x86_64/sysroot", env::var("ANDROID_NDK")))
        .clang_arg("--target=armv7-linux-androideabi") // 指定 arm 平台的编译，否则编译出来的 header 有问题
        .disable_header_comment()
        .generate_comments(false)
        .parse_callbacks(Box::new(bindgen::CargoCallbacks))
        .generate()
        .expect("Unable to generate bindings");
    let out_path = PathBuf::from(env::current_dir().expect("can't get current dir").join("src"));
    bindings
        .write_to_file(out_path.join("lib.rs"))
        .expect("Couldn't write bindings!");
    println!("cargo:warning=out:{:?}", out_path.clone().join("bindings.rs"));
}
```

4、运行 cargo build 即可在 src 目录下生成 `lib.rs` binding 文件了

# 用 rust 生成 jni 动态库

1、首先新建 rust 项目

`cargo new --lib git2-sys`

2、将编译好的 libgit2 安卓动态库复制到项目

```
-deps
  - libgit2
    - include
    - lib
      - android-arm64
      - android-x86_64
```

3、配置 rustup 安卓交叉编译工具链

可以使用 rustup target list 列出 rustup 当前支持的交叉编译工具链

`rustup target add aarch64-linux-android x86_64-linux-android`

4、 配置下 ar linker

在项目根目录新建 .cargo 目录, 配置文件为 config.toml

```toml
[target.aarch64-linux-android]
ar = "/Users/shuttle/Library/Android/sdk/ndk/24.0.7956693/toolchains/llvm/prebuilt/darwin-x86_64/bin/aarch64-linux-android32-clang"
linker = "/Users/shuttle/Library/Android/sdk/ndk/24.0.7956693/toolchains/llvm/prebuilt/darwin-x86_64/bin/aarch64-linux-android32-clang"

[target.armv7-linux-androideabi]
ar = "/Users/shuttle/Library/Android/sdk/ndk/24.0.7956693/toolchains/llvm/prebuilt/darwin-x86_64/bin/armv7a-linux-androideabi32-clang"
linker = "/Users/shuttle/Library/Android/sdk/ndk/24.0.7956693/toolchains/llvm/prebuilt/darwin-x86_64/bin/armv7a-linux-androideabi32-clang"

[target.i686-linux-android]
ar = "/Users/shuttle/Library/Android/sdk/ndk/24.0.7956693/toolchains/llvm/prebuilt/darwin-x86_64/bin/i686-linux-android32-clang"
linker = "/Users/shuttle/Library/Android/sdk/ndk/24.0.7956693/toolchains/llvm/prebuilt/darwin-x86_64/bin/i686-linux-android32-clang"

[target.x86_64-linux-android]
ar = "/Users/shuttle/Library/Android/sdk/ndk/24.0.7956693/toolchains/llvm/prebuilt/darwin-x86_64/bin/x86_64-linux-android32-clang"
linker = "/Users/shuttle/Library/Android/sdk/ndk/24.0.7956693/toolchains/llvm/prebuilt/darwin-x86_64/bin/x86_64-linux-android32-clang"
```

5、配置项目生成动态库

```toml

[lib]
name = "tano"
crate-type = ["staticlib", "cdylib"]
```

6、开始编译

如果直接运行 `cargo b --target x86_64-linux-android` 会报错 `unable to find library -lgcc`, 原因是 NDK r20+ 后移除了 gcc 库, 代替为 unwind 库。此时需要做特殊处理.

6.1 gcc 修复

```
- deps
  - gcc
    libgcc.a

```
新建 `libgcc.a` 文件，内容为 `INPUT(-lunwind)`

6.2 命令行编译 

`cargo rustc --target x86_64-linux-android -- -L /Users/shuttle/Project/Android/Ide/git2-sys/deps/gcc`

此时可以通过 -L 来配置执行

6.3 build.rs 配置

如果不想每次都在命令行后指定 -L 参数，可以使用 build.rs 来编译

```toml
[package]
...
build = "build.rs"
```

```rust
fn main() {
    // CARGO_CFG_TARGET_OS
  let TARGET = env::var("TARGET").unwrap();
  let target = if TARGET.contains("x86_64-linux-android") {
    "android_x86-64"
  } else if TARGET.contains("aarch64-linux-android") {
    "android_arm64"
  } else {
    ""
  };
  println!("cargo:rustc-link-search=native=./deps/libgit2/lib/{}", target);
  println!("cargo:rustc-link-search=native=./deps/openssl/lib/{}", target);

  println!("cargo:rustc-link-lib=dylib=git2");
  println!("cargo:rustc-link-lib=dylib=crypto");
  println!("cargo:rustc-link-lib=dylib=ssl");

  println!("cargo:rustc-flags=-L./deps/gcc");
}
```

7.1、接下来执行 `cargo b --target x86_64-linux-android` 即可
7.2、也可以配置 Makefile.toml 使用 cargo-make 工具简化命令行运行输入

首先安装 cargo-make 工具, `cargo install cargo-make`

```toml
[tasks.a_arm64]
command = "cargo"
args = ["b", "--target", "aarch64-linux-android"]

[tasks.a_x64]
command = "cargo"
args = ["b", "--target", "x86_64-linux-android"]
```

然后执行 `cargo make a_arm64` 或者 `makers a_arm64` 即可

# rust jni 代码（动态加载方式）

```rust
use core::panic;
use jni::{
    descriptors::Desc,
    objects::{GlobalRef, JClass, JMethodID},
    strings::JNIString,
    sys::{jclass, jint, JNI_VERSION_1_6},
    JNIEnv, JavaVM, NativeMethod,
};
use std::ffi::CString;
use std::sync::Once;
use std::{os::raw::c_void, panic::catch_unwind};

const INVAL_JNI_VERSION: jint = 0;
static INIT: Once = Once::new();

// JNI 动态加载的入口

#[allow(non_snake_case)]
#[no_mangle]
pub extern "system" fn JNI_OnLoad(vm: JavaVM, _: *mut c_void) -> jint {
    let env = vm.get_env().expect("Cannot get reference to the JNIEnv");
    catch_unwind(|| {
        prepare(&env);
        JNI_VERSION_1_6
    })
    .unwrap_or(INVAL_JNI_VERSION)
    // 如果使用 JNI_VERSION_1_8 会报错
}

pub(crate) fn prepare(env: &JNIEnv) {
    INIT.call_once(|| unsafe {
        // 在这里动态注册就行，不用写那么多冗余函数
        let host_jclass: GlobalRef = get_class(env, "io/shuttle/coder/MainActivity").unwrap();
        let native_methods = [NativeMethod {
            name: "hello".into(),
            sig: "()Ljava/lang/String;".into(),
            fn_ptr: hello as *const c_void as *mut c_void,
        }];
        env.register_native_methods(&host_jclass, &native_methods);
    });
}
// 类方法
fn hello(env: JNIEnv, _: JClass) -> jclass {
    let output = env
        .new_string("from rust string!!!")
        .expect("Couldn't create java string!");
    output.into_inner()
}
// 静态方法
// env: JNIEnv, object: JObject

fn get_class(env: &JNIEnv, class: &str) -> Option<GlobalRef> {
    let class = env
        .find_class(class)
        .unwrap_or_else(|_| panic!("Class not found: {}", class));
    Some(env.new_global_ref(class).unwrap())
}

fn get_method_id(env: &JNIEnv, class: &str, name: &str, sig: &str) -> Option<JMethodID<'static>> {
    let method_id = env
        .get_method_id(class, name, sig)
        .map(|mid| mid.into_inner().into())
        .unwrap_or_else(|_| {
            panic!(
                "Method {} with signature {} of class {} not found",
                name, sig, class
            )
        });
    Some(method_id)
}
```

##### 生成 kotlin 文件 jni 头文件的函数签名方式

```sh
➜  Coder ./gradlew -v 

------------------------------------------------------------
Gradle 7.4
------------------------------------------------------------

Build time:   2022-02-08 09:58:38 UTC
Revision:     f0d9291c04b90b59445041eaa75b2ee744162586

Kotlin:       1.5.31
Groovy:       3.0.9
Ant:          Apache Ant(TM) version 1.10.11 compiled on July 10 2021
JVM:          17.0.1 (Homebrew 17.0.1+0)
OS:           Mac OS X 12.2.1 x86_64
```
进入 `build/tmp/kotlin-classes/debug/io/shuttle/coder` 目录, 可以看到其下有两个 class 文件 `MainActivity` 和 `MainActivityKt.class`

执行 `javap -s p MainActivity` 就可以看到对应的 jni 函数签名了.