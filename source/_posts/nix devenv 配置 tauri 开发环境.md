---
title: nix devenv 配置 tauri 开发环境
date: 2024-12-09 15:44
updated: 2024-12-09T15:45:01+08:00
permalink: 
top: 0
comments: 
copyright: true
tags: 
categories: 
keywords: 
description: 
---
自从在 macOS 上使用 nix 管理配置文件和软件后,感觉比 HomeBrew 技高好几筹.多台电脑之间同步环境配置只需要一行命令即可.

而 [devenv](https://devenv.sh/) 就是基于 nix 配置开发环境的工具. 可以确保在不同电脑上开发环境保持一致.

1、首先安装 devenv
2、初始化 devenv
```sh
devenv init
```
可以安装 [direnv](https://devenv.sh/automatic-shell-activation/#managing-the-direnv-directory) 自动激活环境
3、配置 nodejs、rust 环境

1) 添加 nix、rust 源
```yml
inputs:
  nixpkgs:
    url: github:cachix/devenv-nixpkgs/rolling
  fenix:
    url: github:nix-community/fenix
    inputs:
      nixpkgs:
        follows: nixpkgs
```

> 需要使用 fenix, 否则 nix source 里的 rust 版本太低,不满足 tauri 1.82.0+ 的要求

2) 配置 devenv
```nix
{
  pkgs,
  lib,
  config,
  inputs,
  ...
}: {
  # https://devenv.sh/packages/
  packages = with pkgs; [
    git
    darwin.apple_sdk_11_0.frameworks
    darwin.apple_sdk_11_0.Libsystem
  ];

  # https://devenv.sh/languages/
  languages = {
    rust = {
      enable = true;
      # version = "1.82.0";
      channel = "stable";
    };
    javascript = {
      enable = true;
      bun = {
        enable = true;
        install.enable = true;
      };
    };
    typescript.enable = true;
  };

  # https://devenv.sh/processes/
  # processes.cargo-watch.exec = "cargo-watch";
```

> 需要注意的是在 macOS 上, 需要安装 `apple_sdk` 否则会报错 `ld: WebKit framework not found`

```nix
pkgs.darwin.apple_sdk_11_0.frameworks
pkgs.darwin.apple_sdk_11_0.Libsystem
```