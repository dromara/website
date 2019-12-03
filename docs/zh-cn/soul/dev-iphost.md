---
title: 扩展获取Ip与host
keywords: soul
description: 扩展获取Ip与host
---



## 说明

* 本文是说明，如果网关前面有一层nginx的时候，如果获取正确的ip与端口。

* 获取正确的之后，在插件以及选择器中，可以根据 ip，与host来进行匹配。


##  默认实现

*  默认的实现是通过 `exchange.getRequest().getRemoteAddress()`

*  在soul-bootstrap中新增了 `XForwardedRemoteAddressResolver实现`

* 把你新增的实现类注册成为spring的bean,如下


##  扩展

* 新增一个类A,实现 `org.dromara.soul.web.support.RemoteAddressResolver`。

```
public interface RemoteAddressResolver {

    /**
     * Resolve inet socket address.
     *
     * @param exchange the exchange
     * @return the inet socket address
     */
    default InetSocketAddress resolve(ServerWebExchange exchange) {
        return exchange.getRequest().getRemoteAddress();
    }
}

```

* 把你的类，注册成Spring的bean覆盖默认的实现。
```
@Bean
public RemoteAddressResolver remoteAddressResolver() {
  return new 你的类(1);
}
```





