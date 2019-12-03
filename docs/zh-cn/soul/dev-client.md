---
title: 自定义开发soul的客户端
keywords: soul
description: 自定义开发soul的客户端
---



## 说明

* 本文主要讲解如果自定义开发 soul-client,来对接网关。

##  首先要明白的事情

* soul-client 只是讲你的接口，变成网关需要的元数据，来更快的接入网关。

* 请先看下 [元数据设计](metaData.md)。

## 请求

* soul网关默认的需要参数,通过body里面传，json类型。
```

{
	"appName": "xxx", //应用名称
	"path": "xxx",    //路径需要唯一
	"pathDesc": "xxx", //路径描述
	"rpcType": "xxx",  //rpc类型
	"serviceName": "xxx",  //接口全路径
	"methodName": "xxx",   //方法名称
	"parameterTypes": "xxx",//方法参数类型
	"rpcExt": "xxx",//方法参数类型
	"enabled": "true"  
}
```
* 请求方式 ： post 

* 请求地址 : http://soul-admin的ip + 端口/meta-data/register

* 如果提供的 client不满足你的邀请，可以参考`soul-client` 模块来实现一个。





