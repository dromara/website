---
title: 插件扩展
keywords: soul
description: 插件扩展
---

## 说明

* 本篇说明如何自定义soul插件，来进行扩展。


## 技术实现

* soul的插件是责任链模式，用户只需要实现相关的接口，并且把它注册为spring的bean即可。


## 方式一：

### 步骤一 ：

* 用户新增一个类 A,直接实现 `org.dromara.soul.web.plugin.SoulPlugin`

```java
package org.dromara.soul.web.plugin;

import org.dromara.soul.common.enums.PluginTypeEnum;
import org.springframework.web.server.ServerWebExchange;
import reactor.core.publisher.Mono;

/**
 * the soul plugin interface.
 *
 * @author xiaoyu
 */
public interface SoulPlugin {

    /**
     * Process the Web request and (optionally) delegate to the next
     * {@code WebFilter} through the given {@link SoulPluginChain}.
     *
     * @param exchange the current server exchange
     * @param chain    provides a way to delegate to the next filter
     * @return {@code Mono<Void>} to indicate when request processing is complete
     */
    Mono<Void> execute(ServerWebExchange exchange, SoulPluginChain chain);

    /**
     * return plugin type.
     * the plugin execution order
     * before type The first to perform then Function Type ,then last type.
     *
     * @return {@linkplain PluginTypeEnum}
     */
    PluginTypeEnum pluginType();

    /**
     * return plugin order .
     * This attribute To determine the plugin execution order in the same type plugin.
     *
     * @return int order
     */
    int getOrder();

    /**
     * acquire plugin name.
     * this is plugin name define  if you extend {@linkplain AbstractSoulPlugin } you must Provide the right name.
     * if you impl AbstractSoulPlugin this attribute not use.
     *
     * @return plugin name.
     */
    String named();

    /**
     * plugin is execute.
     * if return true this plugin can not execute.
     *
     * @param exchange the current server exchange
     * @return default false.
     */
    default Boolean skip(ServerWebExchange exchange) {
        return false;
    }

```
     
     
   * `execute` 方法为核心的执行方法，用户可以在里面自由的实现自己想要的功能.
   
   *  `pluginType` 指定插件的类型。
   
   *  `getOrder` 指定插件在同一类型中的排序。
   
   *  `named` 指定插件的名称。
   
   *  `skip` 在特定的条件下，该插件是否被跳过。
   
   * 如果还不懂，可以参考  [soul-extend-demo](https://github.com/Dromara/soul/tree/master/soul-extend-demo)


### 步骤二：

* 注册成Spring的bean，参考如下,或者直接在实现类上加 `@Component` 注解。
```
    @Bean
    public SoulPlugin a() {
        return new A();
    }
```
 


## 方式二 ：

### 步骤一：

*  新增一个类A，继承 `org.dromara.soul.web.plugin.AbstractSoulPlugin`

* 以下是参考 ：

```java
package org.dromara.soul.extend.demo.custom;

import org.dromara.soul.common.dto.zk.RuleZkDTO;
import org.dromara.soul.common.dto.zk.SelectorZkDTO;
import org.dromara.soul.common.enums.PluginTypeEnum;
import org.dromara.soul.common.utils.GsonUtils;
import org.dromara.soul.extend.demo.entity.Test;
import org.dromara.soul.web.cache.ZookeeperCacheManager;
import org.dromara.soul.web.plugin.AbstractSoulPlugin;
import org.dromara.soul.web.plugin.SoulPluginChain;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.web.server.ServerWebExchange;
import reactor.core.publisher.Mono;


/**
 * This is your custom plugin.
 * He is running in after before plugin, implement your own functionality.
 * extends AbstractSoulPlugin so you must user soul-admin And add related plug-in development.
 *
 * @author xiaoyu(Myth)
 */
public class CustomPlugin extends AbstractSoulPlugin {

    /**
     * logger.
     */
    private static final Logger LOGGER = LoggerFactory.getLogger(CustomPlugin.class);

    public CustomPlugin(final ZookeeperCacheManager dataCacheManager) {
        super(dataCacheManager);
    }

    /**
     * return plugin type.
     * The type of plug-ins indicates their order at runtime
     * The PluginTypeEnum.BEFORE is first
     * The PluginTypeEnum.LAST is last.
     *
     * @return {@linkplain PluginTypeEnum}
     */
    @Override
    public PluginTypeEnum pluginType() {
        return PluginTypeEnum.FUNCTION;
    }

    /**
     * return plugin order .
     * The same plugin he executes in the same order.
     *
     * @return int
     */
    @Override
    public int getOrder() {
        return 0;
    }

    /**
     * acquire plugin name.
     * return you custom plugin name.
     * It must be the same name as the plug-in you added in the admin background.
     *
     * @return plugin name.
     */
    @Override
    public String named() {
        return "soul";
    }

    /**
     * plugin is execute.
     * Do I need to skip.
     * if you need skip return true.
     *
     * @param exchange the current server exchange
     * @return default false.
     */
    @Override
    public Boolean skip(final ServerWebExchange exchange) {
        return false;
    }

    @Override
    protected Mono<Void> doExecute(ServerWebExchange exchange, SoulPluginChain chain, SelectorZkDTO selector, RuleZkDTO rule) {
        LOGGER.debug(".......... function plugin start..............");

        /*
         * Processing after your selector matches the rule.
         * rule.getHandle() is you Customize the json string to be processed.
         * for this example.
         * Convert your custom json string pass to an entity class.
         */
        final String ruleHandle = rule.getHandle();

        final Test test = GsonUtils.getInstance().fromJson(ruleHandle, Test.class);

        /*
         * Then do your own business processing.
         * The last execution  chain.execute(exchange).
         * Let it continue on the chain until the end.
         */

        System.out.println(test.toString());


        return chain.execute(exchange);
    }
}

```

* 继承该类的插件，插件会进行选择器规则匹配，那如何来设置呢？

* 首先在 `soul-admin` 后台 -->插件管理中，新增一个插件，注意 名称与 你自定义插件的 `named（）` 方法要一致。

* 重新登陆  `soul-admin` 后台 ，你会发现在插件列表就多了一个你刚新增的插件，你就可以进行选择器规则匹配

* 在规则中，有个 `handler` 字段，是你自定义处理数据，在 `doExecute()` 方法中，通过 ` final String ruleHandle = rule.getHandle();` 获取，然后进行你的操作。


### 步骤二：

* 注册成Spring的bean，参考如下,或者直接在实现类上加 `@Component` 注解。
```
    @Bean
    public SoulPlugin a() {
        return new A();
    }
```
