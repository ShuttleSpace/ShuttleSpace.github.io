---
title: 在 macOS 的 linux 虚拟机上开发环境配置
date: 2022-08-10T11:44:00
updated: 2024-12-15T11:45:04+08:00
permalink: 
top: 0
comments: 
copyright: true
tags:
  - electron
  - vmware
  - linux
  - cross-platform
categories: environment
keywords: electron, vmware, linux
description:
---
## VirtualBox + Ubuntu

1. VirtualBox 新建虚拟机
2. 虚拟机挂载 share folder
3. 打开终端,配置环境

```bash
# ----- 配置代理
# <bash 代理>
# export http_proxy=http://dev-proxy.oa.com:8080
# export https_proxy=http://dev-proxy.oa.com:8080
# 或者 http://web-proxy.tencent.com:8080 或者 http://r.tnpm.oa.com:8080
# <apt 代理>
# /etc/apt/apt.conf
# Acquire::http::proxy "https_proxy=http://dev-proxy.oa.com:8080";
# Acquire::https::proxy "https_proxy=http://dev-proxy.oa.com:8080";
sudo apt-get update
sudo apt-get install g++ build-essential python curl
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.35.3/install.sh | bash # Nodejs 版本管理器
# 可以设置 shell 代理
nvm install 13.8.0
nvm use 13.8.0
# <npm 代理>
# npm config set proxy=http://dev-proxy.oa.com:8080
# npm config set https_proxy=http://dev-proxy.oa.com:8080
# npm config set registry=https://mirrors.tencent.com/npm/
npm config set strict_ssl false
# 安装 tnpm
npm i -g @tencent/tnpm
# 或者 npm i -g @tencent/tnpm --registry=http://r.tnpm.oa.com
```
4、为挂载目录/项目添加可读写权限
```bash
sudo adduser $USER vboxsf # 添加当前用户到 vboxsf 用户组
sudo chown -R $USER [挂载目录] # 如 /media/sf_Shared/wechat_work
```
5、执行运行脚本
```bash
./brl.sh dev/build
```
## VirtualBox + Deepin/UOS
如上类似，除了挂载目录.

1、首先打开菜单栏 管理 -> 虚拟介质管理

2、点击虚拟光盘 tab 栏，然后新建虚拟光盘.

3、创建虚拟机后在其设置里添加此虚拟光盘即可.

