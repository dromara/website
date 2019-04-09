---
title: 启动服务
keywords: soul-server
description:  启动服务
---



* Clone & Build
   ```
   > git clone https://github.com/Dromara/soul.git

   > cd soul

   > mvn -DskipTests clean install -U
   ```
* 启动soul前，先启动admin会比较好。

* 本地启动：
    
    * 使用你的idea打开，执行maven install clean

    * 修改application.yml,如果zookeeper插件是必须配置的。 如果你使用限流插件，请配置redis。如果是使用监控插件，请配置influxdb，如果是使用springcloud插件，还需要配置eureka.
```yml
server:
  port: 8088
  address: 0.0.0.0

spring:
   application:
    name: soul-bootstrap
   redis:
    host: 192.168.1.88
    password: foobaredbbexONE123
    port: 6379
   influxdb:
        url: http://localhost:8086
        username: test
        password: test
        database: test
        retention-policy: autogen
        connect-timeout: 10
        read-timeout: 30
        write-timeout: 10
   zookeeper:
        url : localhost:2181
        sessionTimeout: 5000
        connectionTimeout : 2000
soul:
    timeDelay: 1000
    bufferSize: 2048
    timeVerify:
       enabled: true
eureka:
  instance:
    leaseRenewalIntervalInSeconds: 10
    leaseExpirationDurationInSeconds: 30
  client:
    serviceUrl:
      defaultZone: http://eureka.didispace.com/eureka/
```

* 执行 SoulBootstrapApplication main方法启动。

## 自定义方式服务启动：

   * 新建一个项目可以参考soul-bootstrap项目 首先引入soul所需要的jar包

   ```xml
     <dependency>
            <groupId>org.dromara</groupId>
            <artifactId>soul-spring-boot-starter</artifactId>
            <version>1.0.4-RELEASE</version>
     </dependency>

   ```

   or

  ```xml
   <dependency>
            <groupId>org.dromara</groupId>
            <artifactId>soul-web</artifactId>
            <version>1.0.4-RELEASE</version>
     </dependency>

  ```
  
   * 参考soul-bootstrap ,引入webflux依赖包。

   * 参考soul-bootstrap 配置yml文件。然后maven 打包，自己启动的jar包。
 
   * 可以使用soul提供的脚步执行[start-web](https://github.com/Dromara/soul/blob/master/script/start-web.sh)

   * 把jar包上传到服务器的/data/apps/soul目录

   * 执行脚步  ./start-admin.sh  start prod 这个就会使用application-prod.yml 启动 ，同理 dev 就是使用application-dev.yml
        
     