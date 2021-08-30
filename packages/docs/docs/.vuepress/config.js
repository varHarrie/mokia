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
        nav: [
          { text: '指南', link: '/guide/' },
          { text: 'API', link: '/api/' },
          { text: 'Changelog', link: 'https://github.com/varHarrie/mokia/blob/master/CHANGELOG.md' },
          { text: 'GitHub', link: 'https://github.com/varHarrie/mokia' },
        ],
        sidebar: {
          '/guide/': 'auto',
          '/api/': ['', 'producer', 'decorator', 'server', 'mokia'],
        },
      },
    },
  },
  plugins: [['container', demo]],
};
