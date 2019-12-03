---
title: 接入soul网关
keywords: soul
description: 接入soul网关
---



## 说明

* 此篇文章是教你如何把自己的项目中的接口，快速接入到soul网关.

* 只适合springboot用户.

* 接入前，请正确的启动 `soul-admin` ,`soul-bootstrap`.


## dubbo用户  (alibaba-dubbo ,版本小于2.7的用户)

* 引入jar包，在你的提供者服务里面

```
 <dependency>
     <groupId>org.dromara</groupId>
     <artifactId>soul-client-alibaba-dubbo</artifactId>
     <version>2.1.0-RELEASE</version>
</dependency>
```

* yml配置
```yml
soul:
  dubbo:
    adminUrl: http://localhost:9095
    contextPath: /http
    appName: http


# adminUrl: 为你启动的soul-admin 项目的ip + 端口，注意要加http://
# contextPath: 为你的这个mvc项目在soul网关的路由前缀，这个你应该懂意思把？ 比如/order ，/product 等等，网关会根据你的这个前缀来进行路由.
# appName：你的应用名称，不配置的话，会默认取 dubbo配置中application 中的名称
```

* 在实现类上加上 `soulClient` 注解

```
@Retention(RetentionPolicy.RUNTIME)
@Target({ElementType.TYPE, ElementType.METHOD})
public @interface SoulClient {

    /**
     * 提供出去的接口路径,http路径
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

* 启动你的提供者,大功告成，你的dubbo接口已经发布到 soul网关.如果还有不懂的，可以参考 `soul-test-dubbo`项目.


## dubbo用户  (apache-dubbo ,版本大于等于2.7的用户)

* 引入jar包，在你的提供者服务里面

```
 <dependency>
     <groupId>org.dromara</groupId>
     <artifactId>soul-client-apache-dubbo</artifactId>
     <version>2.1.0-RELEASE</version>
</dependency>
```

* yml配置

```yml
soul:
  dubbo:
    adminUrl: http://localhost:9095
    contextPath: /http
    appName: http


# adminUrl: 为你启动的soul-admin 项目的ip + 端口，注意要加http://
# contextPath: 为你的这个mvc项目在soul网关的路由前缀，这个你应该懂意思把？ 比如/order ，/product 等等，网关会根据你的这个前缀来进行路由.
# appName：你的应用名称，不配置的话，会默认取 dubbo配置中application 中的名称
```


* 在实现类上加上 `soulClient` 注解
```
@Retention(RetentionPolicy.RUNTIME)
@Target({ElementType.TYPE, ElementType.METHOD})
public @interface SoulClient {

    /**
     * 提供出去的接口路径,http路径
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

* 启动你的提供者,大功告成，你的dubbo接口已经发布到 soul网关.如果还有不懂的，可以参考 `soul-test-dubbo`项目.


## dubbo 插件设置

* 首先在 `soul-admin` 插件管理中，把dubbo插件设置为开启。

* 其次在 dubbo插件中配置你的注册地址: 改成你的zookeeper地址，或者其他注册中心的地址.

```
{"register":"zookeeper://localhost:2181"}

```