---
title: monitor插件
keywords: monitor
description: monitor插件
---

## 说明

* 本篇主要讲解监控插件的使用以及流程。


## 技术方案

* 监控插件，使用influxdb来进行存储，使用前请你确保你正确的安装了influxdb。

* 采用异步的disruptor进行保存。

* 监控网关的调用请求，包括QPS,TPS,成功和失败数量等等相关信息。

## 插件设置

* 在 `soul-admin` 管理后台，插件管理-> monitor ,设置为开启。

* 在 monitor 插件的配置中，正确的配置influxdb信息。

* 如果用户不使用，则在 `soul-admin` 后台把此插件停用

## 流程图
   ![](https://yu199195.github.io/images/soul/monitor.png)
