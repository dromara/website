---
title: 接入soul网关
keywords: soul
description: 接入soul网关
---



## 说明

* 此篇文章是教你如何把自己的项目中的接口，快速接入到soul网关.

* 只适合springboot用户.

* 接入前，请正确的启动 `soul-admin` ,`soul-bootstrap`.




## springcloud 用户
* 引入jar包，在你的提供者服务里面

```
 <dependency>
     <groupId>org.dromara</groupId>
     <artifactId>soul-client-springcloud</artifactId>
     <version>2.1.1-RELEASE</version>
</dependency>
```

* yml配置

```yml
soul:
  http:
    adminUrl: http://localhost:9095
    contextPath: /http
    appName: http
# adminUrl: 为你启动的soul-admin 项目的ip + 端口，注意要加http://
# contextPath: 为你的这个mvc项目在soul网关的路由前缀，这个你应该懂意思把？ 比如/order ，/product 等等，网关会根据你的这个前缀来进行路由.
# appName：你的应用名称，不配置的话，会默认取 `spring.application.name` 的值
```

* 在你的 `controller`的接口上加上 `SoulClient` 注解

```
@Retention(RetentionPolicy.RUNTIME)
@Target({ElementType.TYPE, ElementType.METHOD})
public @interface SoulClient {

    /**
     * 提供出去的接口路径，注意这里是真实的路径，和你的controller中的方法路径一样.
     * Path string.
     *
     * @return the string
     */
    String path();

    /**
     * 接口路径描述,方便用户选择.
     *
     * @return String
     */
    String desc();

    /**
     * Enabled boolean.
     *
     * @return the boolean
     */
    boolean enabled() default true;
```


* 最后一步，配置 `soul-bootstrap` 中的 eureka配置,或者通过`--eureka.client.serviceUrl.defaultZone=你的地址` 然后重启项目. 

```yml
eureka:
  instance:
    leaseRenewalIntervalInSeconds: 10
    leaseExpirationDurationInSeconds: 30
  client:
    serviceUrl:
      defaultZone: http://localhost:8761/eureka/   你的地址
```

* 启动你的项目，标上 `soulClient` 的方法已经注册到soul网关. 如果有不懂的，可以参考`soul-http-springcloud`


## 插件设置

* 在 `soul-admin` 插件管理中，把 springCloud插件设置为开启。