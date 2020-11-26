---
title: soul极简入门
keywords: soul
description:  soul极简入门
---

目录：

- [1. 概述](http://www.iocoder.cn/Soul/install/)
- [2. 单机部署](http://www.iocoder.cn/Soul/install/)
- [3. 接入 Dubbo 应用](http://www.iocoder.cn/Soul/install/)
- [4. 接入 Spring Boot 应用](http://www.iocoder.cn/Soul/install/)
- [5. 接入 Spring Cloud 应用](http://www.iocoder.cn/Soul/install/)
- [6. rateLimiter 插件](http://www.iocoder.cn/Soul/install/)
- [7. hystrix 插件](http://www.iocoder.cn/Soul/install/)
- [666. 彩蛋](http://www.iocoder.cn/Soul/install/)

> - 作者：[芋道源码](https://github.com/YunaiV)
> - [原文地址](http://www.iocoder.cn/Soul/install/?soul)
>
> 大家好，我是艿艿，一个永远 18 岁的技术宅

-------

# 1. 概述

[Soul](https://github.com/Dromara/soul) 是基于 [WebFlux](http://www.iocoder.cn/Spring-Boot/WebFlux/?self) 实现的**响应式**的 API 网关，具有异步、高性能、跨语言等特点。

> 作者：我希望能够有一样东西像**灵魂**一样，保护您的微服务。在参考了 Kong、[Spring Cloud Gateway](http://www.iocoder.cn/categories/Spring-Cloud-Gateway/?self) 等优秀的网关后，站在巨人的肩膀上，Soul 由此诞生！
>
> 作者是艿艿的大表弟，胖友信么？！

目前 Soul 功能列表如下：

* 支持各种语言，无缝集成到 Dubbo、Spring Cloud、Spring Boot 中。
    > Soul 是极其少支持 Dubbo 的 API 网关，通过 [Dubbo 泛化调用](http://www.iocoder.cn/Dubbo/good-collection/?self) 实现。

* 支持各种语言(http协议)，支持 dubbo，springcloud协议。

* 插件化设计思想，插件热插拔,易扩展。

* 灵活的流量筛选，能满足各种流量控制。

* 内置丰富的插件支持，鉴权，限流，熔断，防火墙等等。

* 流量配置动态化，性能极高，网关消耗在 1~2ms。

* 支持集群部署，支持 A/B Test, 蓝绿发布。

整体架构如下图所示：

![架构图](https://yu199195.github.io/images/soul/soul-framework.png)

是不是看着就贼酷炫，实际一脸懵逼。不要慌~我们先来搭建 Soul 网关。

# 2. 单机部署

本小节，我们来单机部署一个 Soul 服务，适合**测试**环境。如下图所示：

![Soul 单机部署](http://www.iocoder.cn/images/Soul/01.png)

## 2.1 MySQL 安装

相信大家都会，艿艿就不瞎哔哔了。嘿嘿~注意，目前最好安装 **5.X** 版本，艿艿一开始用 8.X 存在报错的情况。

安装完成后，创建 `soul` 数据库。

## 2.2 Soul Admin 安装

[Soul Admin](https://dromara.org/zh-cn/docs/soul/admin.html) **控制台**，负责所有流量的管理、**配置**等等，并提供给 **网关服务**读取。

> 友情提示：后续推荐胖友阅读如下两篇文章，搞懂 Soul Admin 和 Soul Bootstrap 的同步的原理：
>
> * [《Soul 文档 —— 数据配置流程》](https://dromara.org/zh-cn/docs/soul/config.html)
> * [《Soul 文档 —— 数据同步原理》](https://dromara.org/zh-cn/docs/soul/dataSync.html)

① 从 <https://yu199195.github.io/jar/soul-admin.jar> 下载**启动 jar 包**。

```Bash
# 创建目录
$ mkdir -p /Users/yunai/Soul
$ cd /Users/yunai/Soul

# 下载
$ wget  https://yu199195.github.io/jar/soul-admin.jar
```

② 通过 `java -jar soul-admin.jar` 命令启动 Soul Admin 控制台。完整命令如下：

```Bash
$ java -jar soul-admin.jar --spring.datasource.url="jdbc:mysql://s1.iocoder.cn:3306/soul?useUnicode=true&characterEncoding=utf-8&zeroDateTimeBehavior=CONVERT_TO_NULL&failOverReadOnly=false&autoReconnect=true&useSSL=false" --spring.datasource.username='root' --spring.datasource.password='3WLiVUBEwTbvAfsh'
```
* `--spring.datasource.url` 配置项，修改成胖友的数据库**地址**。
* `--spring.datasource.username` 配置项，修改成胖友的数据库**账号**。
* `--spring.datasource.password` 配置项，修改成胖友的数据库**密码**。

Soul Admin 会**自动**创建数据库，以及表结构，并初始化默认数据。如下图所示：

![`soul` 数据库](http://www.iocoder.cn/images/Soul/11.png)

> 友情提示：具体的数据库设计，后续可以看看[《Soul 文档 —— 数据库设计》](https://dromara.org/zh-cn/docs/soul/db.html)。

③ 启动完成后，我们可以通过日志看到 Soul Admin 启动在 **9095** 端口。使用浏览器，访问 <http://127.0.0.1:9095/> 地址，进入登录页。

![Soul Admin - 登录页](http://www.iocoder.cn/images/Soul/12.png)

默认内置管理员账号「**admin/123456**」。输入账号密码，进入首页。

![Soul Admin - 首页](http://www.iocoder.cn/images/Soul/13.png)

胖友可以自己随便点点，简单了解下有哪些功能。

## 搭建自己的网关（推荐）

* 首先你新建一个空的springboot项目，可以参考 soul-bootstrap. 也可以在spring官网:[https://spring.io/quickstart]

* 引入如下jar包：
```xml
  <dependency>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-starter-webflux</artifactId>
        <version>2.2.2.RELEASE</version>
  </dependency>

  <dependency>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-starter-actuator</artifactId>
        <version>2.2.2.RELEASE</version>
  </dependency>

  <!--soul gateway start-->
 <dependency>
        <groupId>org.dromara</groupId>
        <artifactId>soul-spring-boot-starter-gateway</artifactId>
        <version>${last.version}</version>
 </dependency>

   <!--soul data sync start use websocket-->
  <dependency>
        <groupId>org.dromara</groupId>
        <artifactId>soul-spring-boot-starter-sync-data-websocket</artifactId>
        <version>${last.version}</version>
  </dependency>
```

* 在你的 `application.yaml` 文件中加上如下配置：
```yaml
spring:
   main:
     allow-bean-definition-overriding: true

management:
  health:
    defaults:
      enabled: false
soul :
    sync:
        websocket :
             urls: ws://localhost:9095/websocket  //设置成你的soul-admin地址
```
* 你的项目环境搭建完成,启动你的项目。

## 2.4 下一步

至此，我们已经完成了 Soul 服务的单机部署，是不是挺简单的。下面，胖友可以根据自己的需要，阅读如下小节：

* [「3. 接入 Dubbo 应用」](#)
* [「4. 接入 Spring Boot 应用」](#)
* [「5. 接入 Spring Cloud 应用」](#)

# 3. 接入 Dubbo 应用

> 示例代码对应仓库：[`lab-60-soul-dubbo-demo-user-service`](https://github.com/YunaiV/SpringBoot-Labs/blob/master/lab-60/lab-60-soul-dubbo-demo/lab-60-soul-dubbo-demo-user-service/)

本小节，我们参考[《Soul 文档 —— Dubbo 用户接入》](https://dromara.org/zh-cn/docs/soul/user-dubbo.html)文章，接入 Soul 服务网关。整个示例架构如下图所示：

![示例的整体架构](http://www.iocoder.cn/images/Soul/21.png)

下面，我们来开始正式接入 Dubbo 应用。

## 3.1 设置 dubbo 插件

先需要设置 [dubbo 插件](https://dromara.org/zh-cn/docs/soul/plugin-dubbo.html) 的**注册中心**，因为 Soul Bootstrap 服务网关需要从**注册中心**获取到 Dubbo 服务的实例列表。

① 使用浏览器，访问 <http://127.0.0.1:9095/#/system/plugin> 地址，进入「系统管理 -> 插件管理」菜单，可以看到 dubbo 插件。如下图所示：

![系统管理 -> 插件管理](http://www.iocoder.cn/images/Soul/22.png)

② 点击 dubbo 插件的「编辑」按钮，设置注册中心的配置。如下图所示：

![系统管理 -> 插件管理 -> 编辑](http://www.iocoder.cn/images/Soul/23.png)

* 因为我们将使用 [Nacos](http://www.iocoder.cn/Nacos/install/?self) 作为 Dubbo 服务的注册中心，所以这里设置为 `{"register":"nacos://localhost:8848"}`。
* 如果胖友使用 [Zookeeper](http://www.iocoder.cn/Zookeeper/install/?self) 作为 Dubbo 服务的注册中心，所以这里设置为 `{"register":"zookeeper://localhost:2181"}`。

> 友情提示：注册中心的地址，记得要填写正确哈~

③ 因为 Soul Bootstrap 和 Soul Admin 暂时不支持插件修改的**自动加载**，所以我们此时需要**手动重启**下。

## 3.2 在网关的pom.xml引入对 dubbo插件的依赖
```xml

<!--soul apache dubbo plugin start-->
<dependency>
      <groupId>org.dromara</groupId>
      <artifactId>soul-spring-boot-starter-plugin-apache-dubbo</artifactId>
      <version>${last.version}</version>
 </dependency>
 <!--soul apache dubbo plugin end-->

<dependency>
      <groupId>org.apache.dubbo</groupId>
      <artifactId>dubbo</artifactId>
      <version>2.7.5</version>
 </dependency>
<!-- Dubbo Nacos registry dependency start -->
<dependency>
     <groupId>org.apache.dubbo</groupId>
     <artifactId>dubbo-registry-nacos</artifactId>
     <version>2.7.5</version>
</dependency>
<dependency>
     <groupId>com.alibaba.nacos</groupId>
     <artifactId>nacos-client</artifactId>
     <version>1.1.4</version>
</dependency>
<!-- Dubbo Nacos registry dependency  end-->

  ```
## 3.3 搭建 Dubbo 示例项目

先快速搭建一个 Dubbo 示例项目，暂未接入 Soul 网关。如下图所示：

![项目结构](http://www.iocoder.cn/images/Soul/24.png)

* [`lab-60-soul-dubbo-demo-user-service-api`](https://github.com/YunaiV/SpringBoot-Labs/blob/master/lab-60/lab-60-soul-dubbo-demo/lab-60-soul-dubbo-demo-user-service-api/)
* [`lab-60-soul-dubbo-demo-user-service`](https://github.com/YunaiV/SpringBoot-Labs/blob/master/lab-60/lab-60-soul-dubbo-demo/lab-60-soul-dubbo-demo-user-service/)

> 友情提示：如果胖友对 Dubbo + Nacos 不了解的胖友，可以阅读[《芋道 Spring Boot Dubbo 入门》](http://www.iocoder.cn/Spring-Boot/Dubbo/?self)文章。

下面，我们来将它改造接入 Soul 网关。

### 3.2.1 引入依赖

修改 [`pom.xml`](https://github.com/YunaiV/SpringBoot-Labs/blob/master/lab-60/lab-60-soul-dubbo-demo/lab-60-soul-dubbo-demo-user-service/pom.xml) 文件，引入 [`soul-client-apache-dubbo`](https://mvnrepository.com/artifact/org.dromara/soul-client-apache-dubbo) 依赖，它是 Soul 对 Apache Dubbo **2.7.X** 的集成支持。

```XML
<!-- 引入 Soul 针对 Dubbo 的集成的依赖 -->
 <dependency>
        <groupId>org.dromara</groupId>
        <artifactId>soul-spring-boot-starter-client-apache-dubbo</artifactId>
        <version>${last.version}</version>
</dependency>
```

> 友情提示：如果胖友使用 Alibaba Dubbo **2.6.X** 的话,依赖如下：
```XML
<!-- 引入 Soul 针对 Dubbo 的集成的依赖 -->
 <dependency>
        <groupId>org.dromara</groupId>
        <artifactId>soul-spring-boot-starter-client-alibaba-dubbo</artifactId>
        <version>${last.version}</version>
</dependency>
```

### 3.2.2 配置文件

修改 [`application.yaml`](https://github.com/YunaiV/SpringBoot-Labs/blob/master/lab-60/lab-60-soul-dubbo-demo/lab-60-soul-dubbo-demo-user-service/src/main/resources/application.yaml) 配置文件，添加 Soul 配置项如下：

```YAML
soul:
  # Soul 针对 Dubbo 的配置项，对应 DubboConfig 配置类
  dubbo:
    admin-url: http://127.0.0.1:9095 # Soul Admin 地址
    context-path: /user-api # 设置在 Soul 网关的路由前缀，例如说 /order、/product 等等。
                            # 后续，网关会根据该 context-path 来进行路由
    app-name: user-service # 应用名。未配置情况下，默认使用 Dubbo 的应用名
```

`soul.dubbo` 配置项，Soul 对 Dubbo 的配置项，对应 [DubboConfig](https://github.com/Dromara/soul/blob/master/soul-client/soul-client-dubbo/soul-client-dubbo-common/src/main/java/org/dromara/soul/client/dubbo/common/config/DubboConfig.java) 配置类。具体每个配置项的作用，胖友自己看配置项后的注释。

### 3.2.3 UserServiceImpl

需要在 Dubbo Service **实现类**的**方法上**，添加 [`@SoulDubboClient`](https://github.com/Dromara/soul/blob/master/soul-client/soul-client-dubbo/soul-client-dubbo-common/src/main/java/org/dromara/soul/client/dubbo/common/annotation/SoulDubboClient.java) 注解，用于设置每个 Dubbo 方法对应的**请求路径**。这里，我们修改 [UserServiceImpl](https://github.com/YunaiV/SpringBoot-Labs/blob/master/lab-60/lab-60-soul-dubbo-demo/lab-60-soul-dubbo-demo-user-service/src/main/java/cn/iocoder/springboot/lab60/userservice/service/UserServiceImpl.java) 类，添加该注解。代码如下：

```Java
@org.apache.dubbo.config.annotation.Service(version = "1.0.0")
public class UserServiceImpl implements UserService {

    private Logger logger = LoggerFactory.getLogger(getClass());

    @Override
    @SoulDubboClient(path = "/user/get", desc = "获得用户详细")
    public String getUser(Integer id) {
        return "User:" + id;
    }

    @Override
    @SoulDubboClient(path = "/user/create", desc = "创建用户")
    public Integer createUser(UserCreateDTO createDTO) {
        logger.info("[createUser][username({}) password({})]", createDTO.getNickname(), createDTO.getGender());
        return 1;
    }

}
```

`@SoulDubboClient` 注解一共有三个属性：
* `path`：映射的 HTTP 接口的请求路径。
* `desc`：接口的描述，便于知道其用途。
* `enable`：是否开启，默认为 `true` 开启。

后续，在 Dubbo 服务启动时，SoulDubboClient 会自动[解析](https://github.com/Dromara/soul/blob/master/soul-client/soul-client-alibaba-dubbo/src/main/java/org/dromara/soul/client/dubbo/spring/DubboServiceBeanPostProcessor.java) `@SoulDubboClient` 注解的 Dubbo 方法，写入方法的**元数据**到 Soul Admin 控制台，最终通知到 Soul Bootstrap 服务网关上。

## 3.3 简单测试

① 执行 UserServiceApplication 启动 Dubbo 服务。在 IDEA 控制台可以看到如下日志，看到写入 Dubbo 方法的**元数据**到 Soul Admin 控制台。

```Java
2020-05-23 01:27:56.682  INFO 54370 --- [pool-2-thread-1] .d.s.c.d.s.DubboServiceBeanPostProcessor : dubbo client register success :{} {"appName":"user-service","path":"/user-api/user/get","pathDesc":"获得用户详细","rpcType":"dubbo","serviceName":"cn.iocoder.springboot.lab60.userservice.api.UserService","methodName":"getUser","parameterTypes":"java.lang.Integer","rpcExt":"{\"version\":\"1.0.0\"}","enabled":true}
2020-05-23 01:27:56.944  INFO 54370 --- [pool-2-thread-1] .d.s.c.d.s.DubboServiceBeanPostProcessor : dubbo client register success :{} {"appName":"user-service","path":"/user-api/user/create","pathDesc":"创建用户","rpcType":"dubbo","serviceName":"cn.iocoder.springboot.lab60.userservice.api.UserService","methodName":"createUser","parameterTypes":"cn.iocoder.springboot.lab60.userservice.api.dto.UserCreateDTO","rpcExt":"{\"version\":\"1.0.0\"}","enabled":true}
```

② 使用浏览器，访问 <http://127.0.0.1:9095/#/system/metadata> 地址，进入「系统管理 -> 元数据」菜单，可以看到上述注册的元数据。如下图所示：

![系统管理 -> 元数据](http://www.iocoder.cn/images/Soul/25.png)

③ 使用浏览器，访问 <http://127.0.0.1:9095/#/plug/dubbo> 地址，进入「插件列表 -> Dubbo」菜单，看到**选择器**和**规则**。如下图所示：

![插件列表 -> Dubbo](http://www.iocoder.cn/images/Soul/26.png)

点击**选择器** `/user-api` 的「编辑」按钮，查看该选择器的具体信息。如下图所示：

![插件列表 -> Dubbo -> 选择器](http://www.iocoder.cn/images/Soul/27.png)

点击**规则** `/user-api/user/get` 的「编辑」按钮，查看该规则的具体信息。如下图所示：

![插件列表 -> Dubbo -> 规则](http://www.iocoder.cn/images/Soul/28.png)

④ 使用 Postman 模拟请求 <http://127.0.0.1:9195/user-api/user/get> 地址，调用 `UserServiceImpl#getUser(Integer id)` 方法。如下图所示：

![Postman 模拟](http://www.iocoder.cn/images/Soul/29.png)
* 使用 Request **Method** 为 `POST`。
* 请求内容类型为 `application/json`。
* 因为 `UserServiceImpl#getUser(Integer id)` 方法是**非 Bean** 参数类型，所以直接在 Request **Body** 输入具体值即可。

⑤ 使用 Postman 模拟请求 <http://127.0.0.1:9195/user-api/user/create> 地址，调用 `UserServiceImpl#createUser(UserCreateDTO createDTO)` 方法。如下图所示：

![Postman 模拟](http://www.iocoder.cn/images/Soul/30.png)
* 使用 Request **Method** 为 `POST`。
* 请求内容类型为 `application/json`。
* 因为 `UserServiceImpl#createUser(UserCreateDTO createDTO)` 方法是 **Bean** 参数类型，所以直接在 Request **Body** 输入 JSON 数据格式。

至此，我们已经完成了 Soul 网关接入 Dubbo 应用，并进行相应的而测试。

> 友情提示：实际上，我们**也**可以参考[《Soul 文档 —— dubbo 插件》](https://dromara.org/zh-cn/docs/soul/plugin-dubbo.html)，**手动**在 Soul Admin 控制台配置 Dubbo 接口方法的**元数据**，以及进行 dubbo 插件的**选择器**和**规则**的设置，实现 Soul Bootstrap 服务网关转发请求到 Dubbo 服务，**无需**在 Dubbo 项目中引入 `soul-client-apache-dubbo` 依赖。
>
> 也就是说，引入 `soul-spring-boot-starter-client-apache-dubbo` 依赖的目的，是为了实现**自动化**，毕竟**手工**配置比较麻烦，并且容易出错。

# 4. 接入 Spring Boot 应用

* 在网关的pom.xml引入依赖

```xml
  <!--if you use http proxy start this-->
   <dependency>
       <groupId>org.dromara</groupId>
       <artifactId>soul-spring-boot-starter-plugin-divide</artifactId>
       <version>${last.version}</version>
   </dependency>

   <dependency>
       <groupId>org.dromara</groupId>
       <artifactId>soul-spring-boot-starter-plugin-httpclient</artifactId>
       <version>${last.version}</version>
   </dependency>
```

> 示例代码对应仓库：[`lab-60-soul-spring-boot-demo`](https://github.com/YunaiV/SpringBoot-Labs/tree/master/lab-60/lab-60-soul-spring-boot-demo)

本小节，我们参考[《Soul 文档 —— http 用户接入》](https://dromara.org/zh-cn/docs/soul/user-http.html)文章，接入 Soul 服务网关。整个示例架构如下图所示：

![示例的整体架构](http://www.iocoder.cn/images/Soul/40.png)

下面，我们来开始正式接入 Spring Boot 应用。

## 4.1 设置 divide 插件

需要设置 [divide 插件](https://dromara.org/zh-cn/docs/soul/plugin-divide.html) 为**开启**。该插件实现 HTTP **正向**代理的功能，所有 HTTP 类型的请求你，都由它进行**负载均衡**的调用。

使用浏览器，访问 <http://127.0.0.1:9095/#/system/plugin> 地址，进入「系统管理 -> 插件管理」菜单，可以看到 divide 插件。如下图所示：

![系统管理 -> 插件管理](http://www.iocoder.cn/images/Soul/41.png)

默认情况下，divide 插件已经是**开启**状态，所以无需开启。


## 4.2 搭建 Spring Boot 示例项目

先快速搭建一个 Spring Boot 示例项目，暂未接入 Soul 网关。如下图所示：

![项目结构](http://www.iocoder.cn/images/Soul/42.png)
* [`lab-60-soul-spring-boot-demo`](https://github.com/YunaiV/SpringBoot-Labs/tree/master/lab-60/lab-60-soul-spring-boot-demo)

### 4.3.1 引入依赖

修改 [`pom.xml`](https://github.com/YunaiV/SpringBoot-Labs/blob/master/lab-60/lab-60-soul-spring-boot-demo/pom.xml) 文件，引入 [`soul-client-springmvc`](https://mvnrepository.com/artifact/org.dromara/soul-client-springmvc) 依赖，它是 Soul 对 SpringMVC 的集成支持。

```xml
     <dependency>
         <groupId>org.dromara</groupId>
         <artifactId>soul-spring-boot-starter-client-springmvc</artifactId>
         <version>${last.version}</version>
     </dependency>
 ```

### 4.3.2 配置文件

修改 [`application.yaml`](https://github.com/YunaiV/SpringBoot-Labs/blob/master/lab-60/lab-60-soul-spring-boot-demo/src/main/resources/application.yaml) 配置文件，添加 Soul 配置项如下：

```YAML
soul:
  # Soul 针对 SpringMVC 的配置项，对应 SoulHttpConfig 配置类
  http:
    admin-url: http://127.0.0.1:9095 # Soul Admin 地址
    context-path: /sb-demo-api # 设置在 Soul 网关的路由前缀，例如说 /order、/product 等等。
                               # 后续，网关会根据该 context-path 来进行路由
    app-name: sb-demo-service # 应用名。未配置情况下，默认使用 `spring.application.name` 配置项
    port: 8080 #你本项目的启动端口
    full: false   # 设置true 代表代理你的整个服务，false表示代理你其中某几个controller
```

`soul.http` 配置项，Soul 对 SpringMVC 的配置项，对应 [SoulSpringMvcConfig](https://github.com/Dromara/soul/blob/master/soul-client/soul-client-http/soul-client-springmvc/src/main/java/org/dromara/soul/client/springmvc/config/SoulSpringMvcConfig.java) 配置类。具体每个配置项的作用，胖友自己看配置项后的注释。

### 4.3.3 UserController

需要在 Controller 的 **HTTP API 方法上**，添加 [`@SoulSpringMvcClient`](https://github.com/Dromara/soul/blob/master/soul-client/soul-client-http/soul-client-springmvc/src/main/java/org/dromara/soul/client/springmvc/annotation/SoulSpringMvcClient.java) 注解，用于设置每个 API 方法对应的**请求路径**。这里，我们修改 [UserController](https://github.com/YunaiV/SpringBoot-Labs/blob/master/lab-60/lab-60-soul-spring-boot-demo/src/main/java/cn/iocoder/springboot/lab60/controller/UserController.java) 类，添加该注解。代码如下：

```Java
@RestController
@RequestMapping("/user")
public class UserController {

    private Logger logger = LoggerFactory.getLogger(getClass());

    @GetMapping("/get")
    @SoulSpringMvcClient(path = "/user/get", desc = "获得用户详细")
    public String getUser(@RequestParam("id") Integer id) {
        return "DEMO:" + id;
    }

    @PostMapping("/create")
    @SoulSpringMvcClient(path = "/user/create", desc = "创建用户")
    public Integer createUser(@RequestBody UserCreateDTO createDTO) {
        logger.info("[createUser][username({}) password({})]", createDTO.getNickname(), createDTO.getGender());
        return 1;
    }

}
```

`@SoulSpringMvcClient` 注解一共有三个属性：
* `path`：映射的 HTTP 接口的请求路径。
* `desc`：接口的描述，便于知道其用途。
* `enable`：是否开启，默认为 `true` 开启。

后续，在 Spring Boot 应用启动时，SoulSpringMvcClient 会自动[解析](https://github.com/Dromara/soul/blob/master/soul-client/soul-client-http/soul-client-springmvc/src/main/java/org/dromara/soul/client/springmvc/init/SpringMvcClientBeanPostProcessor.java) `@SoulSpringMvcClien` 注解的 API 方法，写入方法的**元数据**到 Soul Admin 控制台，最终通知到 Soul Bootstrap 服务网关上。

## 4.4 简单测试

① 执行 DemoApplication 启动 Spring Boot 应用。在 IDEA 控制台可以看到如下日志，看到写入 HTTP API 方法的**元数据**到 Soul Admin 控制台。


③ 使用浏览器，访问 <http://127.0.0.1:9095/#/plug/divide> 地址，进入「插件列表 -> Divide」菜单，看到**选择器**和**规则**。如下图所示：

![插件列表 -> Divide](http://www.iocoder.cn/images/Soul/44.png)

点击**选择器** `/sb-demo-api` 的「编辑」按钮，查看该选择器的具体信息。如下图所示：

![插件列表 -> Divide -> 选择器](http://www.iocoder.cn/images/Soul/45.png)

点击**规则** `/sb-demo-api/user/get` 的「编辑」按钮，查看该规则的具体信息。如下图所示：

![插件列表 -> Divide -> 规则](http://www.iocoder.cn/images/Soul/46.png)

④ 使用 Postman 模拟请求 <http://127.0.0.1:9195/sb-demo-api/user/get?id=1> 地址，转发到 `GET /user/get` 接口上。如下图所示：

![Postman 模拟](http://www.iocoder.cn/images/Soul/47.png)
* 使用 Request **Method** 为 `GET`。
* 请求参数，直接带在 URL 后面。

⑤ 使用 Postman 模拟请求 <http://127.0.0.1:9195/sb-demo-api/user/create> 地址，转发到 `POST /user/create` 接口上。如下图所示：

![Postman 模拟](http://www.iocoder.cn/images/Soul/48.png)
* 使用 Request **Method** 为 `POST`。
* 请求内容类型为 `application/json`。
* 因为 `POST /user/create` 使用 JSON 接参，所以直接在 Request **Body** 输入 JSON 数据格式。

至此，我们已经完成了 Soul 网关接入 Spring Boot 应用，并进行相应的而测试。

> 友情提示：实际上，我们**也**可以参考[《Soul 文档 —— divide 插件》](https://dromara.org/zh-cn/docs/soul/plugin-divide.html)，**手动**在 Soul Admin 控制台配置 API 接口方法的**元数据**，以及进行 divide 插件的**选择器**和**规则**的设置，实现 Soul Bootstrap 服务网关转发请求到 Spring Boot 应用，**无需**在 Spring Boot 应用中引入 `soul-client-springmvc` 依赖。
>
> 也就是说，引入 `soul-spring-boot-starter-client-springmvc` 依赖的目的，是为了实现**自动化**，毕竟**手工**配置比较麻烦，并且容易出错。
>

# 5. 接入 Spring Cloud 应用

> 示例代码对应仓库：[`lab-60-soul-spring-cloud-demo`](https://github.com/YunaiV/SpringBoot-Labs/tree/master/lab-60/lab-60-soul-spring-cloud-demo)

本小节，我们参考[《Soul 文档 —— springcloud 用户接入》](https://dromara.org/zh-cn/docs/soul/user-springcloud.html)文章，接入 Soul 服务网关。整个示例架构如下图所示：

![示例的整体架构](http://www.iocoder.cn/images/Soul/50.png)

下面，我们来开始正式接入 Spring Cloud 应用。

## 5.1 设置 springcloud 插件

需要设置 [springcloud 插件](https://dromara.org/zh-cn/docs/soul/plugin-springcloud.html) 为**开启**。该插件实现从 Spring Cloud 注册中心获取服务的示例列表，后续使用 [Ribbon](http://www.iocoder.cn/Spring-Cloud-Netflix/Ribbon/?self) 实现**负载均衡**的调用。

使用浏览器，访问 <http://127.0.0.1:9095/#/system/plugin> 地址，进入「系统管理 -> 插件管理」菜单，可以看到 springcloud 插件。如下图所示：

![系统管理 -> 插件管理](http://www.iocoder.cn/images/Soul/51.png)

默认情况下，springcloud 插件已经是**开启**状态，所以无需开启。

## 5.2 安装 Nacos

我们使用 Nacos 作为 Spring Cloud 应用的注册中心，所有胖友可以参照[《Nacos 极简入门》](http://www.iocoder.cn/Nacos/install/?self)文章，搭建一个 Nacos 注册中心。

> 友情提示：如果想要 Eureka 作为 Spring Cloud 应用注册中心的胖友，可以参照[《芋道 Spring Cloud Netflix 注册中心 Eureka 入门》](http://www.iocoder.cn/Spring-Cloud/Netflix-Eureka/?self)文章，搭建一个 Eureka 注册中心。

## 5.3 在网关的pom.xml引入依赖

因为 Soul Bootstrap 需要从注册中心获取 Spring Cloud 应用的实例列表，所以需要集成 Spring Cloud 注册中心。目前，**默认**情况下 Soul Bootstrap 网关服务提供的 `soul-bootstrap.jar` 包，并未引入相关依赖，所以我们需要**自己**修改源码，并进行打包。

```xml
  <!--soul springCloud plugin start-->
  <dependency>
       <groupId>org.dromara</groupId>
       <artifactId>soul-spring-boot-starter-plugin-springcloud</artifactId>
       <version>${last.version}</version>
  </dependency>
   <!--soul springCloud plugin end-->
  <dependency>
        <groupId>com.alibaba.cloud</groupId>
        <artifactId>spring-cloud-starter-alibaba-nacos-discovery</artifactId>
        <version>2.1.0.RELEASE</version>
   </dependency>
   <dependency>
        <groupId>org.springframework.cloud</groupId>
        <artifactId>spring-cloud-commons</artifactId>
        <version>2.2.0.RELEASE</version>
   </dependency>
   <dependency>
        <groupId>org.springframework.cloud</groupId>
        <artifactId>spring-cloud-starter-netflix-ribbon</artifactId>
        <version>2.2.0.RELEASE</version>
   </dependency>
```

* 在网关的yml文件中 新增如下配置:

 ```yaml
   spring:
      cloud:
        nacos:
          discovery:
             server-addr: 127.0.0.1:8848 # 你的nacos地址
   ```

> 友情提示：如果想要 Eureka 作为 Spring Cloud 应用注册中心的胖友，也是修改配置文件，和引入依赖。

④  启动的服务网关，美滋滋~

> 友情提示：启动时，会报 `Connection refused: localhost/127.0.0.1:6379` 错误，这是 Soul 限流功能需要使用到 Redis，可以暂时忽略。

## 5.4 搭建 Spring Cloud 示例项目

先快速搭建一个 Spring Cloud 示例项目，暂未接入 Soul 网关。如下图所示：

![项目结构](http://www.iocoder.cn/images/Soul/52.png)
* [`lab-60-soul-spring-cloud-demo`](https://github.com/YunaiV/SpringBoot-Labs/tree/master/lab-60/lab-60-soul-spring-cloud-demo)

### 5.4.1 引入依赖

修改 [`pom.xml`](https://github.com/YunaiV/SpringBoot-Labs/tree/master/lab-60/lab-60-soul-spring-cloud-demo/pom.xml) 文件，引入 [`soul-client-springcloud`](https://mvnrepository.com/artifact/org.dromara/soul-client-springcloud) 依赖，它是 Soul 对 Spring Cloud 的集成支持。

```xml
 <dependency>
      <groupId>org.dromara</groupId>
      <artifactId>soul-spring-boot-starter-client-springcloud</artifactId>
      <version>${last.version}</version>
 </dependency>
```

### 5.4.2 配置文件

修改 [`application.yaml`](https://github.com/YunaiV/SpringBoot-Labs/blob/master/lab-60/lab-60-soul-spring-cloud-demo/src/main/resources/application.yaml) 配置文件，添加 Soul 配置项如下：

```YAML
soul:
  # Soul 针对 SpringMVC 的配置项，对应 SoulSpringCloudConfig 配置类
  springcloud:
    admin-url: http://127.0.0.1:9095 # Soul Admin 地址
    context-path: /sc-user-service-api # 设置在 Soul 网关的路由前缀，例如说 /order、/product 等等。
                               # 后续，网关会根据该 context-path 来进行路由
    app-name: sc-user-service # 应用名。未配置情况下，默认使用 `spring.application.name` 配置项
```

`soul.springcloud` 配置项，Soul 对 Spring Cloud 的配置项，对应 [SoulSpringCloudConfig](https://github.com/Dromara/soul/blob/master/soul-client/soul-client-http/soul-client-springcloud/src/main/java/org/dromara/soul/client/springcloud/config/SoulSpringCloudConfig.java) 配置类。具体每个配置项的作用，胖友自己看配置项后的注释。

### 5.4.3 UserController

需要在 Controller 的 **HTTP API 方法上**，添加 [`@SoulSpringCloudClient`](https://github.com/Dromara/soul/blob/master/soul-client/soul-client-http/soul-client-springcloud/src/main/java/org/dromara/soul/client/springcloud/annotation/SoulSpringCloudClient.java) 注解，用于设置每个 API 方法对应的**请求路径**。这里，我们修改 [UserController](https://github.com/YunaiV/SpringBoot-Labs/blob/master/lab-60/lab-60-soul-spring-cloud-demo/src/main/java/cn/iocoder/springboot/lab60/controller/UserController.java) 类，添加该注解。代码如下：

```Java
@RestController
@RequestMapping("/user")
public class UserController {

    private Logger logger = LoggerFactory.getLogger(getClass());

    @GetMapping("/get")
    @SoulSpringCloudClient(path = "/user/get", desc = "获得用户详细")
    public String getUser(@RequestParam("id") Integer id) {
        return "DEMO:" + id;
    }

    @PostMapping("/create")
    @SoulSpringCloudClient(path = "/user/create", desc = "创建用户")
    public Integer createUser(@RequestBody UserCreateDTO createDTO) {
        logger.info("[createUser][username({}) password({})]", createDTO.getNickname(), createDTO.getGender());
        return 1;
    }

}
```

`@SoulSpringCloudClient` 注解一共有三个属性：
* `path`：映射的 HTTP 接口的请求路径。
* `desc`：接口的描述，便于知道其用途。
* `enable`：是否开启，默认为 `true` 开启。

后续，在 Spring Cloud 应用启动时，SoulSpringCloudClient 会自动[解析](https://github.com/Dromara/soul/blob/master/soul-client/soul-client-http/soul-client-springcloud/src/main/java/org/dromara/soul/client/springcloud/init/SpringCloudClientBeanPostProcessor.java) `@SoulSpringCloudClient` 注解的 API 方法，写入方法的**元数据**到 Soul Admin 控制台，最终通知到 Soul Bootstrap 服务网关上。

## 5.5 简单测试

① 执行 DemoApplication 启动 Spring Boot 应用。在 IDEA 控制台可以看到如下日志，看到写入 HTTP API 方法的**元数据**到 Soul Admin 控制台。

```Java
2020-05-23 17:00:26.711  INFO 67422 --- [pool-1-thread-1] s.SoulSpringCloudClientBeanPostProcessor : springCloud client register success :{} {"appName":"sc-user-service","path":"/sc-user-service-api/user/get","pathDesc":"获得用户详细","rpcType":"springCloud","serviceName":"UserController","methodName":"getUser","parameterTypes":"java.lang.Integer","rpcExt":"","enabled":true}
2020-05-23 17:00:27.110  INFO 67422 --- [pool-1-thread-1] s.SoulSpringCloudClientBeanPostProcessor : springCloud client register success :{} {"appName":"sc-user-service","path":"/sc-user-service-api/user/create","pathDesc":"创建用户","rpcType":"springCloud","serviceName":"UserController","methodName":"createUser","parameterTypes":"cn.iocoder.springcloud.lab60.dto.UserCreateDTO","rpcExt":"","enabled":true}
```

② 使用浏览器，访问 <http://127.0.0.1:9095/#/system/metadata> 地址，进入「系统管理 -> 元数据」菜单，可以看到上述注册的元数据。如下图所示：

![系统管理 -> 元数据](http://www.iocoder.cn/images/Soul/56.png)

③ 使用浏览器，访问 <http://127.0.0.1:9095/#/plug/divide> 地址，进入「插件列表 -> Divide」菜单，看到**选择器**和**规则**。如下图所示：

![插件列表 -> springcloud](http://www.iocoder.cn/images/Soul/57.png)

点击**选择器** `/sc-user-service-api` 的「编辑」按钮，查看该选择器的具体信息。如下图所示：

![插件列表 -> springcloud -> 选择器](http://www.iocoder.cn/images/Soul/58.png)

点击**规则** `/sc-user-service-api/user/get` 的「编辑」按钮，查看该规则的具体信息。如下图所示：

![插件列表 -> Divide -> 规则](http://www.iocoder.cn/images/Soul/59.png)

④ 使用 Postman 模拟请求 <http://127.0.0.1:9195/sc-user-service-api/user/get?id=1> 地址，转发到 `GET /user/get` 接口上。如下图所示：

![Postman 模拟](http://www.iocoder.cn/images/Soul/60.png)
* 使用 Request **Method** 为 `GET`。
* 请求参数，直接带在 URL 后面。

⑤ 使用 Postman 模拟请求 <http://127.0.0.1:9195/sb-demo-api/user/create> 地址，转发到 `POST /user/create` 接口上。如下图所示：

![Postman 模拟](http://www.iocoder.cn/images/Soul/61.png)
* 使用 Request **Method** 为 `POST`。
* 请求内容类型为 `application/json`。
* 因为 `POST /user/create` 使用 JSON 接参，所以直接在 Request **Body** 输入 JSON 数据格式。

至此，我们已经完成了 Soul 网关接入 Spring Cloud 应用，并进行相应的而测试。

> 友情提示：实际上，我们**也**可以参考[《Soul 文档 —— springcloud 插件》](https://dromara.org/zh-cn/docs/soul/plugin-springcloud.html)，**手动**在 Soul Admin 控制台配置 API 接口方法的**元数据**，以及进行 springcloud 插件的**选择器**和**规则**的设置，实现 Soul Bootstrap 服务网关转发请求到 Spring Cloud 应用，**无需**在 Spring Cloud 应用中引入 `soul-client-springcloud` 依赖。
>
> 也就是说，引入 `soul-client-springcloud` 依赖的目的，是为了实现**自动化**，毕竟**手工**配置比较麻烦，并且容易出错。

# 6. rateLimiter 插件

本小节，我们参考[《Soul 文档 —— rateLimiter 插件》](https://dromara.org/zh-cn/docs/soul/plugin-rateLimiter.html)文章，使用 **rateLimiter** 插件，实现 Soul 网关的**限流**功能。该插件是基于令牌桶算法 + Redis 存储计数，实现**分布式**限流。整体设计如下图：

![原理](http://static.iocoder.cn/645aa07113894d72b58ee85c8c4e5155.jpg)

下面，我们在[「3. 接入 Dubbo 应用」](#)小节的基础上，对 `user-api/user/get` 实现**限流**的功能。

## 6.1 安装 Redis

相信大家都会，艿艿就不瞎哔哔了。嘿嘿~

## 6.2 设置 rateLimiter 插件

先需要设置 [rateLimiter 插件](https://dromara.org/zh-cn/docs/soul/plugin-rateLimiter.html) 的 Redis 配置，目前支持单机、哨兵、集群模式。

① 使用浏览器，访问 <http://127.0.0.1:9095/#/system/plugin> 地址，进入「系统管理 -> 插件管理」菜单，可以看到 rateLimiter 插件。如下图所示：

![系统管理 -> 插件管理](http://www.iocoder.cn/images/Soul/70.png)

② 点击 rateLimiter 插件的「编辑」按钮，设置 Redis 的配置，并设置该插件为**开启**。如下图所示：

![系统管理 -> 插件管理 -> 编辑](http://www.iocoder.cn/images/Soul/71.png)

> 友情提示：Redis 的地址，记得要填写正确哈~

③ 因为 Soul Bootstrap 和 Soul Admin 暂时不支持插件修改的**自动加载**，所以我们此时需要**手动重启**下。

## 6.3 设置 rateLimiter 限流规则

① 使用浏览器，访问 <http://127.0.0.1:9095/#/plug/rate_limiter> 地址，进入「插件列表 -> rate_limiter」菜单，进行限流规则的配置。如下图所示：

![插件列表 -> rate_limiter](http://www.iocoder.cn/images/Soul/72.png)

② 点击「添加选择器」按钮，添加一个**选择器**。如下图所示：

![插件列表 -> rate_limiter -> 添加选择器](http://www.iocoder.cn/images/Soul/73.png)

③ 点击「添加规则」按钮，给该选择器添加一个**规则**。如下图所示：

![插件列表 -> rate_limiter -> 添加规则](http://www.iocoder.cn/images/Soul/74.png)

* 对请求地址 `/user-api/user/get` 进行限流，对应 UserService 的 `#getUser(Integer id)` 方法。
* **速率**：是你允许用户每秒执行多少请求，而丢弃任何请求。这是令牌桶的填充速率。
* **容量**：是允许用户在一秒钟内执行的最大请求数。这是令牌桶可以保存的令牌数。

> 友情提示：可能胖友对 Soul 定义的**选择器**与**规则**的概念有点不了解，可以看看[《Soul 文档 —— 选择器规则详解》](https://dromara.org/zh-cn/docs/soul/selector.html)文章。

## 6.4 简单测试

执行 UserServiceApplication 启动 Dubbo 服务。

**快速**且**多次**使用 Postman 模拟请求 <http://127.0.0.1:9195/user-api/user/get> 地址，调用 `UserServiceImpl#getUser(Integer id)` 方法，最终被**限流**。如下图所示：

![Postman 模拟](http://www.iocoder.cn/images/Soul/75.png)

# 7. hystrix 插件

本小节，我们参考[《Soul 文档 —— hystrix 插件》](https://dromara.org/zh-cn/docs/soul/plugin-hystrix)文章，使用 **hystrix** 插件，使用 [Hystrix](http://www.iocoder.cn/categories/Hystrix/?self) 框架，实现 Soul 网关的**熔断器**功能。

> 友情提示：对 Hystrix 不了解的胖友，可以后续阅读[《芋道 Spring Boot 服务容错 Hystrix 入门》](http://www.iocoder.cn/Spring-Boot/Hystrix/?self)文章进行学习。

下面，我们在[「3. 接入 Dubbo 应用」](#)小节的基础上，对 `user-api/user/get` 实现**熔断器**的功能。

## 7.1 设置 hystrix 插件

需要设置 [hystrix 插件](https://dromara.org/zh-cn/docs/soul/plugin-hystrix.html) 为**开启**。

使用浏览器，访问 <http://127.0.0.1:9095/#/system/plugin> 地址，进入「系统管理 -> 插件管理」菜单，可以看到 hystrix 插件。如下图所示：

![系统管理 -> 插件管理](http://www.iocoder.cn/images/Soul/80.png)

默认情况下，hystrix 插件已经是**开启**状态，所以无需开启。

## 7.2 设置 rateLimiter 限流规则

① 使用浏览器，访问 <http://127.0.0.1:9095/#/plug/hystrix> 地址，进入「插件列表 -> hystrix」菜单，进行熔断器规则的配置。如下图所示：

![插件列表 -> hystrix](http://www.iocoder.cn/images/Soul/81.png)

② 点击「添加选择器」按钮，添加一个**选择器**。如下图所示：

![插件列表 -> hystrix -> 添加选择器](http://www.iocoder.cn/images/Soul/82.png)

③ 点击「添加规则」按钮，给该选择器添加一个**规则**。如下图所示：

![插件列表 -> hystrix -> 添加规则](http://www.iocoder.cn/images/Soul/83.png)

* 对请求地址 `/user-api/user/get` 进行熔断保护，对应 UserService 的 `#getUser(Integer id)` 方法。

> 友情提示：可能胖友对 Soul 定义的**选择器**与**规则**的概念有点不了解，可以看看[《Soul 文档 —— 选择器规则详解》](https://dromara.org/zh-cn/docs/soul/selector.html)文章。

## 7.3 简单测试

**不要**执行 UserServiceApplication 启动 Dubbo 服务，模拟其**故障**。

**快速**且**多次**使用 Postman 模拟请求 <http://127.0.0.1:9195/user-api/user/get> 地址，调用 `UserServiceImpl#getUser(Integer id)` 方法，最终被**熔断**。如下图所示：

![Postman 模拟](http://www.iocoder.cn/images/Soul/84.png)

此时，我们在 Soul Bootstrap 网关的日志可以看到，Hystrix 熔断器已经打开。日志内容如下：

```Java
2020-05-23 20:52:28.786 ERROR 69264 --- [work-threads-20] o.d.s.web.plugin.hystrix.HystrixPlugin   : hystrix execute have circuitBreaker is Open! groupKey:user-service,commandKey:cn.iocoder.springboot.lab60.userservice.api.UserService
```

# 666. 彩蛋

至此，我们已经完成了 Soul 网关的学习，后续胖友可以阅读[《Soul 文档》](https://dromara.org/zh-cn/docs/soul/soul.html)，了解本文暂时并未写到的内容。

例如**插件**相关：

* [monitor 插件](https://dromara.org/zh-cn/docs/soul/plugin-monitor.html)：实现监控数据的收集，后续可以使用 [Grafana](http://www.iocoder.cn/Prometheus/install/?self) 实现监控仪表盘。
* [waf 插件](https://dromara.org/zh-cn/docs/soul/plugin-waf.html)：实现黑名单功能，禁止恶意 IP 的访问。
* [sign 插件](https://dromara.org/zh-cn/docs/soul/plugin-sign.html)：实现请求签名功能，保证接口的安全性。
* [rewrite 插件](https://dromara.org/zh-cn/docs/soul/plugin-rewrite.html)：对请求 URI 进行重写。
* [websocket 插件](https://dromara.org/zh-cn/docs/soul/plugin-websocket.html)：实现对 Websocket 进行代理转发。
* [自定义插件](https://dromara.org/zh-cn/docs/soul/dev-plugin.html)：自己实现插件，进一步拓展自己的插件。

例如**功能**相关：
* [自定义 filter](https://dromara.org/zh-cn/docs/soul/dev-filter.html)：自定义 Filter，可以拓展安全认证等等功能。
* [文件上传下载](https://dromara.org/zh-cn/docs/soul/dev-file.html)：提供的文件上传和下载功能。
    > 友情提示：建议文件上传不要经过 API 网关，而是先上传到文件服务器，然后提交 URL 到 API 网关。

* [自定义 host 与 ip](https://dromara.org/zh-cn/docs/soul/dev-iphost.html)：考虑到 API 网关的前面都有 Nginx，所以需要拓展保证解析到正确的用户 IP。
* [自定义返回结果](https://dromara.org/zh-cn/docs/soul/dev-result.html)：每个公司的统一返回格式可能有差异，最好自己拓展下。
