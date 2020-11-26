---
title: multi-language http client
keywords: soul
description: multi-language http client
---

## description

* This doc gives a brief description for connecting to soul with http client in other programming languages.

* How to customize soul-http-client


## customize

* request method: `POST`

* request endpoint

    * `http://soul-admin/soul-client/springmvc-register`  
	soul-admin represents for ip + port for admin project

* request params

	* send json serialized params in body to soul gateway
```json
{
	"appName": "xxx", //application name, required
	"context": "/xxx", //request root path, required
	"path": "xxx", //request path, must be unique, required
	"rpcType": "http", //rpc type, required
	"host": "xxx", //server host, required
	"port": xxx, //server port, required
	"ruleName": "xxx", //could be a duplicate of "path", required
	"enabled": "true"
}
```





