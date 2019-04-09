---
title: soul扩展
keywords: soul extend
description: soul扩展
---



* soul 提供了扩展demo 项目是[soul-extend-demo](https://github.com/Dromara/soul/tree/master/soul-extend-demo)

* soul 提供了2种方式的扩展：
 
* 第一种是实现 SoulPlugin接口：
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
* plugnType():是表示该插件的执行顺序与功能，BEFORE是最开始执行，Function 是中间，Last是最后执行。方便使用与扩展。
* getOrder():是指同一种类型插件执行时候的先后顺序。
* named()：插件命名。
* skip(): 该插件是否需要跳过，默认不跳过。
* execute():插件执行的链条，会传递到下一个插件，责任链模式了解一下。

### 如果是实现SoulPlugin的话，只需要将你的实现类声明为Spring的bean就行。


* 第二种是继承 `org.dromara.soul.web.plugin.AbstractSoulPlugin`

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

* 然后把自己定义的插件类注册成为Spring的bean。

* 注意named() 方法返回的要与你在soul-admin后台添加的插件名称一样。
