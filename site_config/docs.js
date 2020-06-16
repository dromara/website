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
                        title: '数据配置流程',
                        link: '/zh-cn/docs/soul/config.html',
                    },
                    {
                        title: '数据同步原理',
                        link: '/zh-cn/docs/soul/dataSync.html',
                    },
                    {
                        title: '元数据概念介绍',
                        link: '/zh-cn/docs/soul/metaData.html',
                    },
                    {
                        title: '用户使用文档',
                        opened: true,
                        children: [
                            {
                                title: '搭建soul网关环境',
                                link: '/zh-cn/docs/soul/setup.html',
                            },
                            {
                                title: 'http用户',
                                link: '/zh-cn/docs/soul/user-http.html',
                            },
                            {
                                title: 'dubbo用户',
                                link: '/zh-cn/docs/soul/user-dubbo.html',
                            },
                            {
                                title: 'springCloud用户',
                                link: '/zh-cn/docs/soul/user-springcloud.html',
                            },
                            {
                                title: '选择器规则详解',
                                link: '/zh-cn/docs/soul/selector.html',
                            },
                            {
                                title: '数据同步策略',
                                link: '/zh-cn/docs/soul/user-dataSync.html',
                            },
                            {
                                title: 'divide插件',
                                link: '/zh-cn/docs/soul/plugin-divide.html',
                            },
                            {
                                title: 'dubbo插件',
                                link: '/zh-cn/docs/soul/plugin-dubbo.html',
                            },
                            {
                                title: 'springcloud插件',
                                link: '/zh-cn/docs/soul/plugin-springcloud.html',
                            },
                            {
                                title: 'rateLimiter插件',
                                link: '/zh-cn/docs/soul/plugin-rateLimiter.html',
                            },
                            {
                                title: 'hystrix插件',
                                link: '/zh-cn/docs/soul/plugin-hystrix.html',
                            },
                            {
                                title: 'monitor插件',
                                link: '/zh-cn/docs/soul/plugin-monitor.html',
                            },
                            {
                                title: 'waf插件',
                                link: '/zh-cn/docs/soul/plugin-waf.html',
                            },
                            {
                                title: 'sign插件',
                                link: '/zh-cn/docs/soul/plugin-sign.html',
                            },
                            {
                                title: 'rewrite插件',
                                link: '/zh-cn/docs/soul/plugin-rewrite.html',
                            },
                            {
                                title: 'websocket支持',
                                link: '/zh-cn/docs/soul/plugin-websocket.html',
                            }
                        ],
                    },
                    {
                        title: '开发者文档',
                        opened: true,
                        children: [
                            {
                                title: '自定义filter',
                                link: '/zh-cn/docs/soul/dev-filter.html',
                            },
                            {
                                title: '自定义插件',
                                link: '/zh-cn/docs/soul/dev-plugin.html',
                            },
                            {
                                title: '文件上传下载',
                                link: '/zh-cn/docs/soul/dev-file.html',
                            },
                            {
                                title: '自定义解析IP与host',
                                link: '/zh-cn/docs/soul/dev-iphost.html',
                            },
                            {
                                title: '自定义返回结果',
                                link: '/zh-cn/docs/soul/dev-result.html',
                            },
                            {
                                title: '自定义签名插件算法与验证',
                                link: '/zh-cn/docs/soul/dev-sign.html',
                            },
                            {
                                title: '多语言http客户端接入',
                                link: '/zh-cn/docs/soul/dev-client.html',
                            },
                            {
                                title: '线程模型',
                                link: '/zh-cn/docs/soul/dev-thread.html',
                            },
                            {
                                title: 'soul调优',
                                link: '/zh-cn/docs/soul/dev-netty.html',
                            },
                        ],
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
