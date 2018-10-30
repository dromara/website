import React from 'react';

export default {
  'zh-cn': {
    plugins: [
      {
        name: 'Soul',
        brand: {
          briefIntroduction: '高性能,异步响应式，微服务API网关',
          buttons: [
            {
              text: '立即开始',
              link: '/zh-cn/docs/demo1.html',
              type: 'primary',
            },
            {
              text: '查看Gitee',
              link: 'https://gitee.com/shuaiqiyu/soul',
              type: 'normal',
            },
            {
              text: '查看Github',
              link: 'https://github.com/Dromara/soul',
              type: 'normal',
            },
          ],
        },
        introduction: {
          title: 'Soul的介绍',
          desc: '无缝集成dubbo,springcloud,提供丰富的插件功能(限流，熔断),动态路由负载，动态配置策略',
          img: '/img/soul-framework.png',
        },
        features: {
          title: '特性一览',
          list: [
            {
              img: '/img/feature_transpart.png',
              title: '跨语言支持',
              content: '支持各种语言',
            },
            {
              img: '/img/feature_loadbalances.png',
              title: '丰富的插件支持',
              content: '鉴权，限流，熔断，防火墙等插件',
            },
            {
              img: '/img/feature_service.png',
              title: '插件规则动态配置',
              content: '所有的配置规则可以随意调整，动态生效,无需重启',
            },
            {
              img: '/img/feature_hogh.png',
              title: '插件热插拔，易扩展',
              content: '插件热插拔,易扩展',
            }
          ],
        },
        users: {
          title: '用户',
          desc: <span>如果有使用的用户请联系我进行登记（邮箱为:549477611@qq.com）</span>,
          list: [
          ],
        },
      },
      {
        name: 'Hmily',
        brand: {
          briefIntroduction: '高性能,异步分布式事务TCC中间件',
          buttons: [
            {
              text: '立即开始',
              link: '/zh-cn/docs/demo1.html',
              type: 'primary',
            },
            {
              text: '查看Gitee',
              link: 'https://gitee.com/shuaiqiyu/hmily',
              type: 'normal',
            },
            {
              text: '查看Github',
              link: 'https://github.com/yu199195/hmily',
              type: 'normal',
            },
          ],
        },
        introduction: {
          title: 'Hmily介绍',
          desc: '无缝支持多种Rpc(dubbo,springcloud,motan)。多事务日志,序列化方式支持。异步执行高性能。',
          img: '/img/hmily-framework.png',
        },
        features: {
          title: '特性一览',
          list: [
            {
              img: '/img/feature_transpart.png',
              title: '支持多种Rpc',
              content: 'hmily为dubbo,springcloud,motan提供了单独的jar包提供支持',
            },
            {
              img: '/img/feature_loadbalances.png',
              title: '支持Spring-boot-start',
              content: '提供支持spring-boot-start方式启动的jar包',
            },
            {
              img: '/img/feature_service.png',
              title: '支持多种事务日志的存储以及多种序列化方式',
              content: '用户根据参数配置来动态的选择自身需要的方式,达到最优。',
            },
            {
              img: '/img/feature_hogh.png',
              title: '事务日志高性能异步读写',
              content: '采用disruptor框架进行事务日志的异步读写',
            },
            {
              img: '/img/feature_runtime.png',
              title: '异步高性能执行confirm或者cancel方法',
              content: 'hmily采用线程池的方式异步来执行(可配置线程数量)',
            },
            {
              img: '/img/feature_maintenance.png',
              title: '支持内嵌事务，友好解决服务超时分布式事务问题',
              content: '支持rpc的且套调用,解决超时问题',
            },
          ],
        },
        users: {
          title: '用户',
          desc: <span>如果有使用的用户请联系我进行登记（邮箱为:549477611@qq.com）</span>,
          list: [
          ],
        },
      },
      {
        name: 'Raincat',
        brand: {
          briefIntroduction: '二阶段提交分布式事务中间件',
          buttons: [
            {
              text: '立即开始',
              link: '/zh-cn/docs/demo1.html',
              type: 'primary',
            },
            {
              text: '查看Gitee',
              link: 'https://gitee.com/shuaiqiyu/Raincat',
              type: 'normal',
            },
            {
              text: '查看Github',
              link: 'https://github.com/yu199195/Raincat',
              type: 'normal',
            },
          ],
        },
        introduction: {
          title: 'Raincat介绍',
          desc: '基于二阶段提交,本地事务补偿机制来实现强一致性分布式事务中间件',
          img: '/img/raincat-framework.png',
        },
        features: {
          title: '特性一览',
          list: [
            {
              img: '/img/feature_transpart.png',
              title: '支持多种Rpc',
              content: 'raincat为dubbo,springcloud,motan提供了单独的jar包提供支持',
            },
            {
              img: '/img/feature_loadbalances.png',
              title: '支持Spring-boot-start',
              content: '提供支持spring-boot-start方式启动的jar包',
            },
            {
              img: '/img/feature_service.png',
              title: '协调者高可以',
              content: '采用eureka作为注册中心，集群配置，达到服务的高可用，采用redis集群来分布式存储事务数据.',
            },
            {
              img: '/img/feature_hogh.png',
              title: '协调者采用netty通信',
              content: '采用netty与参与者，发起者进行长连接通信',
            },
            {
              img: '/img/feature_runtime.png',
              title: '解决极端情况下事务不一致的情况',
              content: 'raincat采用保存日志的方式，在极端donw机情况下，通过日志来恢复。',
            },
            {
              img: '/img/feature_maintenance.png',
              title: '支持内嵌事务',
              content: '支持rpc的且套调用',
            },
          ],
        },
        users: {
          title: '用户',
          desc: <span>如果有使用的用户请联系我进行登记（邮箱为:549477611@qq.com）</span>,
          list: [
          ],
        },
      },
      {
        name: 'Myth',
        brand: {
          briefIntroduction: '基于可靠消息最终一致性分布式事务框架',
          buttons: [
            {
              text: '立即开始',
              link: '/zh-cn/docs/demo1.html',
              type: 'primary',
            },
            {
              text: '查看Gitee',
              link: 'https://gitee.com/shuaiqiyu/myth',
              type: 'normal',
            },
            {
              text: '查看Github',
              link: 'https://github.com/yu199195/myth',
              type: 'normal',
            },
          ],
        },
        introduction: {
          title: 'Myth介绍',
          desc: '基于可靠消息最终一致性分布式事务框架',
          img: '',
        },
        features: {
          title: '特性一览',
          list: [
            {
              img: '/img/feature_transpart.png',
              title: '支持多种Rpc',
              content: 'Mtyh为dubbo,springcloud,motan提供了单独的jar包提供支持',
            },
            {
              img: '/img/feature_loadbalances.png',
              title: '支持Spring-boot-start',
              content: '提供支持spring-boot-start方式启动的jar包',
            },
            {
              img: '/img/feature_service.png',
              title: '支持多种事务日志的存储以及多种序列化方式',
              content: '用户根据参数配置来动态的选择自身需要的方式,达到最优。',
            },
            {
              img: '/img/feature_hogh.png',
              title: '事务日志高性能异步读写',
              content: '采用disruptor框架进行事务日志的异步读写',
            },
            {
              img: '/img/feature_runtime.png',
              title: '支持各种MQ中间件',
              content: 'jms(activimq),amqp(rabbitmq),kafka,roceketmq',
            }
           
          ],
        },
        users: {
          title: '用户',
          desc: <span>如果有使用的用户请联系我进行登记（邮箱为:549477611@qq.com）</span>,
          list: [
          ],
        },
      }
    ],
  },
  'en-us': {
    plugins: [
      {
        name: 'Soul',
        brand: {
          briefIntroduction: '高性能,异步响应式，微服务API网关',
          buttons: [
            {
              text: '立即开始',
              link: '/zh-cn/docs/demo1.html',
              type: 'primary',
            },
            {
              text: '查看Gitee',
              link: 'https://gitee.com/shuaiqiyu/soul',
              type: 'normal',
            },
            {
              text: '查看Github',
              link: 'https://github.com/Dromara/soul',
              type: 'normal',
            },
          ],
        },
        introduction: {
          title: 'Soul的介绍',
          desc: '无缝集成dubbo,springcloud,提供丰富的插件功能(限流，熔断),动态路由负载，动态配置策略',
          img: '/img/soul-framework.png',
        },
        features: {
          title: '特性一览',
          list: [
            {
              img: '/img/feature_transpart.png',
              title: '跨语言支持',
              content: '支持各种语言',
            },
            {
              img: '/img/feature_loadbalances.png',
              title: '丰富的插件支持',
              content: '鉴权，限流，熔断，防火墙等插件',
            },
            {
              img: '/img/feature_service.png',
              title: '插件规则动态配置',
              content: '所有的配置规则可以随意调整，动态生效,无需重启',
            },
            {
              img: '/img/feature_hogh.png',
              title: '插件热插拔，易扩展',
              content: '插件热插拔,易扩展',
            }
          ],
        },
        users: {
          title: '用户',
          desc: <span>如果有使用的用户请联系我进行登记（邮箱为:549477611@qq.com）</span>,
          list: [
          ],
        },
      },
      {
        name: 'Hmily',
        brand: {
          briefIntroduction: '高性能,异步分布式事务TCC中间件',
          buttons: [
            {
              text: '立即开始',
              link: '/zh-cn/docs/demo1.html',
              type: 'primary',
            },
            {
              text: '查看Gitee',
              link: 'https://gitee.com/shuaiqiyu/hmily',
              type: 'normal',
            },
            {
              text: '查看Github',
              link: 'https://github.com/yu199195/hmily',
              type: 'normal',
            },
          ],
        },
        introduction: {
          title: 'Hmily介绍',
          desc: '无缝支持多种Rpc(dubbo,springcloud,motan)。多事务日志,序列化方式支持。异步执行高性能。',
          img: '/img/hmily-framework.png',
        },
        features: {
          title: '特性一览',
          list: [
            {
              img: '/img/feature_transpart.png',
              title: '支持多种Rpc',
              content: 'hmily为dubbo,springcloud,motan提供了单独的jar包提供支持',
            },
            {
              img: '/img/feature_loadbalances.png',
              title: '支持Spring-boot-start',
              content: '提供支持spring-boot-start方式启动的jar包',
            },
            {
              img: '/img/feature_service.png',
              title: '支持多种事务日志的存储以及多种序列化方式',
              content: '用户根据参数配置来动态的选择自身需要的方式,达到最优。',
            },
            {
              img: '/img/feature_hogh.png',
              title: '事务日志高性能异步读写',
              content: '采用disruptor框架进行事务日志的异步读写',
            },
            {
              img: '/img/feature_runtime.png',
              title: '异步高性能执行confirm或者cancel方法',
              content: 'hmily采用线程池的方式异步来执行(可配置线程数量)',
            },
            {
              img: '/img/feature_maintenance.png',
              title: '支持内嵌事务，友好解决服务超时分布式事务问题',
              content: '支持rpc的且套调用,解决超时问题',
            },
          ],
        },
        users: {
          title: '用户',
          desc: <span>如果有使用的用户请联系我进行登记（邮箱为:549477611@qq.com）</span>,
          list: [
          ],
        },
      },
      {
        name: 'Raincat',
        brand: {
          briefIntroduction: '二阶段提交分布式事务中间件',
          buttons: [
            {
              text: '立即开始',
              link: '/zh-cn/docs/demo1.html',
              type: 'primary',
            },
            {
              text: '查看Gitee',
              link: 'https://gitee.com/shuaiqiyu/Raincat',
              type: 'normal',
            },
            {
              text: '查看Github',
              link: 'https://github.com/yu199195/Raincat',
              type: 'normal',
            },
          ],
        },
        introduction: {
          title: 'Raincat介绍',
          desc: '基于二阶段提交,本地事务补偿机制来实现强一致性分布式事务中间件',
          img: '/img/raincat-framework.png',
        },
        features: {
          title: '特性一览',
          list: [
            {
              img: '/img/feature_transpart.png',
              title: '支持多种Rpc',
              content: 'raincat为dubbo,springcloud,motan提供了单独的jar包提供支持',
            },
            {
              img: '/img/feature_loadbalances.png',
              title: '支持Spring-boot-start',
              content: '提供支持spring-boot-start方式启动的jar包',
            },
            {
              img: '/img/feature_service.png',
              title: '协调者高可以',
              content: '采用eureka作为注册中心，集群配置，达到服务的高可用，采用redis集群来分布式存储事务数据.',
            },
            {
              img: '/img/feature_hogh.png',
              title: '协调者采用netty通信',
              content: '采用netty与参与者，发起者进行长连接通信',
            },
            {
              img: '/img/feature_runtime.png',
              title: '解决极端情况下事务不一致的情况',
              content: 'raincat采用保存日志的方式，在极端donw机情况下，通过日志来恢复。',
            },
            {
              img: '/img/feature_maintenance.png',
              title: '支持内嵌事务',
              content: '支持rpc的且套调用',
            },
          ],
        },
        users: {
          title: '用户',
          desc: <span>如果有使用的用户请联系我进行登记（邮箱为:549477611@qq.com）</span>,
          list: [
          ],
        },
      },
      {
        name: 'Myth',
        brand: {
          briefIntroduction: '基于可靠消息最终一致性分布式事务框架',
          buttons: [
            {
              text: '立即开始',
              link: '/zh-cn/docs/demo1.html',
              type: 'primary',
            },
            {
              text: '查看Gitee',
              link: 'https://gitee.com/shuaiqiyu/myth',
              type: 'normal',
            },
            {
              text: '查看Github',
              link: 'https://github.com/yu199195/myth',
              type: 'normal',
            },
          ],
        },
        introduction: {
          title: 'Myth介绍',
          desc: '基于可靠消息最终一致性分布式事务框架',
          img: '',
        },
        features: {
          title: '特性一览',
          list: [
            {
              img: '/img/feature_transpart.png',
              title: '支持多种Rpc',
              content: 'Mtyh为dubbo,springcloud,motan提供了单独的jar包提供支持',
            },
            {
              img: '/img/feature_loadbalances.png',
              title: '支持Spring-boot-start',
              content: '提供支持spring-boot-start方式启动的jar包',
            },
            {
              img: '/img/feature_service.png',
              title: '支持多种事务日志的存储以及多种序列化方式',
              content: '用户根据参数配置来动态的选择自身需要的方式,达到最优。',
            },
            {
              img: '/img/feature_hogh.png',
              title: '事务日志高性能异步读写',
              content: '采用disruptor框架进行事务日志的异步读写',
            },
            {
              img: '/img/feature_runtime.png',
              title: '支持各种MQ中间件',
              content: 'jms(activimq),amqp(rabbitmq),kafka,roceketmq',
            }
           
          ],
        },
        users: {
          title: '用户',
          desc: <span>如果有使用的用户请联系我进行登记（邮箱为:549477611@qq.com）</span>,
          list: [
          ],
        },
      }
    ],
  }
};
