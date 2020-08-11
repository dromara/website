---
title: SpringCloud快速体验
keywords: SpringCloud
description: Hmily-SpringCloud分布式事务体验
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

# 使用你的工具 idea 打开项目，找到hmily-demo-springcloud项目。

## 启动 hmily-demo-springcloud-eureka项目中的 EurekaServerApplication.java。


## 修改项目配置（hmily-demo-springcloud-account为列子）

* 修改业务数据库(account项目为列子)

```yml
spring:
    datasource:
        driver-class-name:  com.mysql.jdbc.Driver
        url: jdbc:mysql://localhost:3306/tcc_account?useUnicode=true&characterEncoding=utf8
        username: 你的用户名
        password: 你的密码
```

* 修改事务日志数据库 (account项目为列子)
```yml
org:
    dromara:
         hmily :
            app-name: sc-account
            serializer : kryo
            recoverDelayTime : 128
            retryMax : 30
            scheduled-recovery-delay: 60
            scheduledThreadMax :  10
            repository : mysql
            hmilyDbConfig :
                 driverClassName  : com.mysql.jdbc.Driver
                 url: jdbc:mysql://127.0.0.1:3306/hmily?useUnicode=true&characterEncoding=utf8
                 username : 你的用户名
                 password : 你的密码

```

* run  SpringCloudHmilyAccountApplication.java

### 启动hmily-demo-springcloud-inventory 参考上述。

### 启动hmily-demo-springcloud-order 参考上述。

### 访问 http://127.0.0.1:8884/swagger-ui.html。 运行 orderPay进行体验。

