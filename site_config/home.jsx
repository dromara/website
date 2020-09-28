import React from 'react';

export default {
  'zh-cn': {
    plugins: [
      {
        name: 'Soul',
        brand: {
          briefIntroduction: '高性能微服务API网关',
          buttons: [
            {
              text: '立即开始',
              link: '/zh-cn/docs/soul/soul.html',
              type: 'primary',
            },
            {
              text: '查看Gitee',
              link: 'https://gitee.com/shuaiqiyu/soul',
              type: 'normal',
            },
            {
              text: '查看Github',
              link: 'https://github.com/dromara/soul',
              type: 'normal',
            },
          ],
        },
        introduction: {
          title: 'Soul的介绍',
          desc: 'Soul是一个异步高性能,跨语言,响应式的API网关,提供了统一的HTTP访问,无缝支持dubbo,spring-cloud,http并且提供了丰富的插件(限流,熔断,代理转发)',
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
              title: '插件热插拔，易扩展，支持用户自定义开发',
              content: '插件热插拔,易扩展，支持用户自定义开发',
            },
            {
              img: '/img/feature_maintenance.png',
              title: '无缝支持Dubbo，SpringCloud，HTTP REST',
              content: '无缝支持Dubbo，SpringCloud，HTTP REST',
            },
            {
              img: '/img/feature_runtime.png',
              title: '高可用,高并发',
              content: '支持集群部署',
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
        name: 'Hmily',
        brand: {
          briefIntroduction: '金融级分布式事务解决方案',
          buttons: [
            {
              text: '立即开始',
              link: '/zh-cn/docs/hmily/index.html',
              type: 'primary',
            },
            {
              text: '查看Gitee',
              link: 'https://gitee.com/shuaiqiyu/hmily',
              type: 'normal',
            },
            {
              text: '查看Github',
              link: 'https://github.com/dromara/hmily',
              type: 'normal',
            },
          ],
        },
        introduction: {
          title: 'Hmily介绍',
          desc: 'Hmily是一款高性能，零侵入，金融级分布式事务解决方案，目前主要提供柔性事务的支持，包含 TCC, TAC(自动生成回滚SQL) 方案，未来还会支持 XA 等方案',
          img: '/img/hmily-framework.png',
        },
        features: {
          title: '特性一览',
          list: [
            {
              img: '/img/feature_transpart.png',
              title: '高可靠性',
              content: '支持分布式场景下，事务异常回滚，超时异常恢复，防止事务悬挂',
            },
            {
              img: '/img/feature_loadbalances.png',
              title: '易用性',
              content: '提供零侵入性式的 Spring-Boot, Spring-Namespace 快速与业务系统集成',
            },
            {
              img: '/img/feature_service.png',
              title: '高性能 ',
              content: '去中心化设计，与业务系统完全融合，天然支持集群部署',
            },
            {
              img: '/img/feature_hogh.png',
              title: '多种RPC支持',
              content: 'Dubbo, SpringCloud,Montan, brpc, tars 等知名RPC框架',
            },
            {
              img: '/img/feature_runtime.png',
              title: '可观测性',
              content: 'Metrics多项指标性能监控，以及admin管理后台UI展示',
            },
            {
              img: '/img/feature_maintenance.png',
              title: '多种日志存储',
              content: 'mysql, oracle, mongodb, redis, zookeeper 等方式',
            },
            {
              img: '/img/feature_maintenance.png',
              title: '复杂场景',
              content: '支持RPC嵌套调用事务',
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
          briefIntroduction: '强一致分布式事务框架',
          buttons: [
            {
              text: '立即开始',
              link: '/zh-cn/docs/raincat/index.html',
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
          desc: 'Raincat是基于二阶段提交+本地事务补偿机制来实现的强一致性分布式事务框架。无缝支持dubbo,motan,springcloud等Rpc框架的微服务。',
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
              title: '高可用的协调者',
              content: '采用eureka作为注册中心，可集群部署，达到服务的高可用，采用redis集群来分布式存储事务数据.',
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
          briefIntroduction: '可靠消息分布式事务框架',
          buttons: [
            {
              text: '立即开始',
              link: '/zh-cn/docs/myth/index.html',
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
          desc: 'Myth是基于可靠消息最终一致性分布式事务框架，无缝支持dubbo，springcloud,motan等rpc框架的微服务',
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
      }
    ],
  },
  'en-us': {
    plugins: [
      {
        name: 'Soul',
        brand: {
          briefIntroduction: '异步响应式               微服务1API网关',
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
          desc: 'Soul是一个异步的,高性能的,跨语言的,响应式的API网关,提供了统一的HTTP访问,无缝支持dubbo,Springcloud,并且提供了丰富的插件(限流,熔断,代理转发)',
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
            },
            {
              img: '/img/feature_maintenance.png',
              title: '无缝支持Dubbo，SrpingCloud，HTTP REST',
              content: '无缝支持Dubbo，SrpingCloud，HTTP REST',
            },
            {
              img: '/img/feature_runtime.png',
              title: '高可用,高并发',
              content: '支持集群部署',
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
        name: 'Hmily',
        brand: {
          briefIntroduction: '高性能异步TCC 分布式事务框架',
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
          desc: 'Hmily是高性能分布式事务tcc开源框架。基于java语言来开发（JDK1.8），无缝支持dubbo，springcloud,motan等rpc框架进行分布式事务。',
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
          briefIntroduction: '二阶段提交  分布式事务框架',
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
          desc: 'Raincat是基于二阶段提交+本地事务补偿机制来实现的强一致性分布式事务框架。无缝支持dubbo,motan,springcloud等Rpc框架的微服务。',
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
              title: '高可用的协调者',
              content: '采用eureka作为注册中心，可集群部署，达到服务的高可用，采用redis集群来分布式存储事务数据.',
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
          briefIntroduction: '可靠消息最终一致性 分布式事务框架',
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
          desc: 'Myth是基于可靠消息最终一致性分布式事务框架，无缝支持dubbo，springcloud,motan等rpc框架的微服务',
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
      }
    ],
  },
};
