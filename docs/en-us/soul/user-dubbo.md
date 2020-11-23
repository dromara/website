---
title: integrate dubbo with soul gateway
keywords: soul
description:integrate dubbo with soul gateway
---


## Features

* This chapter is a guide about integrating dubbo service with soul gateway.

* Support alibaba dubbo（< 2.7.x）and apache dubbo (>=2.7.x)。

* Pls start `soul-admin` correctly beofore integrating , and [Environement Setup](setup.md) is Ok。


## add gateway's plugin that suppots dubbo


* include these dependensies in gateway's `pom.xml`：

  * alibaba dubbo customer, replace the dubbo's version with yours as below，either with jar file of registration center.
  
 ```xml
  
          <!--soul alibaba dubbo plugin start-->
          <dependency>
              <groupId>org.dromara</groupId>
              <artifactId>soul-spring-boot-starter-plugin-alibaba-dubbo</artifactId>
              <version>2.2.0</version>
          </dependency>
           <!-- soul  alibaba dubbo plugin end-->
          <dependency>
              <groupId>com.alibaba</groupId>
              <artifactId>dubbo</artifactId>
              <version>2.6.5</version>
          </dependency>
          <dependency>
              <groupId>org.apache.curator</groupId>
              <artifactId>curator-client</artifactId>
              <version>4.0.1</version>
          </dependency>
          <dependency>
              <groupId>org.apache.curator</groupId>
              <artifactId>curator-framework</artifactId>
              <version>4.0.1</version>
          </dependency>
          <dependency>
              <groupId>org.apache.curator</groupId>
              <artifactId>curator-recipes</artifactId>
              <version>4.0.1</version>
          </dependency>
       
  ```
  
  * apache dubbo cutomer，replace the dubbo's version with yours as below, either with the registry center which dependency based on.
  
  ```xml
  
           <!--soul apache dubbo plugin start-->
           <dependency>
               <groupId>org.dromara</groupId>
               <artifactId>soul-spring-boot-starter-plugin-apache-dubbo</artifactId>
               <version>2.2.0</version>
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
  
           <!-- Dubbo zookeeper registry dependency start-->
           <dependency>
               <groupId>org.apache.curator</groupId>
               <artifactId>curator-client</artifactId>
               <version>4.0.1</version>
           </dependency>
           <dependency>
               <groupId>org.apache.curator</groupId>
               <artifactId>curator-framework</artifactId>
               <version>4.0.1</version>
           </dependency>
           <dependency>
               <groupId>org.apache.curator</groupId>
               <artifactId>curator-recipes</artifactId>
               <version>4.0.1</version>
           </dependency>
           <!-- Dubbo zookeeper registry dependency end -->
  ```

* restart gateway service.

## dubbo's integration with gateway,pls refer to : [soul-test-dubbo](https://github.com/Dromara/soul/tree/master/soul-test/soul-test-dubbo)

 * alibaba dubbo customer
   
    * springboot
      
       * add these dependencies
 ```xml
        <dependency>
             <groupId>org.dromara</groupId>
             <artifactId>soul-spring-boot-starter-client-alibaba-dubbo</artifactId>
             <version>2.2.0</version>
        </dependency>
 ```
      
  * also add these config values in your yaml file ：
  
   ```yaml
      soul:
        dubbo:
          adminUrl: http://localhost:9095
          contextPath: /dubbo
          appName: dubbo    
         # adminUrl: 'ip + port' that running on your soul-admin project, pls note that 'http://' is necessary.
         # contextPath: the route prefix in soul gateway of your project, such as /order ，/product etc，gateway will route with this.
         # appName：your application name, default value is the application name in dubbo config.
  ```    
    
* spring
     
   * Add these dependencies：
 ```xml
       <dependency>
           <groupId>org.dromara</groupId>
           <artifactId>soul-client-alibaba-dubbo</artifactId>
           <version>2.2.0</version>
        </dependency>
   ```
   * Inject these properties into your Sping beans XML file：      
  ```xml
          <bean id ="alibabaDubboServiceBeanPostProcessor" ,class ="org.dromara.soul.client.alibaba.dubbo.AlibabaDubboServiceBeanPostProcessor">
               <constructor-arg  ref="dubboConfig"/>
          </bean>
          
          <bean id="dubboConfig", class="org.dromara.soul.client.dubbo.common.config.DubboConfig">
               <property name="adminUrl" value="http://localhost:9095"/>     
               <property name="contextPath" value="/你的contextPath"/>
               <property name="appName" value="你的名字"/>
          </bean>
   ``` 
   
