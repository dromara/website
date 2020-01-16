---
title: springcloud插件
keywords: springcloud
description: springcloud插件
---


## 说明

* 本篇主要讲解如何使用springcloud插件以及注意事项


## 插件设置

* 在 `soul-admin` 管理后台，插件管理-> springCloud ,设置为开启。


## 使用


* 选择器：
    ![](https://yu199195.github.io/images/soul/springcloud-selector.png)

* 应用名称：就是你根据条件匹配以后，需要调用的你的具体的应用名称。

* soul会从eureka上面根据应用名称获取对应的服务，发起http代理调用
   
* 规则图：

 ![](https://yu199195.github.io/images/soul/springcloud-rule.png)    

* Springcloud配置：废弃。

