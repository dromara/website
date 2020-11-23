---
title: springCloud with soul gateway
keywords: soul
description: springCloud with soul gateway
---

## Features

* this article is a guide about how to integrate Spring Cloud with soul gateway quickly.

* pls enable `springCloud` plug-in under soul-admin background.

* Pls start `soul-admin` correctly beofore integrating , and [Environement Setup](setup.md) is Ok。

## add gateway's plugin that supports Spring Cloud

* include these dependencies in gateway's plm.xml.

```xml
  <!--soul springCloud plugin start-->
  <dependency>
       <groupId>org.dromara</groupId>
       <artifactId>soul-spring-boot-starter-plugin-springcloud</artifactId>
       <version>2.2.0</version>
  </dependency>
   <!--soul springCloud plugin end-->

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

* If you use `eureka` as SpringCloud registry center.

  * add these dependencies:：
  
 ```xml
   <dependency>
        <groupId>org.springframework.cloud</groupId>
        <artifactId>spring-cloud-starter-netflix-eureka-client</artifactId>
        <version>2.2.0.RELEASE</version>
   </dependency>
   ```
  
   * add these config values in gateway's yaml file:
   
 ```yaml
    eureka:
      client:
        serviceUrl:
          defaultZone: http://localhost:8761/eureka/ #your eureka address
      instance:
        prefer-ip-address: true
   ```

* if you use `nacos` as Spring Cloud registry center.

  * add these dependencies:：
  
 ```xml
  <dependency>
        <groupId>com.alibaba.cloud</groupId>
        <artifactId>spring-cloud-starter-alibaba-nacos-discovery</artifactId>
        <version>2.1.0.RELEASE</version>
  </dependency>
   ```
  
   * add these config values in gateway's yaml file:
   
 ```yaml
   spring:
      cloud:
        nacos:
          discovery:
             server-addr: 127.0.0.1:8848 # your nacos address
   ```

* restart your gateway service.

## SpringCloud service integrate with gateway.。

* add these dependencies in the project which you provide the service.：

```xml
 <dependency>
      <groupId>org.dromara</groupId>
      <artifactId>soul-spring-boot-starter-client-springcloud</artifactId>
      <version>2.2.0</version>
 </dependency>
```

* add these config values in your yaml file::

```yaml
soul:
  springcloud:
    admin-url: http://localhost:9095
    context-path: /springcloud
    appName: http
# adminUrl: 'ip + port' that running on your soul-admin project, pls note that 'http://' is necessary.
# contextPath: the route prefix in soul gateway of your project, such as /order ，/product etc，gateway will route with this.
# appName：your application name, default value is `spring.application.name`
```


* add the annotation `@SoulSpringCloudClient` in your `controller` interface.

 * you can apply the annotation to class-level in a controller.the property of 'path' is prefix and '/**' will apply proxy service for entire interfaces.
  
   * example （1）：both `/test/payment` and `/test/findByUserId` will be handled by gateway.
   
 ```java
  @RestController
  @RequestMapping("/test")
  @SoulSpringCloudClient(path = "/test/**")
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
  
   * example （2）：`/order/save` will be handled by gateway, and `/order/findById` won't.
  
 ```java
  @RestController
  @RequestMapping("/order")
  @SoulSpringCloudClient(path = "/order")
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

  
* start your service, if output this log info `http client register success`, then your interface has registered to gateway.  
  
## plugin setting

* enable Spring Cloud plugin in `soul-admin` plugin management.

## user request

* literally it doesn't change much, only two points need to notice.

* firstly，the domain name you requested before is your service, now relpace with the gateway's domain name.

* secondly，soul gateway needs a route prefix which comes from `contextPath`, it configured during integartion with gateway, you can change it freely in divide plugin of `soul-admin`, if your familiar with it.
 
```yaml

# for example, your have a order service and it has a interface, the request url: http://localhost:8080/test/save

# now need to change to：http://localhost:9195/order/test/save

# we can see localhost:9195 is the gateway's ip port, default port number is 9195 ，/order is the contextPath in your config yaml file. 

# the request of other parameters don't change.。

# Any questions, pls join the group and we can talk about it.

```
* then you can visit, very easy and simple。