* apache dubbo customer
   
  * springboot
      
     * add these dependencies:
       
 ```xml
        <dependency>
             <groupId>org.dromara</groupId>
             <artifactId>soul-spring-boot-starter-client-apache-dubbo</artifactId>
             <version>2.2.0</version>
        </dependency>
   ```
      
 * Add these config values in your yaml file ：
     
  ```yaml
      soul:
        dubbo:
          adminUrl: http://localhost:9095
          contextPath: /dubbo
          appName: dubbo
     
         # adminUrl: ip + port of your soul-admin project, pls note that 'http://' is necessary.
         # contextPath: the route prefix in soul gateway of your project, such as /order ，/product etc，gateway will route with this.
         # appName：your application name, default value is the application name in dubbo config. 
  ```
   
   * spring
      
     * add these dependencies ：
       
     ```xml
       <dependency>
           <groupId>org.dromara</groupId>
           <artifactId>soul-client-apache-dubbo</artifactId>
           <version>2.2.0</version>
        </dependency>
       ```

* Injecct these properties into your Spring beans XML file ：
       
 ```xml
          <bean id ="apacheDubboServiceBeanPostProcessor" ,class ="org.dromara.soul.client.apache.dubbo.ApacheDubboServiceBeanPostProcessor">
               <constructor-arg  ref="dubboConfig"/>
          </bean>
          
          <bean id="dubboConfig", class="org.dromara.soul.client.dubbo.common.config.DubboConfig">
               <property name="adminUrl" value="http://localhost:9095"/>     
               <property name="contextPath" value="/your contextPath"/>
               <property name="appName" value="your application name"/>
          </bean>
   ``` 

## Define dubbo configuration

* firstly enable `dubbo` option in `soul-admin` plugin management.

* then configure your registry address in `dubbo ` plugin management.

```yaml
{"register":"zookeeper://localhost:2181"}   or {"register":"nacos://localhost:8848"}

```

## Register the interface to gateway

* you can apply the annotation `@SoulDubboClient` to your Dubbo service implementation class, so that this interface method will register to gateway.

* start your provider and output the log `dubbo client register success `，your dubbo interface has been published to soul gateway. Any questions,pls refer to `soul-test-dubbo`
  project.

## dubbo user requirement and parameter explanation.

* communicate with dubbo service through Http transport protocol.

* soul gateway need a route prefix which configured when accessing the project.
 
```yaml
# for example: you have a order service and it has a interface, his registry address: /order/test/save

# now we can communicate with gateway through POST request http://localhost:9195/order/test/save

# localhost:9195 is gateway's ip port，default port is 9195 ，/order is the contextPath when your dubbo integarte with gateway.

```

* parameter deliver：
   
   * communicate with gateway through body or json in http post request.
   
   * more parameter types, pls refer to the interface defination in  [soul-test-dubbo](https://github.com/Dromara/soul/tree/master/soul-test/soul-test-dubbo) and parameter passing m     ethod.

* Single java bean parameter type （default）

* Multi-parameter type support, add this config value in gateway's yaml file:

```yaml
soul :
    dubbo :
      parameter: multi
```

* Support for customize multi-parameter type

  * create a new class A in yur gateway project, implement `org.dromara.soul.web.dubbo.DubboParamResolveService`.
  
 ```java
   public interface DubboParamResolveService {
   
       /**
        * Build parameter pair.
        * this is Resolve http body to get dubbo param.
        *
        * @param body           the body
        * @param parameterTypes the parameter types
        * @return the pair
        */
       Pair<String[], Object[]> buildParameter(String body, String parameterTypes);
   }
  ```
  
  * `body` is the json string in http request body..
  
  *  `parameterTypes`: the list of method parameter types that are matched，split with `,`.
  
  *  in Pair，left is parmeter type，right is parameter value, it's the standard of dubbo generalization calls.
  
  *  inject your class into Spring bean, cover the default implement.
  
 ```java
  @Bean
  public DubboParamResolveService A() {
          return new A();
  }
  ```
  
## Let's break down this process: http --> gateway --> dubbo provider

* it basically switches from HTTP request to Dubbo protocol，then invoke Dubbo service and return to the result.

* there are two things after intgerating your dubbo service with gateway, one is the added annoation `@SoulDubboClient`, another is a path used to speicify the request path.

* also, you added a config value in `contextPath`?

* if you still remember, then we can start.。

* as if you have a function like this, the config value in contextPath is `/dubbo`

```java
    @Override
    @@SoulDubboClient(path = "/insert", desc = "插入一条数据")
    public DubboTest insert(final DubboTest dubboTest) {
        return dubboTest;
    }

```

* so our request path is: http://localhost:9195/dubbo/insert , btw localhost:9195 is the gateway's domain name,if you changed before, now so does same thing here.

* how about the request parameter？ `DubboTest` is a javabean object，has 2 parameters，id and name ，so we can transfer the value's json type through request body.

```
{"id":"1234","name":"XIAO5y"}

```

* if your interface has no parameter, then the value in body is:

```
{}

```

* if your interface has multi-parameter, you can find the introduction above.
