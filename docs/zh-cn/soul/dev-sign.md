---
title: 自定义sign插件检验
keywords: soul
description: 自定义sign插件检验
---



## 说明

* 本文是说明,如何针对sign插件，来进行自定义检验


###  扩展

*  默认的实现为 `org.dromara.soul.web.plugin.before.DefaultSignService`

*  新增一个类实现 `org.dromara.soul.web.plugin.before.SignService`

```
 public interface SignService {
 
     /**
      * Sign verify pair.
      *
      * @param requestDTO the request dto
      * @param exchange   the exchange
      * @return the pair
      */
     Pair<Boolean, String> signVerify(RequestDTO requestDTO, ServerWebExchange exchange);
 }

```

* Pair中返回true,表示验证通过，为false的时候，会把String中的信息输出到前端.


* 把你新增的实现类注册成为spring的bean,如下

```
   @Bean
   public SignService signService() {
         return new 你的类
   }
```



