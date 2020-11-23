---
title: use different data-sync strategy.
keywords: soul
description: use different data-sync strategy.
---

## Features

* Data synchronization means to sync the config value of 'soul-admin' data into the JVM memory in the 'soul' cluster, which is the key to the gateway's high performance.

* implement principle, pls refer to： [dataSync](dataSync.md)。

* the gateway in this article is your setup gateway.，请看：[Environment Setup](setup.md)。

## websocket sync（default method，recommend）

* gateway setting（note:restart）
  
    * first of all, add these dependencies in `pom.xml`：
 ```xml
    <!--soul data sync start use websocket-->
    <dependency>
      <groupId>org.dromara</groupId>
      <artifactId>soul-spring-boot-starter-sync-data-websocket</artifactId>
      <version>2.2.0</version>
    </dependency>
   ``` 
   * add these config values in springboot yaml file:
  ```yaml
  soul :
      sync:
          websocket :
               urls: ws://localhost:9095/websocket
  #urls: address of soul-admin，multi-address will be splitted with (,).
   ```

* soul-admin configure, default it's enabled, websocket sync，if you want to disable, pls specify `soul.sync.websocket.enabled=false`

* When the connection is established, the data will be obtained in full, then adding and upating data subsequently. it's a good performance.

* Support disconnection and reconnection (default 30 sec).。


## zookeeper sync

* gateway setting（note: restart）
  
    * add these dependencies in `pom.xml`: 

 ```xml
    <!--soul data sync start use zookeeper-->
      <dependency>
           <groupId>org.dromara</groupId>
            <artifactId>soul-spring-boot-starter-sync-data-zookeeper</artifactId>
            <version>2.2.0</version>
      </dependency>
 ```
  
   * add these dependencies in  springboot yaml file:
 ```yaml
  soul :
      sync:
          zookeeper:
               url: localhost:2181
               sessionTimeout: 5000
               connectionTimeout: 2000
  #url: config with your zk address, used by the cluster environment, splitted with (,).
 ```

* soul-admin config: configure the soul-admin's starting parameter with `--soul.sync.zookeeper.url='your address' `,then restart the service.
```yaml
soul:
  sync:
    zookeeper:
        url: localhost:2181
        sessionTimeout: 5000
        connectionTimeout: 2000
```
* It is  good to use ZooKeeper synchronization mechanism with high timeliness, but we also have to deal with the unstable environment of ZK, cluster brain splitting and other
  problems.

## http long-polling sync

* gateway setting（note:restart）
  
    * first of all add these dependencies in `pom.xml`：

 ```xml
    <!--soul data sync start use zookeeper-->
      <dependency>
           <groupId>org.dromara</groupId>
            <artifactId>soul-spring-boot-starter-sync-data-http</artifactId>
            <version>2.2.0</version>
      </dependency>
   ```
  
   * add these config values in your springboot yaml file:
   ```yaml
  soul :
      sync:
          http:
               url: http://localhost:9095
  #url: config with your soul-admin's ip and port url, pls use (,) to split multi cluster environment.
   ```
* soul-admin config, default config with http sync enabled, if you want to disable, pls specify `soul.sync.http.enabled=false`
```yaml
soul:
  sync:
     http:
       refresh-interval: 5m # default to refresh the local cache once per 5min
       enabled: true # default to enable http sync
```

* HTTP long-polling makes the gateway lightweight and less time-sensitive. 

* It pulls according to the group key. If the data is too large or too much, it will have some influence, that is a small change under a group will pull the entire group.

## nacos sync

* gateway setting（note:restart）
  
    * first of all add these dependencies in your `pom.xml`：
 ```xml
    <!--soul data sync start use zookeeper-->
      <dependency>
           <groupId>org.dromara</groupId>
            <artifactId>soul-spring-boot-starter-sync-data-nacos</artifactId>
            <version>2.2.0</version>
      </dependency>
   ```
  
  * add these config values in the springboot yaml file:
 ```yaml
  soul :
      sync:
         nacos:
              url: localhost:8848
              namespace: 1c10d748-af86-43b9-8265-75f487d20c6c
              acm:
                enabled: false
                endpoint: acm.aliyun.com
                namespace: 
                accessKey: 
                secretKey: 
  #url: config with your nacos address, pls use (,) to split your cluster environment.
  # other configure，pls refer to the naocs website。
 ```
* soul-admin config: passing values one by one with '--' operator in the soul-Admin startup parameter.
```yaml
soul :
      sync:
         nacos:
              url: localhost:8848
              namespace: 1c10d748-af86-43b9-8265-75f487d20c6c
              acm:
                enabled: false
                endpoint: acm.aliyun.com
                namespace: 
                accessKey: 
                secretKey: 
```
