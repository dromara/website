---
title: 设置数据同步策略
keywords: soul
description: 设置数据同步策略
---



## 说明

* 本文是说明,如何设置不同的数据同步策略。

* 不同数据同步策略，需要注意什么问题。



##  zookeeper方式同步

### 配置 soul-admin

* 在 `soul-admin` 中的yml文件中做如下更改 （配置zookeeper）。

```
soul:
   sync:
     strategy: zookeeper
     zookeeper:
      url: localhost:2181   # 配置你的zk地址，多个zk节点，逗号隔开
      sessionTimeout: 5000  # 配置sessionTimeout
      connectionTimeout: 2000 # connectionTimeout
```

* 或者通过spring的方式： `--soul.sync.strategy=zookeeper  --soul.sync.zookeeper.url=你的地址   --soul.sync.zookeeper.sessionTimeout=5000  --soul.sync.zookeeper.connectionTimeout=2000`

* 重启或者启动  `soul-admin`。

### 配置 soul-bootstrap

* 在 `soul-bootstrap` 中的yml文件中做如下更改 （配置zookeeper）。

```
soul:
   sync:
     strategy: zookeeper
     zookeeper:
      url: localhost:2181   # 配置你的zk地址
      sessionTimeout: 5000  # 配置sessionTimeout
      connectionTimeout: 2000 # connectionTimeout
```

* 或者通过spring的方式： `--soul.sync.strategy=zookeeper  --soul.sync.zookeeper.url=你的地址   --soul.sync.zookeeper.sessionTimeout=5000  --soul.sync.zookeeper.connectionTimeout=2000`


* 重启或者启动  `soul-bootstrap`。

### zookeeper方式总结

* 我们知道zookeeper是AP模式，在极端情况下会造成数据不一致，这时候，如果重启恢复好，可以在 `soul-admin` 后台进行全量同步一次。

* 依赖zookeeper ，用户必须要有。

* 时效性比较好，用户可以根据自身来进行选择。

## http长轮询

### 配置 soul-admin

* 在 `soul-admin` 中的yml文件中做如下更改,设置同步策略.

```
soul:
   sync:
     strategy: http
```

* 或者通过spring的方式： `--soul.sync.strategy=http `

* 重启或者启动  `soul-admin`。

### 配置 soul-bootstrap

* 在 `soul-bootstrap` 中的yml文件中做如下更改 （配置zookeeper）。

```
soul :
    sync:
        strategy: http
        http:
             url : http://localhost:9095  #配置 soul-admin的 ip与端口，或者域名
```

* 或者通过spring的方式： `--soul.sync.http=zookeeper  --soul.sync.http.url= soul-admin的ip端口`


* 重启或者启动  `soul-bootstrap`。

###  http长轮询总结

* http长轮询使得网关很轻量，时效性略低。 

* 其根据分组key来拉取，如果数据量过大，过多，会有一定的影响。 什么意思呢？就是一个组下面的一个小地方更改，会拉取整个的组数据。


## websocket方式 （默认方式，推荐）

### 配置 soul-admin

* 在 `soul-admin` 中的yml文件中做如下更改,设置同步策略.

```
soul:
   sync:
     strategy: websocket
```

* 或者通过spring的方式： `--soul.sync.strategy=websocket `

* 重启或者启动  `soul-admin`。

### 配置 soul-bootstrap

* 在 `soul-bootstrap` 中的yml文件中做如下更改 （配置zookeeper）。

```
soul :
    sync:
        strategy: websocket
        websocket:
             url : ws://localhost:9095/websocket #配置 soul-admin的 ip与端口，或者域名
```

* 或者通过spring的方式： `--soul.sync.strategy=websocket  --soul.sync.websocket.url= soul-admin的ip端口`


* 重启或者启动  `soul-bootstrap`。

## websocket方式（推荐）

* 当建立连接以后会全量获取一次数据，以后的数据都是增量的更新与新增，性能好

* 支持断线重连 （默认30秒）