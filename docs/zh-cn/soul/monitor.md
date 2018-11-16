---
title: monitor插件
keywords: monitor
description: monitor插件
---


* 用在监控网关的调用请求，包括QPS,TPS,成功和失败数量等等相关信息。

* 流程图：
 ![](https://yu199195.github.io/images/soul/monitor.png)

* 如果用户需要使用的时候，需要在启动参数里面配置influxDb的连接信息，admin后台把此插件启用。

* 如果用户不使用，则在admin后台把此插件停用