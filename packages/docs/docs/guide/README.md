# 介绍

Mokia 是一套开箱即用的数据模拟工具，为前后端分离应用提供一个简单便捷、灵活实用的拟真服务端程序。

## 特性

- 拥有丰富的数据[生成器（producer）](/mokia/guide/concepts.html#生成器-producer)，可供生成各类常见场景下的假数据
- 基于 JS 对象的[模拟数据结构（schema）](/mokia/guide/concepts.html#模拟数据结构-schema)，方便生成复杂的数据结构
- 小巧灵活的[模拟服务端程序（server）](#服务端程序-mokia-server)，零后端开发基础也能轻松使用
- 简单易用的[命令行交互程序（CLI）](#命令行交互程序-mokia-cli)，提供一个配置文件就可以跑起服务端程序
- 基于 TypeScript，为 IDE 提供类型推导的支持

## 基本用法

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

::: warning
需要注意的是，这里的路由方法不能使用箭头函数代替，否则`this`将无法访问生成器函数。
:::

## 进阶用法

为了便于维护和代码复用，可以使用`TypeScript`和`ES6 Class`方式编写数据结构：

```typescript
// index.ts

import mokia from 'mokia';

class User {
  @mokia.uuid()
  id: string;

  @mokia.fullName()
  name: string;

  constructor(id?: string) {
    if (id) this.id = id;
  }
}

class Article {
  @mokia.uuid()
  id: string;

  @mokia.generate(User)
  author: User;

  @mokia.passage()
  content: string;

  constructor(id?: string) {
    if (id) this.id = id;
  }
}

export default mokia.defineConfig({
  port: 3000,
  'GET /users': mokia.list(User),
  'GET /users/:id': (req) => new User(req.params.id),
  'GET /articles': mokia.list(Article),
  'GET /articles/:id': (req) => new Article(req.params.id),
});
```

使用这种方式，你需要将`mokia`安装到你的项目依赖中：

```bash
npm install mokia --save
```

然后将以下命令添加到`package.json`的`scripts`中：

```json
{
  "scripts": {
    "mock": "mokia index.ts --watch"
  }
}
```

这样就可以通过 npm 命令启动服务器了：

```bash
npm run mock
```
