---
title: springcloud插件
keywords: springcloud
description: springcloud插件
---


## 说明

* 本篇主要讲解如何使用springcloud插件以及注意事项


## 插件设置

* 在 `soul-admin` 管理后台，插件管理-> springCloud ,设置为开启。

## 启动项目设置

* 首先确保你的启动项目中，新增了springCloud需要的jar包。

```
 <dependency>
     <groupId>org.springframework.cloud</groupId>
     <artifactId>spring-cloud-starter-netflix-eureka-client</artifactId>
     <version>2.0.0.RELEASE</version>
</dependency>

<dependency>
    <groupId>org.springframework.cloud</groupId>
    <artifactId>spring-cloud-commons</artifactId>
    <version>2.0.0.RELEASE</version>
</dependency>
```

* 确保 `soul-bootstrap` 中的 eureka配置,或者通过`--eureka.client.serviceUrl.defaultZone=你的地址` 然后重启项目. 

```yml
eureka:
  instance:
    leaseRenewalIntervalInSeconds: 10
    leaseExpirationDurationInSeconds: 30
  client:
    serviceUrl:
      defaultZone: http://localhost:8761/eureka/   你的地址
```

## 使用


* 选择器：
    ![](https://yu199195.github.io/images/soul/springcloud-selector.png)

* 应用名称：就是你根据条件匹配以后，需要调用的你的具体的应用名称。

* soul会从eureka上面根据应用名称获取对应的服务，发起http代理调用
   
* 规则图：

 ![](https://yu199195.github.io/images/soul/springcloud-rule.png)

       
* Hystrix ： 进行Springcloud http调用时候熔断器的参数。

* Springcloud配置：废弃。

