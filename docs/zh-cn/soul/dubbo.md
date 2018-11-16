---
title: dubbo插件
keywords: dubbo
description: dubbo插件
---



* dubbo插件，是soul支持dubbo框架的插件。dubbo插件开启，并且当请求头的rpcType字段为dubbo的时候，会走这个插件。

* dubbo的选择器列图：
    ![](https://yu199195.github.io/images/soul/dubbo-selector.png)

   * 当插件开启时候，如上图：并且请求头的module字段值是order时候，会被匹配上。之后会去匹配规则。
   
   * 规则图：
            ![](https://yu199195.github.io/images/soul/dubbo-rule.png)

       * 上图代表当你在上一步选择器匹配之后，如果请求头中的method字段值是findById，那么该规则就会被匹配。
       
       * Hystrix ： 进行dubbo泛化调用时候熔断器的参数。

       * dubbo配置：这就是dubbo的配置，注册地址请填写zookeeper的地址。其他的我不说，我相信你们也懂。。

* dubbo参数协议,在http body中 请求的数据格式为 ：

```json
{
    "interfaceName":"org.dromara.soul.test.dubbo.api.service.DubboTestService",
    "method":"insert",
    "paramClass":"[org.dromara.soul.test.dubbo.api.entity.DubboTest]",
    "classParams":[
        {
            "id":"xxxx",
            "name":"xiaoyu"
        }
    ],
    "params":{
        "java.lang.String":[
            "aaa",
            "1bnbb"
        ],
        "java.lang.Integer":"1"       
    }
}

```
*   interfaceName，method 字段为必填，意思是你请求的接口与方法。

*   paramClass 意思是如果你请求的方法参数是一个java对象，那么这里填写你java对象的路径。

*   classParams 意思是你请求java对象参数的属性，用json表示。

*   params  这个字段是你的请求参数类型，比如你的参数是一个String，Int 等。 如果是连续相同类型的参数，那么就要写成一个数组。

* soul网关会根据你的请求参数进行dubbo的泛化调用，然后把结果返回。

* dubbo使用参数类型建议，如果是很复杂的对象，建议使用String，参数填写json字符串，然后在提供方进行解析字符串。
