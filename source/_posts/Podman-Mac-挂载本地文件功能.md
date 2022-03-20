---
title: Podman(Mac)挂载本地文件功能
date: 2022-03-20 15:50:47
tags:
---

在 mac 平台使用 podman 代替 docker 的过程中遇到了容器挂载文件的问题，这里将实践过程总结一下.

<!-- more -->

先说下，为什么替换 docker. docker-desktop 其实还是很好用的，只不过在使用中会发现以下几个问题 1、启动慢 2、总是更新失败。而且根据网上消息早期 docker-desktop 内部使用的是 virtualbox 技术，所以就选择了 podman 替换。

使用中 podman 和 docker 没什么多的使用差别，除了多了 `podman machine` 的操作，这是因为 podman 使用了 quemu 加载 fedora 作为容器的虚拟物理机使用。所以此处会出现挂载的问题也就是因为 quemu 没有先挂载本地文件，那么自然容器也就无法访问并挂载了，这个问题据说在 podman 4.0 中将得到解决，我们拭目以待。

回到正题，看看如何为 podman 挂载上本地文件。

首先当然可以通过 `scp` 将文件拷贝到虚拟机中。但实际中很浪费空间。

接下来就是如何将 macOS 文件系统挂载上去。此处则需要使用 `sshfs` 通过 ssh 反向代理登录进虚拟机(qemu). (需要注意的是，每次进行 `podman machine` 操作时都需要重新走一遍.)

第一步通过 `podman machine --log-level=debug ssh -- exit 2>&1 | grep Executing | awk {'print $8'}` 获取私有的 ssh 端口.

接下来使用此端口连接到 qemu 主机
```shell
ssh -i ~/.ssh/podman-machine-default -R 10000:$(hostname):22 -p <PORT> core@localhost

# 在 qemu 主机中生成和 macOS 主机连接的 ssh key
ssh-keygen -t rsa -N "" -f ~/.ssh/id_rsa
ssh-copy-id -p 10000 <MAC USERNAME>@127.0.0.1

# 接下来挂载 macOS 的挂载点
sudo mkdir -p /mnt/Users
sudo chown core:core /mnt/Users
```

现在就可以通过 `sshfs` 挂载了
`sshfs -p 10000 $USER@127.0.0.1:/Users /mnt/Users`，

使用 screen 来将此操作置于后台运行 
```shell
screen -t podman
ssh -i ~/.ssh/podman-machine-default -R 10000:$(hostname):22 -p <PORT> core@localhost
# 挂载本地文件到 qemu 主机
sshfs -p 10000 $USER@127.0.0.1:/Users /mnt/Users
```

### 其他方案
```
podman machine

Current solution requires modifying the path, since the root directory is read-only on CoreOS:

podman machine init -v /foo:/mnt/foo

podman --remote run -v /mnt/foo:/foo

This breaks compatibility with local version, that would do podman run -v /foo:/foo (no /mnt)

other systems

No issues with mounting, since the root directory can be modified to create the mountpoint dir:

podman machine init -v /foo:/foo --volume-driver=sshfs

podman --remote run -v /foo:/foo

This means one can use the same command remote as local, when using something like Fedora.
```
> https://dalethestirling.github.io/Macos-volumes-with-Podman/
> https://github.com/containers/podman/issues/8016#issuecomment-995242552