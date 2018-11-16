---
title: waf插件
keywords: waf
description: waf插件
---



* waf插件也是soul的前置插件，只要用来拦截非法请求，或者异常请求，并且给与相关的拒绝策略。

* 如果在waf插件启用的时候，选择器和规则都能匹配到相关的请求时候，waf插件的处理是reject策略的时候，该请求会被拒绝。

* 如果用户不想使用此功能，请在admin后台停用此插件。