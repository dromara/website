---
title: sign插件
keywords: sign
description: sign插件
---



* sign是用来检验访问是否有效的前置插件，它会根据请求参数中的，timestamp,module,method,rpcType 4个字段做Key，Value值的拼接，
   再拼接上appSecret，再进行MD5加密生成一个签名，然后对比，来检测请求是否合法。

* 签名算法如下：

  * 首先构造一个Map
    ```java
     private Map<String, String> buildParamsMap(final RequestDTO dto) {
        Map<String, String> map = Maps.newHashMapWithExpectedSize(4);
        map.put("timestamp", dto.getTimestamp());
        map.put("module", dto.getModule());
        map.put("method", dto.getMethod());
        map.put("rpcType", dto.getRpcType());
        return map;
    }
    ```

   * 对Map进行Key的排序后，获取值，再拼装，再拼接appSecret，进行Md5加密，最后转成大写。代码如下：
    ```java
       /**
     * acquired sign.
     *
     * @param signKey sign key
     * @param params params
     * @return sign
     */
    private static String generateSign(final String signKey, final Map<String, String> params) {
        List<String> storedKeys = Arrays.stream(params.keySet()
                .toArray(new String[]{}))
                .sorted(Comparator.naturalOrder())
                .collect(Collectors.toList());
        final String sign = storedKeys.stream()
                .filter(key -> !Objects.equals(key, Constants.SIGN))
                .map(key -> String.join("", key, params.get(key)))
                .collect(Collectors.joining()).trim()
                .concat(signKey);
        return DigestUtils.md5DigestAsHex(sign.getBytes()).toUpperCase();
    }
    ````
* 在soul的admin后台会有一个功能来专门维护appKey和appSecret，appKey的含义对应的就是请求参数中的moudule，appSecret是分配给某一个系统模块的秘钥。前端只需要根据算法得到并传递签名值，和moulde。soul也会进行同样的算法生成签名，来对比，从而检验请求的合法性。

* 如果用户觉得麻烦，不想进行安全性的校验，可以在admin后台把Sign插件停用。