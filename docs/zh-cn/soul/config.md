---
title: 配置中心介绍
keywords: config
description: 配置中心介绍
---


* Soul的插件全都是热插拔的，热插拔是什么意思呢？在后台你可以把插件停用启用。

* 所有插件的选择器，规则都是动态配置，立即生效，不需要重启服务。

* 配置中心数据结构图：
 ![](https://yu199195.github.io/images/soul/soul-zookeeper.png)

* 下面是数据流程图：
 ![](https://yu199195.github.io/images/soul/plugin-data.png)

* 当soul启动的时候，会从Zookeeper拉取所有插件的数据，包括选择器，规则等等。然后写到本地缓存（Map来存储），并且监听所有的
节点，当节点有数据变更的时候，会通过zookeeper的订阅模式获取，进行本地缓存的更新。

* 这么设计的作用：
  * 所有的配置都可以动态的更新，任何修改不需要重启服务。
  * 使用了本地缓存，在高并发的时候，提供高效的性能。