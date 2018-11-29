export default {
  'en-us': {
    sidemenu: [
      {
        title: 'header title',
        children: [
          {
            title: 'demo1',
            link: '/en-us/docs/demo1.html',
          },
          {
            title: 'demo2',
            link: '/en-us/docs/demo2.html',
          },
          {
            title: 'dir',
            opened: true,
            children: [
              {
                title: 'demo3',
                link: '/en-us/docs/dir/demo3.html',
              },
            ],
          },
        ],
      },
    ],
    barText: 'Documentation',
  },
  'zh-cn': {
    sidemenu: [
      {
        title: 'Soul',
        children: [
          {
            title: 'soul介绍',
            link: '/zh-cn/docs/soul/soul.html',
          },
          {
            title: '数据库设计',
            link: '/zh-cn/docs/soul/db.html',
          },
          {
            title: '配置中心设计',
            link: '/zh-cn/docs/soul/config.html',
          },
          {
            title: '请求参数设计',
            link: '/zh-cn/docs/soul/request.html',
          },
          {
            title: '选择器规则设计',
            link: '/zh-cn/docs/soul/selector.html',
          },
          {
            title: '前置过滤器设计',
            link: '/zh-cn/docs/soul/preFilter.html',
          },
          {
            title: '插件介绍',
            opened: true,
            children: [
              {
                title: 'divide插件',
                link: '/zh-cn/docs/soul/divide.html',
              },
              {
                title: 'dubbo插件',
                link: '/zh-cn/docs/soul/dubbo.html',
              },
              {
                title: 'springcloud插件',
                link: '/zh-cn/docs/soul/springcloud.html',
              },
              {
                title: 'rateLimiter插件',
                link: '/zh-cn/docs/soul/rateLimiter.html',
              },
              {
                title: 'monitor插件',
                link: '/zh-cn/docs/soul/monitor.html',
              },
              {
                title: 'waf插件',
                link: '/zh-cn/docs/soul/waf.html',
              },
              {
                title: 'sign插件',
                link: '/zh-cn/docs/soul/sign.html',
              },
              {
                title: 'rewrite插件',
                link: '/zh-cn/docs/soul/rewrite.html',
              }
            ],
          },
          {
            title: '部署文档',
            opened: true,
            children: [
              {
                title: '部署admin',
                link: '/zh-cn/docs/soul/admin.html',
              },
              {
                title: '部署server',
                link: '/zh-cn/docs/soul/server.html',
              },
            ],
          },
          {
            title: '使用手册',
            link: '/zh-cn/docs/soul/http.html',
          },
          {
            title: '扩展文档',
            link: '/zh-cn/docs/soul/extend.html',
          },
        ],
      },
      {
        title: 'Hmily',
        children: [
          {
            title: '介绍文档',
            link: '/zh-cn/docs/hmily/index.html',
          },
          {
            title: '配置详解',
            link: '/zh-cn/docs/hmily/configuration.html',
          },
          {
            title: '启动admin',
            link: '/zh-cn/docs/hmily/admin.html',
          },
          {
            title: '用户文档',
            opened: true,
            children: [
              {
                title: 'dubbo用户',
                link: '/zh-cn/docs/hmily/user-dubbo.html',
              },
              {
                title: 'motan用户',
                link: '/zh-cn/docs/hmily/user-motan.html',
              },
              {
                title: 'springcloud用户',
                link: '/zh-cn/docs/hmily/user-springcloud.html',
              }
            ],
          },
          {
            title: '快速体验',
            opened: true,
            children: [
              {
                title: 'quick-start-dubbo',
                link: '/zh-cn/docs/hmily/quick-start-dubbo.html',
              },
              {
                title: 'quick-start-springcloud',
                link: '/zh-cn/docs/hmily/quick-start-springcloud.html',
              }
            ],
          },
        ],
      },
      {
        title: 'raincat',
        children: [
          {
            title: '介绍文档',
            link: '/zh-cn/docs/raincat/index.html',
          },
          {
            title: '启动raincat-manager',
            link: '/zh-cn/docs/raincat/start-manager.html',
          },
          {
            title: '配置详解',
            link: '/zh-cn/docs/raincat/config.html',
          },
          {
            title: '启动admin',
            link: '/zh-cn/docs/raincat/admin.html',
          },
          {
            title: '用户文档',
            opened: true,
            children: [
              {
                title: 'dubbo用户',
                link: '/zh-cn/docs/raincat/user-dubbo.html',
              },
              {
                title: 'motan用户',
                link: '/zh-cn/docs/raincat/user-motan.html',
              },
              {
                title: 'springcloud用户',
                link: '/zh-cn/docs/raincat/user-springcloud.html',
              }
            ],
          },
          {
            title: '快速体验',
            opened: true,
            children: [
              {
                title: 'quick-start-dubbo',
                link: '/zh-cn/docs/raincat/quick-start-dubbo.html',
              },
              {
                title: 'quick-start-springcloud',
                link: '/zh-cn/docs/raincat/quick-start-springcloud.html',
              }
            ],
          },
      
        ],
      },
      {
        title: 'myth',
        children: [
          {
            title: '介绍文档',
            link: '/zh-cn/docs/myth/index.html',
          },
        ],
      }
    ],
    barText: '文档',
  },
};
