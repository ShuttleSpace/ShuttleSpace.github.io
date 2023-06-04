---
title: nginx(docker) 如何更新 letsencrypt 证书
top: 0
copyright: true
date: 2023-02-25 23:52:16
updated: 2023-02-25 23:52:16
permalink:
password:
comments:
tags:
categories:
keywords: docker, nginx, letsencrypt
description:
---
当前的个人主页是运行在 docker nginx 上的。为了安全起见，把所有的 http 请求已经转发到了 https, 免费的 SSL 证书过期了，所以使用了 letsencrypt 的免费证书来签名。但是它默认的是 3 个月有效期，所以必须得定期去更新。否则就会导致 nginx 服务不可用了。以下为如何在 docker 上更新 letsencrypt 证书.

<!-- more -->

### 部署架构

众所周知，docker 的命令配置大都很长，一般是通过shell 脚本或者 docker-compose.yaml 文件来进行管理的。而我采用的就是后者。

如果一台主机上运行了多个 docker 容器，那么这个 docker-compose.yaml 就可能会很大。每次调用 docker-compose up/down 时都会导致所有的容器被销毁重建。所以这里采用了 sidecar 的模式，既可以保证各个容器的配置文件各自保存，又能保证容器之间可以互相访问。

以下以 nginx 和 couchdb 为例.

couchdb/docker-compose.yaml

```yaml
version: "3.6"

services:
  couchdb:
    image: couchdb
    container_name: couchdb
    volumes:
      - "./config/local.ini:/opt/couchdb/etc/local.ini"
      - "./data:/opt/couchdb/data"
    restart: always
    ports:
      - '5984:5984'
    networks:
      - default
      - main
networks:
    main:
      external: true
```

这里新建了一个名为 main 的 networks, 属性 `external` 设置为 true, 同时设置容器的 networks 为 default + main, 后面只要其他容器都在 main 这个网络内，都是可以直接 localhost 或者端口互相访问的。

nginx/docker-compose.yaml

```yaml
version: "3.6"

services:
  nginx:
    container_name: "home"
    restart: always
    image: nginx
    ports:
      - "80:80"
      - "443:443"
    volumes:
      - ./nginx/html:/usr/share/nginx/html:rw
      - ./nginx/etc/nginx:/etc/nginx:rw
      - ./certbot/letsencrypt/live:/etc/letsencrypt/live:rw
      - ./certbot/letsencrypt/archive:/etc/letsencrypt/archive:rw
      - ./certbot/dhparam-2048.pem:/etc/letsencrypt/dhparam-2048.pem:rw
    networks:
      - default
      - main
    external_links:
      - obsidian_couchdb
    environment:
      - TZ=Asia/Shanghai
networks:
   main:
     external: true
```

那么在 nginx 中就可以直接访问 couchdb 了.

```conf
location /couchdb {
  rewrite /couchdb(.*) $1 break;
  proxy_pass http://couchdb:5984;
}
```

![docker sidecar arch](http://picbed.dang8080.cn/nginx-letsencrypt.png)

### 使用 letsencrypt 生成证书

首先看下 letsencrypt 的 docker-compose

```yaml
version: "3.6"

services:
  certbot:
    image: certbot/certbot:latest
    container_name: home_certbot
    #ports:
    #  - 80:80
    #  - 443:443
    volumes:
      - ./letsencrypt:/etc/letsencrypt:rw
      - ./log:/var/log:rw
    command: certonly -n --webroot -w=/etc/letsencrypt --email dang8080@qq.com -d dang8080.cn  --agree-tos --force-renewal
    # command: auth --standalone -m dang8080@qq.com --agree-tos -d dang8080.cn # 自动开启一个web服务，且外部能访问
```

letsencrypt 提供了 certbot 命令行工具来生成 SSL 证书. 这里同样使用 docker-compose.

certbot 运行时，需要本机提供一个 http 服务，即外部能访问的 http://[本机域名]/.well-known/acme-challenge/[随机字符串] http 服务。本机域名就是要申请 SSL 证书的域名。

这里的 http 服务有两个选择:

1、如果已经有了 nginx/apache 等服务，那么使用它就行，不过需要配置路由和文件映射(因为是运行在 docker 中)

2、使用 certbot 提供的 http 服务

这里我选择了方案1, nginx 需要添加一条新 location 满足 letsencrypt 访问的需求

```
server {
	listen 80;
	listen [::]:80;
	server_name dang8080.cn localhost;
	root /usr/shar/nginx/html;

	location / {
		root /usr/share/nginx/html;
		return 301 https://dang8080.cn$request_uri;
	}

	location ^~ /.well-known/acme-challenge/ {
		allow all;
		default_type "text/plain";
		root /var/www/dang8080.cn;
	}
}
```

注意: `/.well-known/acme-challenge 的 root 必须是 /var/www/dang8080.cn 否则会报 404.`

certbot 使用的参数

> --webroot -w 指定生成的 ssl 证书目录，注意这里是在 docker 中运行的，所以需要将其映射到本地文件系统

> --agree-tos 跳过 cli 中的交互式问询

> --force-renewal 如果指定目录有证书还没过期，那么也要强制重新更新

> --standalone 就是 certbot 开启一个新的 http 服务.

执行完后就能在本地看到生成的 ssl 证书了

![](http://picbed.dang8080.cn/202302261012588.png)

### 配置 nginx

因为 nginx 运行在 docker 中，而生成的 ssl 证书在其他目录，所以需要将 ssl 证书目录也映射到 ngixn 容器中.

```yaml
  - ./certbot/letsencrypt/live:/etc/letsencrypt/live:rw
  - ./certbot/letsencrypt/archive:/etc/letsencrypt/archive:rw
  - ./certbot/dhparam-2048.pem:/etc/letsencrypt/dhparam-2048.pem:rw
```

> 需要说明的是：letsencrypt 生成的 live 目录证书会软链接到 archive 目录，而 docker 对软链接支持不友好，所以需要同时映射 archive 目录和 live 目录

> 同时为了 ssl 安全，使用 2048位的 DH 参数. 生成方式 `openssl dhparam -out dhparam-2048.pem 2048`

https.conf

```conf
ssl_certificate /etc/letsencrypt/live/dang8080.cn/fullchain.pem;
ssl_certificate_key /etc/letsencrypt/live/dang8080.cn/privkey.pem;
ssl_trusted_certificate /etc/letsencrypt/live/dang8080.cn/chain.pem;

ssl_dhparam /etc/letsencrypt/dhparam-2048.pem;
```

### 定期更新

前面提到，letsencrypt 生成的 ssl 证书一般只有3个月有效期，所以得定期更新.这里使用 crontab 更新就行.

rewnew.sh

```shell
#! /usr/bin/env sh

pushd ~/[]/certbot &&
sudo docker-compose up -d &&
sudo docker kill --signal=HUP [] &&
sudo docker-compose down
```

或者

```shell
#!/usr/bin/env sh

sudo docker run -it --rm \
  -v /home/[]certbot/letsencrypt:/etc/letsencrypt \
  -v /home/[]certbot/log:/var/log \
  certbot/certbot \
  renew --webroot -w /etc/letsencrypt --quiet && sudo docker kill --signal=HUP []
```

编辑 crontab: `crontab -e`

```shell
0 1 * * 0 ~/homepage/certbot/renew.sh
```
