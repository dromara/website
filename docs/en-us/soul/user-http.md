---
title: Http Customer
keywords: soul
description: Http Customer
---

## Features

* In this chapter, the aim is to help Http Customer

* soul gateway uses divide plugin handling http request that invokded under soul-admin backgroud.

* Before we start, we should be aware of running the `soul-admin`, and [Environment Setup](setup.md) is OK。

## Setting up gateway proxy plugin for Http.

* Add these dependencies in gateway's `pom.xml`：
```xml
  <!--if you use http proxy start this-->
   <dependency>
       <groupId>org.dromara</groupId>
       <artifactId>soul-spring-boot-starter-plugin-divide</artifactId>
       <version>2.2.0</version>
   </dependency>

   <dependency>
       <groupId>org.dromara</groupId>
       <artifactId>soul-spring-boot-starter-plugin-httpclient</artifactId>
       <version>2.2.0</version>
   </dependency>
```

* Of course, we need to restart the gateway.

## integrate gateway with http request（springMVC user）

* pls make sure divide plugin has opned under `soul-admin` background.

##### Soul-Client register methods。 （apply for SpringMvc,SpringBoot user）

* SpringBoot user
  
   * add these dependencies in your local maven repository `pom.xml`: 
```xml
     <dependency>
         <groupId>org.dromara</groupId>
         <artifactId>soul-spring-boot-starter-client-springmvc</artifactId>
         <version>2.2.0</version>
     </dependency>
 ```
   * Add these config value in your yaml file ：  
```yaml
   soul:
     http:
       adminUrl: http://localhost:9095
       port: the port exposed by your application server
       contextPath: /http
       appName: http
       full: false  
   # adminUrl: 'ip + port' that running on your soul-admin project, pls note that 'http://' is necessary.
   # port: your project port number
   # contextPath: the route prefix in soul gateway of your MVC project, such as /order ，/product etc，gateway will route with this.
   # appName：your application name，default value is`spring.application.name`.
   # full: set true means providing proxy service for your entire service, or only a few controller.
   ``` 
 * SpringMvc user
   * add these dependensies in your local mavne repository `pom.xml`.: 
```xml
       <dependency>
           <groupId>org.dromara</groupId>
           <artifactId>soul-client-springmvc</artifactId>
           <version>2.2.0</version>
       </dependency>
 ```     
  * Inject these properties into your Spring beans XML file:   
 ```xml
    <bean id ="springMvcClientBeanPostProcessor" ,class ="org.dromara.soul.client.springmvc.init.SpringMvcClientBeanPostProcessor">
         <constructor-arg  ref="soulSpringMvcConfig"/>
    </bean>
    
    <bean id="soulSpringMvcConfig", class="org.dromara.soul.client.springmvc.config.SoulSpringMvcConfig">
         <property name="adminUrl" value="http://localhost:9095"/>
         <property name="port" value="your port"/>
         <property name="contextPath" value="/your contextPath"/>
         <property name="appName" value="your name"/>
         <property name="full" value="false"/>
    </bean>
   ``` 
* Add this annotation `@SoulSpringMvcClient` in your `controller` interface.
  
   * you can apply the annotation to class-level in a controller.the property of 'path' is prefix and '/**' will apply proxy service for entire interfaces. 
  
   * example: （1）： `/test/payment`, `/test/findByUserId` will be handled by proxy service.
   
 ```java
  @RestController
  @RequestMapping("/test")
  @SoulSpringMvcClient(path = "/test/**")
  public class HttpTestController {
      
      @PostMapping("/payment")
      public UserDTO post(@RequestBody final UserDTO userDTO) {
          return userDTO;
      }
   
      @GetMapping("/findByUserId")
      public UserDTO findByUserId(@RequestParam("userId") final String userId) {
          UserDTO userDTO = new UserDTO();
          userDTO.setUserId(userId);
          userDTO.setUserName("hello world");
          return userDTO;
      }      
   }
   ```
   * example （2）：  `/order/save` will be handled by proxy service, but `/order/findById` won't。
   
 ```java
  @RestController
  @RequestMapping("/order")
  @SoulSpringMvcClient(path = "/order")
  public class OrderController {
  
      @PostMapping("/save")
      @SoulSpringMvcClient(path = "/save")
      public OrderDTO save(@RequestBody final OrderDTO orderDTO) {
          orderDTO.setName("hello world save order");
          return orderDTO;
      }
 
      @GetMapping("/findById")
      public OrderDTO findById(@RequestParam("id") final String id) {
          OrderDTO orderDTO = new OrderDTO();
          orderDTO.setId(id);
          orderDTO.setName("hello world findById");
          return orderDTO;
      }
  }
   ```

* Kick off your project, your interface integrate with gateway.

## integration gateway with http request（（other language，not springMvc）

* first of all, find the divide plugin in `soul-admin`, then add selctor and regulator which will compare and screen the flux.

* if you don't know how to config, pls refer to [selector regulation introduction](selector.md)。

* you can also develop your cutomized http-client，refer to [multi-language Http client development](dev-client.md)。

## User request

* Send the request as before, only two points need to notice.

* firstly，the domain name that requested before is your service, now need to replace with gateway's domain name.

* secondly，soul gateway needs a route prefix which comes from `contextPath`, it configured during the integration with gateway, you can change it freely in divide plugin of `soul-admin`, if your familiar with it.
 
```yaml

# for example, if you have a order service and it has a interface, the request url: http://localhost:8080/test/save

# Now need to change to:  http://localhost:9195/order/test/save

# We can see localhost:9195 is your gateway's ip port，default port number is 9195 ，/order is your contextPath which you configured with gateway.

# other parameters, the request method doesn't change.

# Any questions, pls join the group and we can talk about it.

```
* then you can visit, very easy and simple。
