---
title: springcloud插件
keywords: springcloud
description: springcloud插件
---

* 使用Springcloud插件注意：需要在Soul-bootstrap的yml中配置上你的eureka注册中心才可以使用。

* springcloud插件，是soul支持springcloud框架的插件。Springcloud插件开启，并且当请求头的rpcType字段为springcloud的时候，会走这个插件。

* springcloud的选择器列图：
    ![](https://yu199195.github.io/images/soul/springcloud-selector.png)

   * 当插件开启时候，并且请求头的module字段值是order时候，会被匹配上。之后会去匹配规则。
   
   * 规则图：
      ![](https://yu199195.github.io/images/soul/springcloud-rule.png)

       * 上图代表当你在上一步选择器匹配之后，如果请求头中的method字段值是findById，那么该规则就会被匹配。
       
       * Hystrix ： 进行Springcloud http调用时候熔断器的参数。

       * Springcloud配置：这就是Springcoud的配置,serviceId为springcloud在注册中心的serviceId。

