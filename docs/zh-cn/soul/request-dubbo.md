---
title: dubbo用户请求网关
keywords: soul
description: dubbo用户请求网关
---


## 说明

* 本篇文章主要是说明，dubbo用户如何对网关进行请求。

* 请求之前，请确保你启动了 `soul-admin` ,`soul-bootstrap` 以及你自己dubbo项目以及接入到网关。


## dubbo用户

* 说白了，就是把http请求，转成dubbo协议，内部使用dubbo泛化来进行调用。

* 首先你要回想下，你的dubbo服务在接入网关的时候，是不是加了个 `soulClient` 注解，里面是不是有个path字段来指定你请求的路径？

* 你是不是还在yml中配置了一个 `contextPath`?

* 如果您还记得，那我们就开始。

* 假如你有一个这样的方法, contextPath 配置的是 `/dubbo`
```
   @Override
    @SoulClient(path = "/insert", desc = "插入一条数据")
    public DubboTest insert(final DubboTest dubboTest) {
        return dubboTest;
    }

```

* 那么我们请求的路径为: http://localhost:9195/dubbo/insert ,再说一下，localhost:9195是网关的域名，如果你更改了，这里也要改。

* 那么请求参数呢？ `DubboTest` 是一个javabean对象，那么我们通过body中传递这个对象的json数据就好。

```
{"id":"1234","name":"XIAO5y"}

```

* 如果你的接口中,没有参数，那么body传值为:

```
{}

```

* 如果你的接口有很多个参数？ 目前soul，默认情况下只支持一个参数，如果你有多个，请实现 `org.dromara.soul.web.plugin.dubbo.GenericParamResolveService` 来覆盖默认实现
  这一部分，我们可以在开发者文档[dubbo参数自定义解析](dev-dubbo.md)来详细说明.