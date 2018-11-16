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


* 第二种是继承AbstractSoulPlugin插件,这种就比较困难了，您需要开发后台插件来实现你自己想要功能
```java
/*
 *
 *  * Licensed to the Apache Software Foundation (ASF) under one or more
 *  * contributor license agreements.  See the NOTICE file distributed with
 *  * this work for additional information regarding copyright ownership.
 *  * The ASF licenses this file to You under the Apache License, Version 2.0
 *  * (the "License"); you may not use this file except in compliance with
 *  * the License.  You may obtain a copy of the License at
 *  *
 *  *     http://www.apache.org/licenses/LICENSE-2.0
 *  *
 *  * Unless required by applicable law or agreed to in writing, software
 *  * distributed under the License is distributed on an "AS IS" BASIS,
 *  * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *  * See the License for the specific language governing permissions and
 *  * limitations under the License.
 *
 */

package org.dromara.soul.web.plugin;

import lombok.RequiredArgsConstructor;
import org.apache.commons.collections4.CollectionUtils;
import org.dromara.soul.common.constant.Constants;
import org.dromara.soul.common.dto.zk.PluginZkDTO;
import org.dromara.soul.common.dto.zk.RuleZkDTO;
import org.dromara.soul.common.dto.zk.SelectorZkDTO;
import org.dromara.soul.common.enums.PluginEnum;
import org.dromara.soul.common.enums.SelectorTypeEnum;
import org.dromara.soul.common.result.SoulResult;
import org.dromara.soul.common.utils.JSONUtils;
import org.dromara.soul.common.utils.LogUtils;
import org.dromara.soul.web.cache.ZookeeperCacheManager;
import org.dromara.soul.web.condition.strategy.MatchStrategyFactory;
import org.dromara.soul.web.request.RequestDTO;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.web.server.ServerWebExchange;
import reactor.core.publisher.Mono;

import java.util.List;
import java.util.Objects;


/**
 * abstract soul plugin please extends.
 *
 * @author xiaoyu(Myth)
 */
@SuppressWarnings("unchecked")
@RequiredArgsConstructor
public abstract class AbstractSoulPlugin implements SoulPlugin {

    /**
     * logger.
     */
    private static final Logger LOGGER = LoggerFactory.getLogger(AbstractSoulPlugin.class);

    private final ZookeeperCacheManager zookeeperCacheManager;

    /**
     * this is Template Method child has Implement your own logic.
     *
     * @param exchange exchange the current server exchange {@linkplain ServerWebExchange}
     * @param chain    chain the current chain  {@linkplain ServerWebExchange}
     * @param rule     rule    {@linkplain RuleZkDTO}
     * @return {@code Mono<Void>} to indicate when request handling is complete
     */
    protected abstract Mono<Void> doExecute(ServerWebExchange exchange, SoulPluginChain chain, RuleZkDTO rule);


    /**
     * Process the Web request and (optionally) delegate to the next
     * {@code WebFilter} through the given {@link SoulPluginChain}.
     *
     * @param exchange the current server exchange
     * @param chain    provides a way to delegate to the next filter
     * @return {@code Mono<Void>} to indicate when request processing is complete
     */
    @Override
    public Mono<Void> execute(final ServerWebExchange exchange, final SoulPluginChain chain) {
        final PluginZkDTO redisDTO = zookeeperCacheManager.findPluginByName(named());
        if (!(skip(exchange) || redisDTO == null || !redisDTO.getEnabled())) {
            //获取selector
            final List<SelectorZkDTO> selectors = zookeeperCacheManager.findSelectorByPluginName(named());
            if (CollectionUtils.isEmpty(selectors)) {
                return chain.execute(exchange);
            }
            RuleZkDTO rule = selectors.stream()
                    .filter(selector -> selector.getEnabled() && filterSelector(selector, exchange))
                    .findFirst()
                    .map(selectorZkDTO -> {
                        //如果打印日志
                        if (selectorZkDTO.getLoged()) {
                            LogUtils.info(LOGGER, named() + " selector success selector name :{}", selectorZkDTO::getName);
                        }
                        final List<RuleZkDTO> rules =
                                zookeeperCacheManager.findRuleBySelectorId(selectorZkDTO.getId());
                        if (CollectionUtils.isEmpty(rules)) {
                            return null;
                        }
                        return filterRule(exchange, rules);

                    }).orElse(null);

            final RequestDTO body = exchange.getAttribute(Constants.REQUESTDTO);

            if (Objects.nonNull(rule)) {
                if (rule.getLoged()) {
                    LogUtils.info(LOGGER, () -> {
                        assert body != null;
                        return body.getModule() + ":" + body.getMethod() + "  match  " + named() + "  rule  is name :" + rule.getName();
                    });
                }
                return doExecute(exchange, chain, rule);
            } else {
                //If the divide or dubbo or spring cloud plug-in does not match, return directly
                if (PluginEnum.DIVIDE.getName().equals(named())
                        || PluginEnum.DUBBO.getName().equals(named())
                        || PluginEnum.SPRING_CLOUD.getName().equals(named())) {
                    LogUtils.info(LOGGER, () -> Objects.requireNonNull(body).getModule() + ":" + body.getMethod() + " not match  " + named() + "  rule");
                    final SoulResult error = SoulResult.error(HttpStatus.NOT_FOUND.value(), Constants.UPSTREAM_NOT_FIND);
                    return exchange.getResponse().writeWith(Mono.just(exchange.getResponse().bufferFactory().wrap(Objects.requireNonNull(JSONUtils.toJson(error)).getBytes())));
                }
                return chain.execute(exchange);
            }
        }
        return chain.execute(exchange);
    }

    private Boolean filterSelector(final SelectorZkDTO selector, final ServerWebExchange exchange) {
        if (selector.getType() == SelectorTypeEnum.CUSTOM_FLOW.getCode()) {
            if (CollectionUtils.isEmpty(selector.getConditionZkDTOList())) {
                return false;
            }
            return MatchStrategyFactory.of(selector.getMatchMode())
                    .match(selector.getConditionZkDTOList(), exchange);
        }
        return true;
    }

    private RuleZkDTO filterRule(final ServerWebExchange exchange, final List<RuleZkDTO> rules) {
        return rules.stream()
                .filter(rule -> Objects.nonNull(rule) && rule.getEnabled())
                .filter((RuleZkDTO ruleZkDTO) -> MatchStrategyFactory.of(ruleZkDTO.getMatchMode())
                        .match(ruleZkDTO.getConditionZkDTOList(), exchange))
                .findFirst().orElse(null);
    }
}

```

* doExecute() 需要实现此抽象方法来实现你的特殊定制，当然，你还要开发admin管理后台，这个插件的具体规则是什么？难度比较高，需要对Soul比较熟悉。
