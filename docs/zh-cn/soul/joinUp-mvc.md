---
title: 接入soul网关
keywords: soul
description: 接入soul网关
---



## 说明

* 此篇文章是教你如何把自己的项目中的接口，快速接入到soul网关.

* 只适合springboot用户.

* 接入前，请正确的启动 `soul-admin` ,`soul-bootstrap`.


## springMvc  (springboot用户)

* 引入jar包

```
<dependency>
   <groupId>org.dromara</groupId>
   <artifactId>soul-client-springmvc</artifactId>
   <version>2.1.0-RELEASE</version>
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


* 启动你的项目，你标上 `soulClient` 的方法已经注册到soul网关.


####  到这里对于 springMvc 项目 还不是最佳的接入方式，因为我们还没有接入ip与端口. 如果是以上的话，还需要在soul-admin 中的divide插件中找到你对应的路由，然后手动填写地址。


*  我们来开始最佳实现，实现ip端口的自动注册（因为如果您使用docker容器部署的话，ip端口会变动，每次发布都需要手动去改，这谁顶的住啊？）

*  第一步 ： 修改 `soul-admin` 中的yml，加上如下配置,需要有zookeeper. 然后重启 `soul-admin`

```yml
soul:
  http:
    register: true   # 设置为true
    zookeeperUrl: localhost:2181  #设置你的zk地址
```
 
*  第二步:修改你接入项目中的yml配置，增加如下配置，启动你的 springboot项目.

```yml
soul:
  http:
    zookeeperUrl: localhost:2181  #设置你的zk地址
```

* 大功告成，你的服务已经接入到 soul,里面就可以访问拉 ，如果还有不懂的，可以参考 `soul-test-http`项目.


## 插件设置

* 在 `soul-admin` 插件管理中，把divide插件设置为开启。