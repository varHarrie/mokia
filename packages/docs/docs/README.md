---
home: true
heroImage: /logo.png
actionText: 快速上手 →
actionLink: /guide/
features:
  - title: 数据模拟
    details: 提供大量 mock 函数，支持生成数字、文本、日期、颜色、图片等，还支持嵌套、组合等结构复杂的数据。
  - title: 本地服务器
    details: 开发者无需关注服务器逻辑，通过命令就可以快速启动一个拟真的本地 mock 服务器。
  - title: 配置文件
    details: 基于JavaScript的配置文件，配合IDE的支持，可以很轻松地进行管理和维护。
footer: MIT Licensed | Copyright © 2019-present varHarrie
---

<style>
.home .hero img {
  width: 100px;
}
</style>

### 开箱即用

创建入口文件（index.js）：

```javascript
module.exports = {
  port: 3000,
  'GET /users'() {
    return this.list(() => ({ id: this.uuid(), name: this.fullName() }));
  },
  'GET /users/:id'(req) {
    return { id: req.params.id, name: this.fullName() };
  },
};
```

启动本地服务器：

```bash
npx mokia index.js --watch
```

打开浏览器进入[http://localhost:3000/users](http://localhost:3000/users)，你就能看到响应信息了。
