---
title: dubbo插件
keywords: dubbo
description: dubbo插件
---


## 说明

* 本篇讲解dubbo的插件的使用。

* dubbo插件是http协议转换成dubbo协议的插件。

* dubbo插件是用来具体调用dubbo服务的。

## 插件设置

* 在 `soul-admin` 管理后台中，插件管理->dubbo 设置为开启。

* 在dubbo插件的配置中，配置如下: 配置dubbo的注册中心。
```
{"register":"zookeeper://localhost:2181"}
```


## 插件讲解

* dubbo的选择器列图：
![](https://yu199195.github.io/images/soul/dubbo-selector.png)

  * 就是根据http请求的路径前缀来匹配。
  
  * dubbo处理，在2.1.0版本废弃，用户可以随意填写。

   
* 规则图：
![](https://yu199195.github.io/images/soul/dubbo-rule.png)

   * Hystrix ： 进行dubbo泛化调用时候熔断器的参数。

   * dubbo配置： 在2.1.0版本废弃，用户可以随意填写。

