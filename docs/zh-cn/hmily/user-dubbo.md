---
title: dubbo用户指南
keywords: dubbo
description: dubbo用户指南
---

# Dubbo接口部分

*  在你的接口项目中引入jar包。

```xml
      <dependency>
          <groupId>org.dromara</groupId>
          <artifactId>hmily-annotation</artifactId>
          <version>{last.version}</version>
      </dependency>
```

* 在需要进行Hmily分布式事务的接口方法上加上 `@HmilyTCC` 或者 `@HmilyTAC` 标识。


# Dubbo实现项目引入依赖jar包与配置

## Spring-Namespace

* Alibaba-Dubbo 用户引入

```xml
        <dependency>
            <groupId>org.dromara</groupId>
            <artifactId>hmily-dubbo</artifactId>
           <version>{last.version}</version>
        </dependency>
```

* Aapche-Dubbo 用户引入

```xml
        <dependency>
            <groupId>org.dromara</groupId>
            <artifactId>hmily-apache-dubbo</artifactId>
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
    <bean id="hmilyApplicationContextAware" class="org.dromara.hmily.spring.HmilyApplicationContextAware">
        <property name="appName" value="inventory"/>
        <property name="serializer" value="kryo"/>
        <property name="recoverDelayTime" value="60"/>
        <property name="retryMax" value="3"/>
        <property name="scheduledRecoveryDelay" value="60"/>
        <property name="scheduledThreadMax" value="4"/>
        <property name="repository" value="mysql"/>
        <property name="hmilyDbConfig">
            <bean class="org.dromara.hmily.config.HmilyDbConfig">
                <property name="url"
                          value="jdbc:mysql://127.0.0.1:3306/hmily?useUnicode=true&amp;characterEncoding=utf8"/>
                <property name="driverClassName" value="com.mysql.jdbc.Driver"/>
                <property name="username" value="root"/>
                <property name="password" value=""/>
            </bean>
        </property>
    </bean>
```

* 具体的参数配置可以参考[配置详解](config.md)

## Spring-Boot

* Alibaba-Dubbo 用户引入

```xml
        <dependency>
            <groupId>org.dromara</groupId>
            <artifactId>hmily-spring-boot-starter-dubbo</artifactId>
           <version>{last.version}</version>
        </dependency>
```

* Aapche-Dubbo 用户引入

```xml
        <dependency>
            <groupId>org.dromara</groupId>
            <artifactId>hmily-spring-boot-starter-apache-dubbo</artifactId>
           <version>{last.version}</version>
        </dependency>
```

* 在你的yml中配置

```yaml
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

* 具体的参数配置可以参考[配置详解](config.md)

# Dubbo实现项目使用

在上述中，我们已经完成了集成，与配置，现在我们来详解说一下如何进行使用。

### TCC模式

 * 在添加`@HmilyTCC` 标识 接口方法的实现上 加上` @HmilyTCC(confirmMethod = "confirm", cancelMethod = "cancel")`

 * `confirmMethod` : 注解标识方法的，确认方法名称，该方法参数列表与返回类型应与标识方法一致。

 * `cancelMethod` :  注解标识方法的，回滚方法名称，该方法参数列表与返回类型应与标识方法一致。
 
TCC模式应该保证 `confirm` 和 `cancel` 方法的幂等性，用户需要自行去开发这个2个方法，所有的事务的确认与回滚，完全由用户决定。Hmily框架只是负责来进行调用
 
### TAC模式 

  *  在添加`@HmilyTCC` 标识 接口方法的实现上 加上` @HmilyTAC`
  
## 重要注意事项

  在调用任何RPC调用之前，必须在本地一个`service`方法上，先行添加 `@HmilyTCC` 或者 `@HmilyTAC` 注解,标识开启全局事务。

#### 负载均衡

  * 如果服务部署了几个节点， 负载均衡算法最好使用 `hmily`, 这样 `try`, `confirm`, `cancel` 调用会落在同一个节点
    充分利用了缓存，提搞了效率。
    
```xml
   <dubbo:reference  interface="xxx"  id="xxx" loadbalance="hmily"/>           
```      
    
#### 设置永不重试
    
  * 需要进行分布式事务的dubbo接口，调用放要设置为永远不重试(retries="0")

```xml
   <dubbo:reference  interface="xxx"  id="xxx" retries="0"/>           
```  

#### 异常
  
  * `try`, `confirm`, `cancel` 方法的所有异常不要自行`catch` 任何异常都应该抛出给 `Hmily`框架处理。