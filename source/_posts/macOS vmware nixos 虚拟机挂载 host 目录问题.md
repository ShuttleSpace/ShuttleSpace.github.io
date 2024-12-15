---
title: macOS vmware nixos 虚拟机挂载 host 目录问题
date: 2024-12-15 11:58
updated: 2024-12-15T11:58:50+08:00
permalink: 
top: 0
comments: 
copyright: true
tags:
  - vmware
  - cross-platform
categories: environment
keywords: nixos, vmware, linux
description:
---
之前在 macOS 上开发 electron 跨平台应用时,因为手头上没有趁手的 linux、windows机器,所以只能通过虚拟机来测试 electron 跨平台效果(具体见[在 macOS 的 linux 虚拟机上开发环境配置](https://blog.dang8080.cn/2022/08/10/00/) ).

很早之前心头一热买了一台 surface-go 平板电脑,想着当 windows 用.但实际效果嘛...
后来又刷了 fydeos 用了一段时间,结果这个 fydeos surface 系列是要付年费的.
就又折腾刷了 tiny11 系统,用 sketchbook 来画画.又要但是了,非常卡,windows太吃资源了.想着要不刷台 android x86 吧,搜索了下还在适配更新的 android x86 surface 就是 BlissOS 了,结果试了两个版本都无法安装上😭.
索性直接装 linux 吧,选择的是我正在熟悉的 nixos.具体如何刷机配置见后续文档.

linux 确实优秀,丝滑流畅,而且有  waydroid 这个基于 lxc 的大杀器,可以运行 android x86 应用,瞬间解锁了生产力!

那引出本文的原因是: nixos 是基于配置文件来生成操作系统,可以根据配置文件无缝一键复制原来的电脑环境,不必手把手一个应用一个应用重新下载配置.我现有的是 nixos-darwin 配置,所以就想先在虚拟机上配置好,然后直接将系统复制到平板即可~

### 问题
vmware 安装 nixos 很简单,我选择的是 nixos-gnome,按照 installer 提示即可(注意磁盘要选大点,否则 /nix/store 容易空间不足)

最大的问题是,我的配置文件是在 macOS host 上编辑,通过 git 发布到 gitee管理.而 vmware 挂载了共享文件夹竟然不生效.

在网上搜了下 vmware 如何配置 nixos 共享文件夹: 在 `hardware-configuration.nix` 中添加
```nix
  system.fsPackages = [pkgs.open-vm-tools];
  fileSystems = {
    "/" = {
      device = "/dev/disk/by-uuid/923b392d-dcc5-4fdc-b23d-ef9296068cd9";
      fsType = "ext4";
    };
    "/boot" = {
      device = "/dev/disk/by-uuid/15A7-6E61";
      fsType = "vfat";
      options = ["fmask=007" "dmask=007"];
    };
    "/mnt/hgfs" = {
      device = ".host:/";
      fsType = "fuse./run/current-system/sw/bin/vmhgfs-fuse";
      options = ["umask=22" "uid=1000" "gid=1000" "allow_other" "defaults" "auto_unmount"];
    };
  };
```

`sudo nixos-rebuild switch -vv` 系统竟然crash了😭,应该是文件系统挂载失败导致的.

赶紧回滚系统.

想到的第一个方案是在 macOS 启动一个 http file server`python3 -m http.server`, 然后在虚拟机浏览器下载所有的配置文件.但是太麻烦了每次修改,都要手动删除旧文件,再下载新文件.

所以又搜了下 github, 最终发现了解决方案.需要修改 nixpkgs 中的 open-vm-tools 工具

```nix
{}:
{
	nixosConfigurations = {
		nixos = nixpkgs.lib.nixosSystem {
			modules = [
				{
	            nixpkgs.overlays = [
	              (final: prev: {
	                open-vm-tools = prev.open-vm-tools.overrideAttrs (old: {
	                  postPatch =
	                    old.postPatch
	                    + ''
	                      sed -i 's,/usr/bin/,/run/current-system/sw/bin/,g' services/plugins/vix/foundryToolsDaemon.c
	                      sed -i 's,/usr/bin/,/run/current-system/sw/bin/,g' vmhgfs-fuse/config.c
	                    '';
	                });
	              })
	            ];
	          };
			];
		}
	}
}
```
这里我使用的是 home-manager flake, 通过修改 nixpkgs open-vm-tools overlay 来实现的.如果是默认的配置请切换到 home-manager flake.