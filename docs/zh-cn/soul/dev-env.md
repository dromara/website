---
title: 环境搭建
keywords: soul
description: 环境搭建
---



## 说明

* 本文是说明,如果搭建soul的开发环境，来进行自定义开发.

* soul很多地方都是高度可以扩展的.



## 直接使用 soul-bootstrap (推荐)

* 这个项目是非常轻量的，就是一个springboot的jar包,我已经设置了一些默认配置

* 拉取代码,进行编译

 ```
   > git clone https://github.com/Dromara/soul.git

   > cd soul

   > mvn -DskipTests clean install -U
```
* 在soul-bootstrap 中，进行各种你的扩展，完成以后，打出jar包，然后启动就完事。



## 自定义 web

* 首先你新建一个springboot项目，可以参考 soul-bootstrap.

* 引入`soul-spring-boot-starter`

```
<dependency>
      <groupId>org.dromara</groupId>
      <artifactId>soul-spring-boot-starter</artifactId>
      <version>2.1.2-RELEASE</version>
</dependency>
```

* 引入 `spring-webflux`,可以参考 soul-bootstrap.

```
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-webflux</artifactId>
</dependency>2.1.2.RELEASE</dependency>

<dependency>
     <groupId>org.projectreactor</groupId>
     <artifactId>reactor-spring</artifactId>
     <version>1.0.1.RELEASE</version>
</dependency>
```

* 如果你支持springcloud,可能还需要引入springcloud的包，并且配置注册中心，非必须.  可以参考 soul-bootstrap.


* 你的项目环境搭建完成.





