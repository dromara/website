---
title: motan用户指南
keywords: motan
description:  motan用户指南
---


# jar包依赖

*  在你的接口项目中引入jar包。
```java
      <dependency>
          <groupId>org.dromara.hmily</groupId>
          <artifactId>hmily-annotation</artifactId>
         <version>2.0.0-RELEASE</version>
      </dependency>
```
* 在你的motan rpc接口上加入 @Hmily注解


* 在你的实现项目中引入jar包，并在实现接口上添加:@Hmily(confirmMethod = "confrim", cancelMethod = "cancel")confirmMethod，cancelMethod对应为的方法名称

```xml
        <dependency>
            <groupId>org.dromara.hmily</groupId>
            <artifactId>hmily-motan</artifactId>
              <version>2.0.0-RELEASE</version>
        </dependency>
```

* 注意 confrim 与cancel 方法的参数列表与你的接口保持一致。

* confrim 方法为你try 方法的确认方法,由用户自己开发。

* cancel方法是try 方法的回滚方法,由用户自己开发。


# Spring XML 配置 HmilyTransactionBootstrap

```xml
  <!-- Aspect 切面配置，是否开启AOP切面-->
  <aop:aspectj-autoproxy expose-proxy="true"/>
  <!--扫描框架的包-->
  <context:component-scan base-package="org.dromara.hmily.*"/>
  <!--启动类属性配置-->
  <bean id="hmilyTransactionBootstrap" class="org.dromara.hmily.core.bootstrap.HmilyTransactionBootstrap">
        <property name="serializer" value="kryo"/>
        <property name="recoverDelayTime" value="120"/>
        <property name="retryMax" value="3"/>
        <property name="loadFactor" value="2"/>
        <property name="scheduledDelay" value="120"/>
        <property name="scheduledThreadMax" value="4"/>
        <property name="bufferSize" value="4096"/>
        <property name="consumerThreads" value="32"/>
        <property name="started" value="false"/>
        <property name="asyncThreads" value="32"/>
        <property name="repositorySupport" value="db"/>
        <property name="hmilyDbConfig">
            <bean class="org.dromara.hmily.common.config.HmilyDbConfig">
                <property name="url"
                          value="jdbc:mysql://192.168.1.98:3306/tcc?useUnicode=true&amp;characterEncoding=utf8"/>
                <property name="driverClassName" value="com.mysql.jdbc.Driver"/>
                <property name="username" value="root"/>
                <property name="password" value="123456"/>
            </bean>
        </property>
    </bean>
  ```  
* 配置开启AOP切面。

* 扫描Hmily框架的包。

* 配置Hmiiy框架参数。
     
# Spring boot start 配置 HmilyTransactionBootstrap

* 在你的实现项目中引入Springboot-start支持的包，并在实现接口上添加:
```xml
        <dependency>
            <groupId>org.dromara</groupId>
            <artifactId>hmily-spring-boot-starter-motan</artifactId>
              <version>2.0.0-RELEASE</version>
        </dependency>
```

* 在你的yml中配置

```yml
org:
    dromara:
         hmily :
            serializer : kryo
            recoverDelayTime : 128
            retryMax : 30
            scheduledDelay : 128
            scheduledThreadMax :  10
            repositorySupport : db
            started: false
            hmilyDbConfig :
                 driverClassName  : com.mysql.jdbc.Driver
                 url :  jdbc:mysql://192.168.1.98:3306/tcc?useUnicode=true&amp;characterEncoding=utf8
                 username : root
                 password : 123456

```
* 具体的详解请看[配置详解](configuration.md)