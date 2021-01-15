// 全局的一些配置
export default {
  rootPath: '', // 发布到服务器的根目录，需以/开头但不能有尾/，如果只有/，请填写空字符串
  port: 8085, // 本地开发服务器的启动端口
  domain: 'dromara.org', // 站点部署域名，无需协议和path等
  defaultSearch: 'google', // 默认搜索引擎，baidu或者google
  defaultLanguage: 'en-us',
  'en-us': {
    pageMenu: [
      {
        key: 'droamra',
        text: 'Home',
        link: '/en-us/index.html',
      },
      {
        key: 'docs',
        text: 'Document',
        subMenus: [
          {
            text: 'Soul',
            link: '/en-us/docs/soul/soul.html'
          },{
            text: 'Hmily',
            link: '/en-us/docs/hmily/index.html'
          }
        ],
      },
      {
        key: 'blog',
        text: 'Blog',
        link: '/en-us/blog/index.html',
      },
      {
        key: 'community',
        text: 'Community',
        link: '/en-us/community/index.html',
      },
    ],
    disclaimer: {
      title: 'Disclaimer',
      content: 'Any unit or individual reprint all relevant information of this website, please indicate the source.',
    },
    documentation: {
      title: 'Document',
      list: [
        {
          text: 'Overview ',
          link: '/en-us/docs/soul/soul.html',
        },
        {
          text: 'Stat up',
          link: '/en-us/docs/soul/soul.html',
        },
        {
          text: 'Developer Guide',
          link: '/en-us/docs/soul/soul.html',
        },
      ],
    },
    resources: {
      title: 'Resource',
      list: [
        {
          text: 'Blog',
          link: '/en-us/blog/index.html',
        },
        {
          text: 'Community',
          link: '/en-us/community/index.html',
        },
      ],
    },
    copyright: 'Copyright ©2020 xiaoyu@apache.org by xiaoyu',
  },
  'zh-cn': {
    pageMenu: [
      {
        key: 'droamra',
        text: '首页',
        link: '/zh-cn/index.html',
      },
      {
        key: 'docs',
        text: '文档',
        subMenus: [
          {
            text: 'Soul',
            link: '/zh-cn/docs/soul/soul.html'
          },{
            text: 'Hmily',
            link: '/zh-cn/docs/hmily/index.html'
          }
        ]
      },
      {
        key: 'blog',
        text: '博客',
        link: '/zh-cn/blog/index.html',
      },
      {
        key: 'community',
        text: '社区',
        link: '/zh-cn/community/index.html',
      },
    ],
    disclaimer: {
      title: '免责声明',
      content: '任何单位或个人转载本网站的所有相关信息，请注明来源。',
    },
    documentation: {
      title: '文档',
      list: [
        {
          text: '概览',
          link: '/zh-cn/docs/soul/soul.html',
        },
        {
          text: '快速开始',
          link: '/zh-cn/docs/soul/soul.html',
        },
        {
          text: '开发者指南',
          link: '/zh-cn/docs/soul/soul.html',
        },
      ],
    },
    resources: {
      title: '资源',
      list: [
        {
          text: '博客',
          link: '/zh-cn/blog/index.html',
        },
        {
          text: '社区',
          link: '/zh-cn/community/index.html',
        },
      ],
    },
    copyright: 'Copyright ©2020 xiaoyu@apache.org by xiaoyu',
  },
};
