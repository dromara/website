---
title: divide插件
keywords: divide
description: divide插件
---

## 说明

* 本篇是主要介绍divide插件的相关操作


## 插件设置

* 开启插件, 插件管理--> divide 设置为启用.


## 插件讲解

* divide插件是进行http正向代理的插件，所有http类型的请求，都是由该插件进行负载均衡的调用。

* 当然也包括调用过程中的熔断，超时等等。

* 插件选择器
 ![](https://yu199195.github.io/images/soul/divide-selector.png)
 
  * 这里是and的匹配模式，根据uri上有 /http前缀进行匹配。
  
  * 然后就会使用http配置中的ip+端口进行负载均衡调用。

* 插件规则
![](https://yu199195.github.io/images/soul/divide-rule.png)

  * 一个选择器对应多个规则， 就是一个 /http 前缀的请求，是不是还有很多个？

  * 上图代表当你在上一步选择器匹配之后，如果uri为 /http/test/findByUserId  就会被匹配.
       
       * Hystrix ： 当代理插件进行调用熔断器的参数。

       * Http负载：会根据负载策略选出一个服务，进行调用。里面的的超时，重试不填写，soul会设置默认的。多个服务的时候，需要填写权重。当多个url服务的时候，请选择负载方式，soul会进行相应的负载调用。