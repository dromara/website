---
title: SpringCloud用户指南
keywords: SpringCloud
description: Hmily-SpringCloud分布式事务用户指南
---

# SpringCloud引入依赖与配置

## 引入 hmily配置

  * 在项目的 `resource` 添加文件名为:`hmily.yml` 的配置文件
  
  * 具体的参数配置可以参考[配置详解](config.md),[本地配置模式](config-local.md), [zookeeper配置模式](config-zookeeper.md), [nacos配置模式](config-nacos.md),[apollo配置模式](config-apollo.md)

## Spring-Namespace

* 引入依赖

```xml
        <dependency>
            <groupId>org.dromara</groupId>
            <artifactId>hmily-springcloud</artifactId>
            <version>{last.version}</version>
        </dependency>
```

* 在xml中进行如下配置

```xml
    <!--配置扫码hmily框架的包-->
    <context:component-scan base-package="org.dromara.hmily.*"/>
    <!--设置开启aspectj-autoproxy-->
    <aop:aspectj-autoproxy expose-proxy="true"/>
    <!--配置Hmily启动的bean参数-->
    <bean id="hmilyApplicationContextAware" class="org.dromara.hmily.spring.HmilyApplicationContextAware"/>
``` 

## Spring-Boot-Starter

* 引入依赖

```xml
        <dependency>
            <groupId>org.dromara</groupId>
            <artifactId>hmily-spring-boot-starter-springcloud</artifactId>
            <version>{last.version}</version>
        </dependency>
```

# SpringCloud项目使用

## TCC模式

### 服务提供者

   * 只需要在参与分布式事务调用的具体实现方法上加`@HmilyTCC(confirmMethod = "confirm", cancelMethod = "cancel")`
  
   * `confirmMethod` : 注解标识方法的，确认方法名称，该方法参数列表与返回类型应与标识方法一致。
  
   * `cancelMethod` :  注解标识方法的，回滚方法名称，该方法参数列表与返回类型应与标识方法一致。

### 服务消费者

  * 在服务被调用方的`@FeignClient` 接口方法上加上 `@HmilyTCC`注解。

## TAC模式

### 服务提供者

  * 只需要在参与分布式事务调用的具体实现方法上加`@HmilyTAC`

### 服务消费者

  * 在服务被调用方的`@FeignClient` 接口方法上加上 `@HmilyTAC`注解。

## 重要注意事项

  在调用任何RPC调用之前，必须在本地一个`service`方法上，先行添加 `@HmilyTCC` 或者 `@HmilyTAC` 注解,标识开启全局事务。
  
#### 负载均衡
 
* 如果服务部署了几个节点， 负载均衡算法最好使用 `hmily`自带, 这样 `try`, `confirm`, `cancel` 调用会落在同一个节点
  充分利用了缓存，提搞了效率。在你的yaml配置如下：
  
```yaml

hmily.ribbon.rule.enabled = true

```  

#### 开启hystrix

* 如果用户配置了`feign.hystrix.enabled = true`, 默认使用线程池模式， 将会开启 `HmilyHystrixConcurrencyStrategy`
  它在hystrix使用线程池模式的时候，能够照样通过`threadLoacl` 进行RPC传参数。
  

#### 设置永不重试
    
* 需要进行分布式事务的SpringCloud微服务的调用方需要设置不重试，如下是参考：

```yaml
ribbon:
    MaxAutoRetriesNextServer : 0
    MaxAutoRetries: 0
```

#### 异常
  
  * `try`, `confirm`, `cancel` 方法的所有异常不要自行`catch` 任何异常都应该抛出给 `Hmily`框架处理。
  
