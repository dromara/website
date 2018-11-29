---
title: Hmily配置详解
keywords: configuration
description:  Hmily配置详解
---



### @Hmily annotation详解

*  @Hmily  该注解为分布式事务的切面（AOP point），标识在你的rpc接口上。

*  注解中confirmMethod="xxx" 在Hmily分布式事务中confirm角色的方法名称。

*  注解中cancelMethod="xxx" 为在Hmily分布式事务中cancel角色的方法名称。

*  注解中PatternEnum 在Hmily分布式事务中的模式，现在有tcc，和cc2种。

####  特别注意：try, confirm,cancel 3个方法的参数类型必须一致。

#### cc模式含义为confrim，cancel，即在try中没有任何数据的操作，只有对数据的校验，在try阶段发生异常，不会进行cancel方法的调用。

###  使用配置：
* 在接口上添加@Hmily注解（dubbo则需要填加在api接口上，springcloud则需要加在feignClient上），具体可参考demo工程。

* 在接口实现上 添加@Hmily(confirmMethod = "方法名称", cancelMethod = "方法名称"),并提供confrim，cancel方法名称，具体可参考demo工程


###  HmilyTransactionBootstrap 详解：
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
        <property name="started" value="true"/>
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
* serializer :这里我推荐使用是kroy。当然hmily也支持hessian,protostuff,jdk。在我们测试中表现为: 
               kroy>hessian>protostuff>jdk

* recoverDelayTime :定时任务延迟时间（单位是秒，默认120。这个参数只是要大于你的rpc调用的超时时间设置。

* retryMax : 最大重复次数，默认3次。当你的服务down机，定时任务会执行retryMax次数去执行你的cancel还是confrim。

* bufferSize: disruptor的bufferSize,当高并发的时候，可以调大。注意是 2n次方

* consumerThreads distuptor消费线程数量,高并发的时候，可以调大。

* started: 注意在是发起方的时候，把此属性设置为true。参与方为false。

* asyncThreads 异步执行confirm和cancel线程池线程的大小，高并发的时候请调大

* 接下来是最重要的事务日志的存储 在我们的压测中，推荐使用mongo。表现为 mongodb>redis集群>mysql>zookeeper

* 如果你采用mongodb存储日志,配置如下(url可以配置成mongdb集群的url)
```xml
       <property name="repositorySupport" value="mongodb"/>
        <property name="hmilyMongoConfig">
            <bean class="org.dromara.hmily.common.config.HmilyMongoConfig">
                <property name="mongoDbUrl"  value="192.168.1.68:27017"/>
                <property name="mongoDbName" value="happylife"/>
                <property name="mongoUserName" value="xiaoyu"/>
                <property name="mongoUserPwd" value="123456"/>
            </bean>
        </property>
 ```    

* 如果你采用redis存储日志,配置如下：

  * redis单节点
    
```xml
   <property name="repositorySupport" value="redis" />
    <property name="hmilyRedisConfig">
        <bean class="org.dromara.hmily.common.config.HmilyRedisConfig">
            <property name="hostName"
                      value="192.168.1.68"/>
            <property name="port" value="6379"/>
            <property name="password" value=""/>
        </bean>
    </property>
```

* redis哨兵模式集群:

   ```xml
   <property name="repositorySupport" value="redis"/>
    <property name="hmilyRedisConfig">
        <bean class="org.dromara.hmily.common.config.HmilyRedisConfig">
            <property name="masterName" value="aaa"/>
            <property name="sentinel" value="true"/>
            <property name="sentinelUrl" value="192.168.1.91:26379;192.168.1.92:26379;192.168.1.93:26379"/>
            <property name="password" value="123456"/>
        </bean>
    </property>
    ```
* redis集群:

   ```xml
   <property name="repositorySupport" value="redis"/>
    <property name="hmilyRedisConfig">
        <bean class="org.dromara.hmily.common.config.HmilyRedisConfig">
            <property name="cluster" value="true"/>
            <property name="clusterUrl" value="192.168.1.91:26379;192.168.1.92:26379;192.168.1.93:26379"/>
            <property name="password" value="123456"/>
        </bean>
    </property>
    ```

* 如果你采用zookeeper存储日志,配置如下：

 ```xml
        <property name="repositorySupport" value="zookeeper"/>
        <property name="hmilyZookeeperConfig">
            <bean class="org.dromara.hmily.common.config.HmilyZookeeperConfig">
                <property name="host"  value="192.168.1.73:2181"/>
                <property name="sessionTimeOut" value="100000"/>
                <property name="rootPath" value="/tcc"/>
            </bean>
        </property>
``` 
