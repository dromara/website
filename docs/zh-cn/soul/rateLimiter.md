---
title: rateLimiter插件
keywords: rateLimiter
description: rateLimiter插件
---


* 采用redis令牌桶算法进行限流。

* 可以针对到接口级别的限流。

* 根据请求参数，选择器进行匹配，再匹配到具体的规则，根据规则进行接口级别的限流。

* 流程图：
  ![](https://yu199195.github.io/images/soul/limiting.png)

* 规则图：
  ![](https://yu199195.github.io/images/soul/admin-limiter.png)

  * 上图代表当你请求头中method字段值是findById的时候处理速率为1，总容量为100，来进行限流。

* 用户如果使用，需要在启动的配置文件中，设置redis相关信息，在admin后台把插件开启。

* 如果用户无需使用，在admin后台把插件禁用。