---
title: 启动admin
keywords: admin
description: 启动admin
---




* Clone & Build
   ```
   > git clone https://github.com/Dromara/soul.git

   > cd soul

   > mvn -DskipTests clean install -U
   ```
* 执行[soul.sql](https://github.com/Dromara/soul/blob/master/script/soul.sql)

* 本地启动:
 
   * 使用你的idea 打开项目,maven install
   * 修改yml文件，修改你的数据库与zookeeper配置，注意环境。
```yml
server:
  port: 8082
  address: 0.0.0.0

spring:
   datasource:
     url: jdbc:mysql://192.168.1.98:3306/soul?useUnicode=true&characterEncoding=utf-8&zeroDateTimeBehavior=CONVERT_TO_NULL&failOverReadOnly=false&autoReconnect=true
     username: root
     password: 123456
     dbcp2:
       driver-class-name: com.mysql.jdbc.Driver
   zookeeper:
     url : localhost:2181
     sessionTimeout: 5000
     connectionTimeout : 2000
     serializer : KryoSerializer

mybatis:
  config-location: classpath:/mybatis/mybatis-config.xml
  mapper-locations: classpath:/mappers/*.xml
```
* 启动 SoulAdminApplication.


* 服务启动：
  
   * 其实admin项目就是一个springboot 的jar包。
 
   * 使用soul提供的脚步执行.[start-admin](https://github.com/Dromara/soul/blob/master/script/start-admin.sh)

   * 把jar包上传到服务器的/data/apps/soul目录

   * 执行脚步  ./start-admin.sh  start prod 这个就会使用application-prod.yml 启动 ，同理 dev 就是使用application-dev.yml
 
