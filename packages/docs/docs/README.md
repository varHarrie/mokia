---
home: true
heroImage: /logo.png
actionText: 快速上手 →
actionLink: /guide/
features:
  - title: 数据模拟
    details: 提供大量 mock 函数，支持生成数字、文本、日期、颜色、图片等数据。
  - title: 本地服务器
    details: 通过编写简单的配置文件，可以轻轻松松启动一个逼真的 mock 服务器。
  - title: 组合式配置
    details: 基于JS语法和特性，提供对象组合、类组合方式，方便复用和维护。
footer: MIT Licensed | Copyright © 2019-present varHarrie
---

<style>
.home .hero img {
  width: 100px;
}
</style>

### 开箱即用

安装`mokia`

```bash
npm install --save mokia
```

创建入口文件（index.js）：

```javascript
const mock = require('mokia');

module.exports = {
  port: 3000,
  'GET /users': mock.list({ id: mock.uuid(), name: mock.fullName() }),
  'GET /users/:id': (req) => ({ id: req.params.id, name: mock.fullName() }),
};
```

启动服务器

```bash
npx @mokia/cli index.js
```
