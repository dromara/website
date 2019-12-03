---
title: rateLimiter插件
keywords: rateLimiter
description: rateLimiter插件
---

## 说明

* 本文只有讲解soul的限流实现


## 技术方案

* 采用redis令牌桶算法进行限流。

* 可以针对到接口级别的限流。

* 流程图：
  ![](https://yu199195.github.io/images/soul/limiting.png)
  
## 插件设置

* 在 `soul-admin` 管理后台中，插件管理，找到 `rate_limiter` 将其设置为开启

* 在插件中，对redis进行配置。

* 目前支持redis的单机，哨兵，以及集群模式。

* 如果是哨兵，集群等多节点的，在URL中的配置，请对每个实列使用 `;` 分割. 如 192.168.1.1:6379;192.168.1.2:6379。

* 如果用户无需使用，在admin后台把插件禁用。 
 

## 如何使用

* 根据请求参数，选择器进行匹配，再匹配到具体的规则，根据规则进行接口级别的限流。

* 规则图：
  ![](https://yu199195.github.io/images/soul/admin-limiter.png)

* 上图代表当你请求头中method字段值是findById的时候处理速率为1，总容量为100，来进行限流。
  
* 速率：是你允许用户每秒执行多少请求，而丢弃任何请求。这是令牌桶的填充速率。
  
* 容量 ：是允许用户在一秒钟内执行的最大请求数。这是令牌桶可以保存的令牌数。
  
