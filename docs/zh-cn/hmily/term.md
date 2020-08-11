---
title: 术语
keywords: Hmily
description: 术语
---

### 术语

* 发起者: 全局事务的开启者，一个请求最先遇到 `@HmilyTCC` or `@HmilyTAC` 注解的方法，该所属方法应用被称为发起者

* 参与者： 在发起者方法内部调用了被  `@HmilyTCC` or `@HmilyTAC` 注解的RPC方法，该RPC应用被称为事务参与者。

* TCC ：`try`, `confirm`, `cancel` 3个阶段的简称。

* TAC ：try执行完以后，会生成反向回滚SQL，如果有异常，会由框架来自动调用回滚SQL。 AC(Auto Cancel)。