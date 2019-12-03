---
title: dubbo参数自定义扩展
keywords: soul
description: dubbo参数自定义扩展
---



## 说明

* 本文主要是针对dubbo用户

* 本文主要是针对dubbo用户，dubbo方法参数大于一个的扩展介绍



##  默认支持

* 默认实现类为: `org.dromara.soul.web.plugin.dubbo.DefaultGenericParamResolveServiceImpl`。

* 它只支持单个参数，包括基本类型，和javabean类型。

* 如果是javabean类型，它会把http body里面的json格式转成 Map类型，再通过泛化进行调用。



## 扩展实现

*  新增类A,实现 `org.dromara.soul.web.plugin.dubbo.GenericParamResolveService`。

 ```java
 public interface GenericParamResolveService {
 
     /**
      * Build parameter pair.
      * this is Resolve http body to get dubbo param.
      *
      * @param body           the body
      * @param parameterTypes the parameter types
      * @return the pair
      */
     Pair<String[], Object[]> buildParameter(String body, String parameterTypes);
 }
```

* `body`为http中body传的json字符串.

*  `parameterTypes`: 匹配到的方法参数类型列表，如果有多个,则使用`,`分割。

* Pair中，left为参数类型，right为参数值，这是dubbo泛化调用的标准

* 把你的类注册成Spring的bean，覆盖默认的实现。

```java
@Bean
public GenericParamResolveService genericParamResolveService() {
        return new A();
 }
```





