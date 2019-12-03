---
title: 启动服务
keywords: soul-server
description:  启动服务
---


## 说明

* 这个是整个soul服务的核心.

* 默认使用了 websocket 数据同步方式.


## 服务端启动

* 获取jar包

```
> wget  https://yu199195.github.io/jar/soul-bootstrap.jar

>  java -jar soul-bootstrap.jar

```

* 在jar包中默认使用了websocket来进行数据同步， 可以使用 `--soul.sync.websocket.url` 来指定 soul-admin的地址.
                                           


## 本地启动

* 拉取代码,进行编译

 ```
   > git clone https://github.com/Dromara/soul.git

   > cd soul

   > mvn -DskipTests clean install -U
```
    
* 使用你的idea打开，执行maven install clean

* 修改application.yml（默认情况下，如果你的admin 端口地址没变，就不修改）
```yml
server:
  port: 9195
  address: 0.0.0.0

spring:
   main:
     allow-bean-definition-overriding: true
   application:
    name: soul-bootstrap

soul :
    sync:
        strategy: websocket
        websocket :
             url: ws://localhost:9095/websocket
#        zookeeper:
#             url: localhost:2181
#             sessionTimeout: 5000
#             connectionTimeout: 2000
#        http:
#             url : http://localhost:9095


#eureka:
#  instance:
#    leaseRenewalIntervalInSeconds: 10
#    leaseExpirationDurationInSeconds: 30
#  client:
#    serviceUrl:
#      defaultZone: http://localhost:8761/eureka/


logging:
    level:
        root: info
        org.springframework.boot: info
        org.apache.ibatis: info
        org.dromara.soul.bonuspoint: info
        org.dromara.soul.lottery: info
        org.dromara.soul: info

    path: "./logs/web"

```

* 启动 `org.dromara.soul.bootstrap.SoulBootstrapApplication` 

     