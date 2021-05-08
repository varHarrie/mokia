const demo = require('./plugins/demo');

module.exports = {
  locales: {
    '/': {
      lang: 'zh-CN',
      title: 'Mokia',
      description: '一个开箱即用的数据模拟工具。',
    },
  },
  markdown: {
    lineNumbers: true,
  },
  themeConfig: {
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
          '/api/': ['', 'producer'],
        },
      },
    },
  },
  plugins: [['container', demo]],
};
