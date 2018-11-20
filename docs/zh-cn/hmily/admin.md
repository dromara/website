---
title: Hmily-Admin
keywords: admin
description: Hmily-Admin
---


### Hmily-Admin 启动教程:

* admin 是Hmily中查看事务日志的后台管理系统。 可以查看异常的日志，修改重试次数等功能.

* 首先确保你的项目使用了Hmily并且正常运行.

* 首先用户使用的JDK必须是1.8+  本地安装了git ,maven ，执行以下命令

```xml
git clone https://github.com/yu199195/hmily.git

maven clean install
```

* 使用你的开发工具打开项目，比如idea Eclipse

### 步骤一： 修改配置

```yml
server:
   port: 8888
   servlet:
     context-path: /hmily-admin

spring:
   application:
      name: hmily-admin
   profiles:
     active: db

hmily:
  admin :
    userName : admin
    password : admin

compensation:
   application:
      list : account-service,inventory-service,order-service
   serializer :
      support: kryo
   retry :
      max: 10

```

## 配置解释

* 关于 compensation.application.list配置：这里需要配置每个参与Tcc分布式事务的系统模块的applicationName，多个模块用 "," 分隔，这里必须要配置。

* 关于 compensation.serializer.support 配置，这里是指参与Hmily分布式事务系统中，配置事务补偿信息的序列化方式。

* 关于 spring.profiles.active 配置 admin项目激活的类型，支持db，file，mongo，zookeeper，
  这里是指参与Hmily分布式事务系统中，配置事务补偿信息存储方式，如果您用db存储，那这里就配置成db，同时配置好db等信息。 其他方式同理。 注意，每个模块请使用相同的序列化方式和存储类型

* 关于 Hmily.admin 等配置。 这里就是管理后台登录的用户与密码，用户可以进行自定义更改。


### 步骤二：修改本项目static 文件夹下的 index.html

```html
<!--href 修改成你的ip 端口-->
<a id="serverIpAddress" style="display: none" href="http://192.168.1.132:8888/admin">
```

### 步骤三: 运行 AdminApplication 中的main方法。

### 步骤四:在浏览器访问  http://ip:port/tcc-admin/index.html  ,输入用户名，密码登录。

### 如有任何问题欢迎加入QQ群：162614487 进行讨论