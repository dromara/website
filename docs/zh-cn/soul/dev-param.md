---
title: soul参数扩展
keywords: soul
description: soul参数扩展
---



## 说明

* 本文是说明,如何对soul网关所需要的参数进行扩展修改以及验证 


###  扩展

*  默认的实现为 `org.dromara.soul.web.filter.DefaultParamService`

*  新增一个类实现 `org.dromara.soul.web.filter.ParamService`

* 把你新增的实现类注册成为spring的bean,如下

```
   @Bean
    public ParamService paramService() {
        return new 你的类;
    }
```



