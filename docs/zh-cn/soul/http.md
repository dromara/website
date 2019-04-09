---
title: 请求soul网关
keywords: soul http
description: 请求soul网关
---



* soul有对请求有自己的特殊处理，[请求参数](request.md)。

* [启动admin](admin.md)。在请求前，请确保在admin后台开启了相应的插件，是否在相应的插件配置了规则  

* [启动soul](server.md)

* 发起http请求：请求地址为 http://ip:port   ip与端口就是你启动的soul服务的ip与端口，后面不需要带其他的路径，然后设置http请求头就可以了。

* Http请求头(header)设置：

     * module ： 必填,指请求的系统模块，建议：所有插件的选择器中应该根据此字段来过滤请求。

     * method ：必填,请求的方法，指真实请求的方法，如果是http/springcloud，那么指请求的方法路径。如果是dubbo，那就是请求的真实方法.
                 建议：所有插件规则应该根据此字段来过滤请求。  
                  
     * rpcType: 请求的类型，填写http 则会使用divide插件，填写dubbo则会使用dubbo插件，填写springcloud则会使用springcloud插件。、

     * httpMethod: 目前只支持get / post 一般建议都使用post请求,如果是rpcType是http/springcloud 则必填

     * sign: 当前签名插件开启的时候，需要传入的签名值。具体算法请看sign插件。（非必填）

     * timestamp： 当前时间戳，soul默认会过滤掉10分钟之前的请求，用户可以配置，在配置文件中的soul.timeDelay可以配置，也可以不验证：soul.timeVerify.enabled:false timeVerify （非必填）

     * appKey： 在soul-admin后台认证管理设置的module字段，当前签名插件开启的时候需要传入。（非必填）

     * content http post请求在body中请求的参数。（非必填）
    
     * extInfo 扩展字段，在http get 请求时候的查询参数json字段。（非必填）

     
* Http body设置：
  
     * 如果是http,springcloud请求，那么body的设置，就是你真实需要填写的数据，soul在代理的时候，会把你的body数据，传递给真实调用者。

     * 如果是dubbo调用，那么数据格式参考[dubbo插件](dubbo.md)
