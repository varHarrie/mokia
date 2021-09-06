const demo = require('./plugins/demo');

module.exports = {
  base: '/mokia/',
  port: 3000,
  locales: {
    '/': {
      lang: 'zh-CN',
      title: 'Mokia',
      description: '一个开箱即用的API模拟服务器，帮助快速创建后端原型和数据模拟。',
    },
  },
  themeConfig: {
    logo: '/logo.png',
    locales: {
      '/': {
        label: '简体中文',
        selectText: '选择语言',
        nav: [
          { text: '指南', link: '/guide/' },
          { text: 'API', link: '/api/' },
          { text: 'Changelog', link: 'https://github.com/varHarrie/mokia/blob/master/CHANGELOG.md' },
          { text: 'GitHub', link: 'https://github.com/varHarrie/mokia' },
        ],
        sidebar: {
          '/guide/': [
            {
              title: '基础',
              collapsable: false,
              children: [
                { title: '介绍', path: '/guide/' },
                { title: '概念', path: '/guide/concepts' },
              ],
            },
            {
              title: '进阶',
              collapsable: false,
              children: [
                { title: '服务器配置', path: '/guide/config' },
                { title: '命令行交互程序', path: '/guide/cli' },
              ],
            },
          ],
          '/api/': ['', 'producer', 'decorator', 'server', 'mokia'],
        },
      },
    },
  },
  plugins: [['container', demo]],
};
