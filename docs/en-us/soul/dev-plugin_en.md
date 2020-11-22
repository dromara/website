---
title: plugins
keywords: soul
description: plugins
---

## description

* Plugins are core executors of soul gateway. Every plugin handles matched requests when enabled.

* There are two kinds of plugins in the soul gateway:
  
   * The first type is a call chain with a single responsibility, and traffic cannot be customized.
   
   * The other one can do its own chain of responsibility for matched traffic.

* You could reference from soul-plugin module and develop plugins by yourself. Please fire pull requests of your wonderful plugins without hesitate.

## single responsibility plugins

* Add following dependency:

```
 <dependency>
        <groupId>org.dromara</groupId>
        <artifactId>soul-plugin-api</artifactId>
        <version>2.2.0</version>
  </dependency>
```

* Create a new class named "A" and let it implements `org.dromara.soul.plugin.api.SoulPlugin`

```java
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
     * return plugin order .
     * This attribute To determine the plugin execution order in the same type plugin.
     *
     * @return int order
     */
    int getOrder();
    
    /**
     * acquire plugin name.
     * this is plugin name define you must Provide the right name.
     * if you impl AbstractSoulPlugin this attribute not use.
     *
     * @return plugin name.
     */
    default String named() {
        return "";
    }
    
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
}

```
* Detailed instruction of interface methods:
       
   * `execute()` core method, you can do any task here freely.
   
   * `getOrder()` get the order of current plugin.
   
   * `named()` acquire the name of specific plugin.
   
   * `skip()` determines whether this plugin should be skipped under certain conditions.
   

* Register plugin in Spring as a Bean, or simply apply `@Component` in implementation class.

```java
    @Bean
    public SoulPlugin a() {
        return new A();
    }
```
 

## Matching traffic processing plugin

* Introduce the following dependency:
```xml
 <dependency>
        <groupId>org.dromara</groupId>
        <artifactId>soul-plugin-base</artifactId>
        <version>2.2.0</version>
  </dependency>
```
*  Add a new class A, inherit from `org.dromara.soul.plugin.base.AbstractSoulPlugin`

* examples down below:

```java
/**
 * This is your custom plugin.
 * He is running in after before plugin, implement your own functionality.
 * extends AbstractSoulPlugin so you must user soul-admin And add related plug-in development.
 *
 * @author xiaoyu(Myth)
 */
public class CustomPlugin extends AbstractSoulPlugin {
    
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

* Detailed explanation:

   * Plugins will match the selector rule for customized plugins inherit from this abstract class. Following steps guide you to config your plugins.

   * Firstly add a new plugin in `soul-admin`, please mind that your plugin name should match the named() method overridden in your class.

   * Re-login  `soul-admin`, the plugin you added now showing on plugin-list page, you can choose selectors for matching.

   * 在规则中，有个 `handler` 字段，是你自定义处理数据，在 `doExecute()` 方法中，通过 ` final String ruleHandle = rule.getHandle();` 获取，然后进行你的操作。

* Register plugin in Spring as a Bean, or simply apply `@Component` in implementation class.

```java
    @Bean
    public SoulPlugin a() {
        return new A();
    }
```

## 订阅你的插件数据，进行自定义的处理

* 新增一个类A，实现 `org.dromara.soul.plugin.base.handler.PluginDataHandler`

```java
public interface PluginDataHandler {
    
    /**
     * Handler plugin.
     *
     * @param pluginData the plugin data
     */
    default void handlerPlugin(PluginData pluginData) {
    }
    
    /**
     * Remove plugin.
     *
     * @param pluginData the plugin data
     */
    default void removePlugin(PluginData pluginData) {
    }
    
    /**
     * Handler selector.
     *
     * @param selectorData the selector data
     */
    default void handlerSelector(SelectorData selectorData) {
    }
    
    /**
     * Remove selector.
     *
     * @param selectorData the selector data
     */
    default void removeSelector(SelectorData selectorData) {
    }
    
    /**
     * Handler rule.
     *
     * @param ruleData the rule data
     */
    default void handlerRule(RuleData ruleData) {
    }
    
    /**
     * Remove rule.
     *
     * @param ruleData the rule data
     */
    default void removeRule(RuleData ruleData) {
    }
    
    /**
     * Plugin named string.
     *
     * @return the string
     */
    String pluginNamed();
    
}
```

* 注意 `pluginNamed()` 要和你自定义的插件名称相同。

* 注册成Spring的bean，参考如下,或者直接在实现类上加 `@Component` 注解。
```java
    @Bean
    public PluginDataHandler a() {
        return new A();
    }
```
