---
title: 前置过滤器设计
keywords: preFiter
description: 前置过滤器设计
---

* ParamWebFilter:是用来检测访问网关的参数的正确性。用户访问网关则必须按照Soul网关对参数的要求。
* TimeWebFilter：
 过滤器用来检验访问时效性。默认会过滤10分钟以外的请求，用户可以进行自由设置。只需要注入soul.timeVerify.timeDelay的值即可。
 如果用户不想使用，则可以设置soul.timeVerify.enabled=false将其停用。
 