---
title: springcloud快速体验
keywords: springcloud-start
description:  springcloud快速体验
---


# 环境准备

  *   #### JDK 1.8+

  *   #### Maven 3.2.x

  *   #### Git


# 代码拉取

 ```
   > git clone https://github.com/yu199195/hmily.git

   > cd hmily

   > mvn -DskipTests clean install -U
   ```

 # 执行demo 模块的sql语句。

   [sql语句] (https://github.com/yu199195/hmily/blob/master/hmily-demo/sql/hmily-demo.sql) 


# 使用你的工具 idea 或者eclipse 打开项目。

* 修改业务数据库
```yml
spring:
    datasource:
        driver-class-name:  com.mysql.jdbc.Driver
        url: jdbc:mysql://192.168.1.68:3306/tcc_account?useUnicode=true&characterEncoding=utf8
        username: xiaoyu
        password: Wgj@555888
```
* 修改事务日志数据库 (account项目为列子)
```yml
org:
    dromara:
         hmily :
            serializer : kryo
            recoverDelayTime : 128
            retryMax : 30
            scheduledDelay : 128
            scheduledThreadMax :  10
            repositorySupport : db
            started: false
            hmilyDbConfig :
                 driverClassName  : com.mysql.jdbc.Driver
                 url :  jdbc:mysql://192.168.1.98:3306/tcc?useUnicode=true&amp;characterEncoding=utf8
                 username : root
                 password : 123456

```

*  #####  run EurekaServerApplication.java

*  #####  run  SpringCloudHmilyAccountApplication.java

*  #####  run  SpringCloudHmilyInventoryApplication.java

*  #####  run  SpringCloudHmilyOrderApplication.java  

*  ####  访问 http://127.0.0.1:8084/swagger-ui.html
