---
title: divide插件
keywords: divide
description: divide插件
---



* divide插件定位是一个http代理插件，当请求头的rpcType为http的时候,并且插件开启的时候，它根据请求参数匹配到规则，然后进行响应式的代理调用。

* divide的选择器列图：
    ![](https://yu199195.github.io/images/soul/divide-selector.png)

   * 当插件开启时候，并且请求头的module字段值是order时候，会被匹配上。之后会去匹配规则。
   
   * 规则图：
            ![](https://yu199195.github.io/images/soul/divide-rule.png)

       * 上图代表当你在上一步选择器匹配之后，如果请求头中的method字段值是findById，那么该规则就会被匹配。
       
       * Hystrix ： 当代理插件进行调用熔断器的参数。

       * Http负载：会根据负载策略选出一个服务，进行调用。里面的的超时，重试不填写，soul会设置默认的。多个服务的时候，需要填写权重。当多个url服务的时候，请选择负载方式，soul会进行相应的负载调用。

       * http服务检测：soul会检测服务的状态，如果服务down机，会把相应的url剔除掉。