---
title: rewrite插件
keywords: rewrite
description: rewrite插件
---


* 重写插件可以对匹配的规则的url进行重写，用来覆盖head请求头的中的method字段。

* 如果请求匹配到了重写插件，重写插件的rewriteURI会拼装在divide插件的url后面。

* 如果用户不需要，可以把插件禁用。