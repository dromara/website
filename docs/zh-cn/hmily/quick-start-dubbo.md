---
title: Dubbo快速体验
keywords: Dubbo
description: Dubbo快速体验
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


# 使用你的工具 idea 打开项目，找到hmily-demo-dubbo项目。

## 修改项目配置（hmily-demo-dubbo-account为列子）

* 修改业务数据库(account项目为列子)

```yml
spring:
    datasource:
        driver-class-name:  com.mysql.jdbc.Driver
        url: jdbc:mysql://localhost:3306/tcc_account?useUnicode=true&characterEncoding=utf8
        username: 
        password:
```

* 修改事务日志数据库 (account项目为列子)
```yml
org:
    dromara:
         hmily :
            app-name: account
            serializer : kryo
            recoverDelayTime : 60
            retryMax : 30
            scheduledRecoveryDelay : 60
            scheduledThreadMax :  10
            repository : mysql
            hmilyDbConfig :
                 driverClassName : com.mysql.jdbc.Driver
                 url :  jdbc:mysql://127.0.0.1:3306/hmily?useUnicode=true&characterEncoding=utf8
                 username : root
                 password :

```

* 在spring-dubbo中修改你的zookeeper地址

 ```xml
  <dubbo:registry protocol="zookeeper" address="localhost:2181"/>
```

* run  DubboHmilyAccountApplication.java

### 启动hmily-demo-dubbo-inventory 参考上述。

### 启动hmily-demo-dubbo-order 参考上述。

### 访问 http://127.0.0.1:8087/swagger-ui.html。 运行 orderPay进行体验。

