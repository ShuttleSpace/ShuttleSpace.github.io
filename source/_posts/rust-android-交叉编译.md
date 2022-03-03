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
        .clang_arg("--target=armv7-linux-androideabi")
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

4、运行 cargo build 即可在 src 目录下生成 lib.rs binding 文件了

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


### ndk r20+ 后，移除了 gcc, 而 rust 在交叉编译时会报 `unable to find library -lgcc`

根据 cargo-apk 项目里的方案

1、新建文件 `libgcc.a`, 其内容为 `INPUT(-lunwind)`
2、执行 `cargo rustc --target sx86_64-linux-android-- -L /Users/shuttle/Project/Android/Ide/git2-sys/deps/gcc`