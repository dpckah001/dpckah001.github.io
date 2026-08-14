---
layout: post
title:  "Github怎么在wsl中加速使用"
date:   2026-08-14 21:56:00 +0800
categories: tech
tags: [github,wsl2,wsl,加速]
---

### Github怎么在wsl中加速使用
鉴于Windows10系统尚未引入mirrors镜像功能（windows11采用了），于是采用修改wsl的.gitconfig文件并采用代理工具来实现。

首先，打开wsl，启动你的linux子系统后。（因为wsl使用的是nat方式连接）
```bash
cat /etc/resolv.conf #获取你的windows ip地址
```
查找这一行
```conf
nameserver xxx.xx.xx.xx
```

然后输入
```bash
cd ~
vim ~/.gitconfig
```
输入以下内容并替换xxx为你个windows ip地址（注意端口号看你的代理软件给局域网连接开的什么端口，v2rayn通常为10808）
```gitconfig
[http]
    proxy = http://xxx.xx.xx.xx:10808
[https]
    proxy = http://xxx.xx.xx.xx:10808
```

然后进入代理软件，开启设置里的允许局域网连接的设备。即可

然后就可以（参考仓库地址）
```bash
git clone https://github.com/pwndbg/pwndbg.git
```

注意：本篇文章参考https://www.cnblogs.com/geekbruce/articles/18928764 ，如有问题，还请私信。