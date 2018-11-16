---
title: 请求参数设计
keywords: request
description: 请求参数设计
---


* Soul是对接Http请求的网关，所以对请求参数有自己的规定。
* 请求参数格式如下：
网关的请求参数为：
```java
package org.dromara.soul.web.request;

import lombok.Data;
import org.dromara.soul.common.constant.Constants;
import org.dromara.soul.common.enums.HttpMethodEnum;
import org.dromara.soul.common.enums.RpcTypeEnum;
import org.springframework.http.server.reactive.ServerHttpRequest;

import java.io.Serializable;

/**
 * the soul request DTO .
 *
 * @author xiaoyu(Myth)
 */
@Data
public class RequestDTO implements Serializable {

    /**
     * is module data.
     */
    private String module;

    /**
     * is method name .
     */
    private String method;

    /**
     *  is rpcType data.  now we only support "http","dubbo" "motan","grpc".
     *  {@linkplain RpcTypeEnum}
     */
    private String rpcType;

    /**
     *  httpMethod  now we only support "get","post" .
     * {@linkplain  HttpMethodEnum}
     */
    private String httpMethod;

    /**
     * this is sign .
     */
    private String sign;

    /**
     * timestamp .
     */
    private String timestamp;

    /**
     * appKey .
     */
    private String appKey;

    /**
     * content is json data.
     */
    private String content;

    /**
     * extInfo is json data .
     */
    private String extInfo;

    /**
     * ServerHttpRequest transform RequestDTO .
     *
     * @param request {@linkplain ServerHttpRequest}
     * @return RequestDTO request dto
     */
    public static RequestDTO transform(final ServerHttpRequest request) {
        final String module = request.getHeaders().getFirst(Constants.MODULE);
        final String method = request.getHeaders().getFirst(Constants.METHOD);
        final String appKey = request.getHeaders().getFirst(Constants.APP_KEY);
        final String httpMethod = request.getHeaders().getFirst(Constants.HTTP_METHOD);
        final String rpcType = request.getHeaders().getFirst(Constants.RPC_TYPE);
        final String sign = request.getHeaders().getFirst(Constants.SIGN);
        final String timestamp = request.getHeaders().getFirst(Constants.TIMESTAMP);
        RequestDTO requestDTO = new RequestDTO();
        requestDTO.setModule(module);
        requestDTO.setMethod(method);
        requestDTO.setAppKey(appKey);
        requestDTO.setHttpMethod(httpMethod);
        requestDTO.setRpcType(rpcType);
        requestDTO.setSign(sign);
        requestDTO.setTimestamp(timestamp);
        return requestDTO;
    }

}

```
* 参数都需要通过Http请求头进行设置，请求头的字段在使用文档中介绍。当然用户也可以自己定义额外增加字段。