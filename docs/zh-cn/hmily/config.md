---
title: Hmily-Config
keywords: configuration
description: Hmily配置详解
---

###  HmilyConfig：

```java
@Data
public class HmilyConfig {

    /**
     * Resource suffix this parameter please fill in about is the transaction store path.
     * If it's a table store this is a table suffix, it's stored the same way.
     * If this parameter is not filled in, the applicationName of the application is retrieved by default
     */
    private String appName;
    
    /**
     * log serializer.
     */
    private String serializer = "kryo";
    
    /**
     * contextTransmittalMode.
     */
    private String contextTransmittalMode = "threadLocal";
    
    /**
     * scheduledPool Thread size.
     */
    private int scheduledThreadMax = Runtime.getRuntime().availableProcessors() << 1;
    
    /**
     * scheduledPool scheduledDelay unit SECONDS.
     */
    private int scheduledRecoveryDelay = 60;
    
    /**
     * scheduled clean delay.
     */
    private int scheduledCleanDelay = 60;
    
    /**
     * scheduledPhyDeletedDelay.
     */
    private int scheduledPhyDeletedDelay = 600;
    
    /**
     * scheduledPool scheduledInitDelay unit SECONDS.
     */
    private int scheduledInitDelay = 30;
    
    /**
     * recoverDelayTime Unit seconds
     * (note that this time represents how many seconds after the local transaction was created before execution).
     */
    private int recoverDelayTime = 60;
    
    /**
     * cleanDelayTime Unit seconds
     * (note that this time represents how many seconds after the local transaction was created before execution).
     */
    private int cleanDelayTime = 180;
    
    /**
     * query by limit.
     */
    private int limit = 100;
    
    /**
     * retry max.
     */
    private int retryMax = 10;
    
    /**
     * disruptor bufferSize.
     */
    private int bufferSize = 4096 * 2 * 2;
    
    /**
     * this is disruptor consumerThreads.
     */
    private int consumerThreads = Runtime.getRuntime().availableProcessors() << 1;
    
    /**
     * asyncRepository.
     */
    private boolean asyncRepository = true;
    
    /**
     * autoSql.
     */
    private boolean autoSql = true;
    
    /**
     * phyDeleted is true means physically deleted  is false means update status to death.
     */
    private boolean phyDeleted = true;
    
    /**
     * when phyDeleted is false , store days.
     */
    private int storeDays = 3;
    
    /**
     * repository.
     */
    private String repository = "mysql";
    
    /**
     * db config.
     */
    private HmilyDbConfig hmilyDbConfig;

    /**
     * mongo config.
     */
    private HmilyMongoConfig hmilyMongoConfig;

    /**
     * redis config.
     */
    private HmilyRedisConfig hmilyRedisConfig;
    
    /**
     * zookeeper config.
     */
    private HmilyZookeeperConfig hmilyZookeeperConfig;
    
    /**
     * file config.
     */
    private HmilyFileConfig hmilyFileConfig;
    
    /**
     * metrics config.
     */
    private HmilyMetricsConfig hmilyMetricsConfig;
```


 |名称                      | 类型  |  默认值   | 是否必填  | 说明                        |
 |:------------------------ |:----- |:-------: |:-------:|:----------------------------|
 |appName                   |String |  无      | 必填     |一般填你微服务的应用名称，请不要重复|
 |serializer                |String |  kryo    |  非必填  |这是指定事务日志的序列化方式，目前支持填写 `kryo`, `hessian`, `jdk`, `jdk`, `protostuff`|
 |contextTransmittalMode    |String |threadLocal| 非必填  |这是事务上下文传递的模式，目前支持填写 `threadLocal`, `transmittable` (跨线程模式) |
 |scheduledThreadMax        |int    |CPU * 2    | 非必填  |调度线程数最大线程数量 |
 |scheduledRecoveryDelay    |int(单位:秒) | 60   | 非必填  |事务日志自动恢复调度周期 |
 |scheduledCleanDelay       |int(单位:秒) | 60   | 非必填  |事务日志清理调度周期 |
 |scheduledPhyDeletedDelay  |int(单位:秒) | 60   | 非必填  |事务日志物理删除调度周期 |
 |scheduledInitDelay        |int(单位:秒) | 30   | 非必填  |调度任务启动延迟时间 |
 |recoverDelayTime          |int(单位:秒) | 60   | 非必填  |事务日志恢复迟延时间 |
 |cleanDelayTime            |int(单位:秒) | 60   | 非必填  |事务日志清理迟延时间 |
 |limit                     |int         | 100   | 非必填  |获取事务日志行数大小 |
 |retryMax                  |int         | 10   | 非必填  |最大重试次数 |
 |bufferSize                |int         | 4096 * 2 * 2 | 非必填  |disruptor的bufferSize大小 |
 |consumerThreads           |int         | CPU * 2 | 非必填  |disruptor消费者线程数量 |
 |asyncRepository           |boolean     | true | 非必填  | 是否异步存储事务日志，设置为false则为同步 |
 |autoSql                   |boolean     | true | 非必填  | 是否自动执行框架自动建库建表SQL语句（如果已经创建可以设置为false） |
 |phyDeleted                |boolean     | true | 非必填  | 在运行过程中，是否物理删除日志。设置为false，则只会更改日志状态 |
 |storeDays                 |int(单位:天) | 3    | 非必填  | 如果 phyDeleted 设置为false的时候，日志存储天数|
 |repository                |String |  mysql    |  必填   |这是指定事务日志的存储方式，目前支持填写 `mysql`, `oracle`, `postgresql`, `sqlserver`, `mongo`, `redis`|
 |hmilyDbConfig             |JAVA BEAN | 无    | 非必填  | 关系型数据库的配置，与 repository 的配置要对应|
 |hmilyMongoConfig          |JAVA BEAN | 无    | 非必填  | mongo数据库配置，与 repository 的配置要对应|
  

  * hmilyDbConfig（Hmily使用hikari连接池）

 |名称                      | 类型  |  默认值   | 是否必填  | 说明                        |
 |:------------------------ |:----- |:-------: |:-------:|:----------------------------|
 |driverClassName           |String |  com.mysql.jdbc.Driver     | 必填     |数据库的驱动类名称|
 |url                       |String |  无 | 必填     |数据库的url连接| 
 |username                  |String |  无 | 必填     |数据库的用户名密码|  
 |password                  |String |  无 | 必填     |数据库的密码| 
 |maxActive                 |int    |  20 | 非必填   |连接池连接最大活跃数| 
 |minIdle                   |int    |  10 | 非必填   |连接池最小空闲数| 
 |connectionTimeout         |long   |  30000 | 非必填 |数据库的连接超时时间|  
 |idleTimeout               |long   |  60000 | 非必填 |一个连接idle状态的最大时长（毫秒），超时则被释放（retired），缺省:10分钟| 
 |maxLifetime               |long   |  1800000 | 非必填 |一个连接的生命时长（毫秒），超时而且没被使用则被释放（retired），缺省:30分钟，建议设置比数据库超时时长少30秒，参考MySQL wait_timeout参数（show variables like '%timeout%';| 
 |idleTimeout               |long   |  60000 | 非必填 |一个连接idle状态的最大时长（毫秒），超时则被释放（retired），缺省:10分钟|                                                             
 |dataSourcePropertyMap     |Map<String,Object> |  无 | 非必填     |hikari连接池的其他属性配置| 
 
 
   * hmilyMongoConfig
   
 |名称                      | 类型  |  默认值   | 是否必填  | 说明                        |
 |:------------------------ |:----- |:-------: |:-------:|:----------------------------|
 |mongoDbName               |String |  无 | 必填     |mongo数据库名称|
 |mongoDbUrl                |String |  无 | 必填     |mongo数据库的url连接| 
 |mongoUserName             |String |  无 | 必填     |mongo数据库的用户名密码|  
 |mongoUserPwd              |String |  无 | 必填     |mongo数据库的密码| 