## Parllels Desktop 真香（除了有点贵, 土豪请随意）
### 重大利好
	有开发者开发了一款可以无限期试用 PD 的软件 [PDRunner](https://gitee.com/lihaoyun/PD-Runner), s(qiongbi)VIP 也可以继续使用了.（ps: github 上的源代码仓库因为 DCMA 原因被 ban 了，且行且珍惜）
## VMWare Funsion 12
vmware funsion 12 现在已经免费向个人用户开放了，只需要在官网注册好账号，获取一个永久免费的授权码就能激活使用。
#### Deepin/UOS
安装好后，先对虚拟机进行设置微调:
1、兼容性：选择硬件版本19
![harware version](http://picbed.dang8080.cn/image-1641521104551.png)
2、处理器：选择多核、打开高级选项的开关
![cpu](http://picbed.dang8080.cn/image-1641521154891.png)
3、高级：勾选停用侧通道缓解
![side path release](http://picbed.dang8080.cn/image-1641521195773.png)

**接下来如果还想要在虚拟机里运行 dev 模式，就需要挂载共享文件夹**
![share folder](http://picbed.dang8080.cn/image-1641521410618.png)
如图选择共享文件夹后，实际上还是无法在虚拟机打开共享目录，需要如下配置。
按照黄色提示：需要在虚拟机中安装 VMware Tools 工具。按照官方文档，有三种方式
1）菜单安装
![menu](http://picbed.dang8080.cn/image-1641521751085.png)
可以看到，这里实际已经安装了，但是虚拟机无法识别出来
2）挂载 iso 安装，在官网搜索 VMware tools 下载，只能找到 windows 和 mac 的安装工具包（实际是 iso），没有 linux 的。这里我们可以从 mac host 主机安装的 VMware Funsion app 里面找
![path](http://picbed.dang8080.cn/image-1641521907311.png)
如图，将此 iso 拖动或者通过 http 下载到 linux 虚拟机中，挂载然后执行 shell
![path7000](http://picbed.dang8080.cn/image-1641521969700.png)
结果也无效
3）命令行安装，通过谷歌搜索，我们找到了最新的 VMware tools 工具依赖包: open-vm-tools-desktop(其中包含了 open-vm-tools)
```shell
sudo apt install -y open-vm-tools-desktop
```
执行中会发现系统提示我们，这个工具已经安装过了，即使重新 reinstall 也是没有效果
**最后，终于找到了可用的方案**
```shell
sudo mkdir -p /mnt/hgfs
sudo mount -t fuse.vmhgfs-fuse .host:/ /mnt/hgfs -o nonempty,allow_other # nonempty 是因为我已经在设置GUI里面把共享目录挂载上了
# sudo vim /etc/fstab # 在最后一行添加
.host:/ /mnt/hgfs fuse.vmhgfs-fuse allow_other 0 0
# 成功！！！
```
虚拟机中共享目录的挂载点为：!!!#ff0000 !!#f3f3f3 系统盘/mnt/hgfs/!!!!!

#### KylinV10 麒麟V10
挂载共享目录方法
```shell
1、打开虚拟机浏览器，下载 `git clone https://github.com/rasa/vmware-tools-patches.git` 这个库，或者直接下载 zip 包后解压
2、sudo 权限执行 `sudo bash ./patched-open-vm-tools.sh`
# 如果创建 /mnt/hgfs 失败，可以试试其他路径，如 /media/hgfs, 下面也是一样
3、在 /mnt 目录下新建 `sudo mkdir -p /mnt/hgfs`
4、执行如下命令: `sudo vmhgfs-fuse -o nonempty,allow_other .host:/ /mnt/hgfs`
5、在 `/etc/fstab` 最后一行添加 `.host:/shared     /mnt/hgfs       fuse.vmhgfs-fuse     allow_other  0  0`
6、重启
```

## Q&amp;A

1.（ubuntu） 如果安装过程中出现 `no permission` 之类的错误,使用 `sudo adduser [username] vboxsf;sudo chown -R $USER [对应报错文件的文件夹]` 添加权限
2. （ubuntu）`error An unexpected error occurred: "Unknown system error -75: Unknown system error -75, unlink '/media/sf_Shared/wechat_work/node_modules/electron/dist/chrome_100_percent.pak'".` 报这个错,手动删掉 node_modules 文件夹重新运行
3. （ubuntu）如果因为安装版本比较旧的 linux 使用 `sudo apt update` 更新源失败: 报错 xxx Release 找不到,可以使用以下方法替换源地址

```
   sudo cp /etc/apt/sources.list /etc/apt/sources.list.bak  # 备份原始文件
   sudo sed -i -r 's/([a-z]{2}\.)?archive.ubuntu.com/old-releases.ubuntu.com/g' /etc/apt/sources.list
   sudo sed -i -r 's/security.ubuntu.com/old-releases.ubuntu.com/g' /etc/apt/sources.list
   sudo apt-get update
   # aliyun源（可选）
   sudo cp /etc/apt/sources.list /etc/apt/sources.list.bak  # 备份原始文件
   sudo sed -i -r 's/([a-z]{2}\.)?archive.ubuntu.com/mirrors.aliyun.com/g' /etc/apt/sources.list
   sudo sed -i -r 's/security.ubuntu.com/mirrors.aliyun.com/g' /etc/apt/sources.list
   sudo apt-get update
```

4. （virtualbox）安装完成后，如果 VirtualBox 不能随拖动而自动放大缩小虚拟机界面大小，则点击菜单栏：设备 -> 安装增强功能。有的会弹出 `VBox_GAs 包含打算自动启动的软件的提示窗`。有的需要进入到 `VBox_GAs` 挂载目录，终端运行 `VBoxLinuAdditions.run`脚本。重启即可实现自动拖动放大缩小效果.
5. 在虚拟机中执行 npm i 下载项目依赖时，很容易出现 `xx moudle not found` 的错误，这是下载的时候依赖库未下载完整（原因待排查）可以通过以下方法快速结果
```bash
#在 host 机器上(如 mac) 的项目根目录执行 
tnpm i --ignore-scripts --no-optional 
# 目的是在 mac 上下载好 js 的依赖库，但是不执行 npm install 的默认行为（即编译依赖库里的 node-addon 模块）
# 然后执行 brl.sh 即可
# 如果还是缺少某依赖库，那么手动下载对应依赖库即可.
```
6. 执行 `npm i` 时报错 `node-gyp 下载 https://nodejs.org/13.8.0-headers.tar.gz 失败`
```bash
# 网络问题一是查看代理是否正确
# 如果代理设置正确还是无法访问, 则手动通过浏览器下载此文件，然后执行 `npx node-gyp rebuild --tarball=[文件]` 即可
```
7. 启动 virtualbox 弹窗报错 `Kernel driver not installed (rc=-1908)`
```bash
sudo kmutil load -p '/Library/Application Support/VirtualBox/VBoxDrv.kext'
```
8、网络设置：可以通过设置 《网络适配器》来实现访问内网
9、运行一段时间后，虚拟机在 host 主机上生成的 vmdk 文件占用比较大。可以进入虚拟机，执行 `sudo vmware-toolbox-cmd disk shrinkonly` 来压缩磁盘占用。或者删除快照。
## 参考
> kylinV10
> https://www.cnblogs.com/jiu0821/p/5946062.html
> https://communities.vmware.com/t5/VMware-Workstation-Pro/How-to-mount-Windows-shares-in-Mint-Linux-18-3/td-p/940439
> https://kb.vmware.com/s/article/74650
> https://github.com/vmware/open-vm-tools/issues/321
> https://xpressubuntu.wordpress.com/2015/05/11/resolving-no-shared-folders-with-vmware-player-7-and-ubuntu-15-04-guest/comment-page-1/#comment-708
> https://askubuntu.com/questions/591664/files-missing-in-mnt-hgfs-on-ubuntu-vm
> deepin/uos
> [Mounting Shared Folders in a Linux Guest](https://docs.vmware.com/en/VMware-Workstation-Pro/16.0/com.vmware.ws.using.doc/GUID-AB5C80FE-9B8A-4899-8186-3DB8201B1758.html)
> [Solved: Shared folders no longer showing up in guest OS Ub... - VMware Technology Network VMTN](https://communities.vmware.com/t5/VMware-Fusion-Discussions/Shared-folders-no-longer-showing-up-in-guest-OS-Ubuntu-16-04/td-p/509366)
> [VMware Knowledge Base](https://kb.vmware.com/s/article/1003910)
> [Issue #01 - VMware Linux Client Cannot Mount the Shared Folder Automatically - Manjaro dot site](https://manjaro.site/issue-01-vmware-linux-client-cannot-mount-the-shared-folder-automatically/)