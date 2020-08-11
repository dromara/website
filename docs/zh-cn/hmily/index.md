Hmily是什么？
================

Hmily是一款高性能，零侵入的一站式分布式事务解决方案，目前主要提供柔性事务的支持，包含 `TCC`, `TAC`(自动生成回滚SQL) 方案，未来还会支持 `XA` 等方案。

 ![](https://yu199195.github.io/images/hmily/hmily.png) 

#  功能
   
   *  支持 `Dubbo`, `SpringCloud`,`Montan` 等RPC框架进行分布式事务
   
   *  支持事务异常回滚，超时异常恢复，防止事务悬挂
   
   *  支持且套事务，支持RPC且套调用
   
   *  提供零侵入的`spring namespace`, `springboot` 快速集成方式, 简单易用
   
   *  事务日志存储支持 `mysql`, `oracle`, `mongodb`, `redis`, `zookeeper` 等方式
   
   *  高性能，支持微服务集群部署
   
   *  提供后台管理可视化,以及metrics相关性能监控
   

# 必要前提 

  * 必须使用 `JDK8+` 
  
  * 必须要使用一款 `RPC` 框架, 比如 : `Dubbo`, `SpringCloud`,`Montan`
  

# TCC模式

 ![](https://yu199195.github.io/images/hmily/hmily-tcc.png) 
 
   当使用`TCC`模式的时候,用户根据自身业务需求提供 `try`, `confirm`, `cancel` 等三个方法，
   并且 `confirm`, `cancel` 方法由自身完成实现，框架只是负责来调用，来达到事务的一致性。

# TAC模式  

   当用户使用`TAC`模式的时候，用户必须使用关系型数据库来进行业务操作，框架会自动生成`回滚SQL`,
   当业务异常的时候，会执行`回滚SQL`来达到事务的一致性。
   
  
# 关于Hmily 
    
   Hmily是柔性分布式事务解决方案，提供了`TCC` 与 `TAC` 模式。
   
   它以零侵入以及快速集成方式能够方便的被业务进行整合。
   
   在性能上，日志存储异步（可选）以及使用异步执行的方式，不损耗业务方法方法。
   
   之前是由我个人开发，目前在京东数科重启，未来会成为京东数科的分布式事务解决方案。

# 技术支持

 * ###  如有任何问题欢迎加入QQ群进行讨论
   ![](https://yu199195.github.io/images/qq.png)


 * ###  微信公众号
   ![](https://yu199195.github.io/images/public.jpg)

