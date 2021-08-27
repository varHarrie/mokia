# 指南

## 介绍

Mokia 是一套开箱即用的数据模拟工具，为前后端分离应用提供一个简单便捷、灵活实用的拟真服务端程序。

## 特性

- 丰富的数据[生成器（producer）](#生成器-producer)
- 基于 JS 对象的[模拟数据结构（schema）](#模拟数据结构-schema)
- 小巧灵活的[模拟服务端程序（server）](#服务端程序-mokia-server)
- 简单易用的[命令行交互程序（CLI）](#命令行交互程序-mokia-cli)

## 基本用法

安装`mokia`

```bash
npm install --save mokia
# or
yarn add mokia
```

创建入口文件（index.js）：

```javascript
const mokia = require('mokia');

module.exports = {
  port: 3000,
  'GET /users': mokia.list({ id: mokia.uuid(), name: mokia.fullName() }),
  'GET /users/:id': (req) => ({ id: req.params.id, name: mokia.fullName() }),
};
```

添加到 package.json 的 scripts 中：

```json
{
  "scripts": {
    "mock": "mokia index.js"
  }
}
```

启动服务器

```bash
npm run mock
```

> 或者，你也可以直接使用命令`npx mokia index.js`启动服务器。

## 类型推导

mokia 完全基于[TypeScript](https://www.typescriptlang.org/)进行开发，同时提供了`defineConfig`函数，用于 IDE 工具的支持，以提供更完整的类型推导开发体验。

```javascript
const mokia = require('mokia');

module.exports = mokia.defineConfig({
  port: 3000,
  'GET /users/:id': (req) => ({ id: req.params.id, name: mokia.fullName() }),
});
```

## 深入了解

mokia 主要围绕以下几个概念进行工作：

- 生成器（producer）
- 装饰器（decorator）
- 模拟数据结构（schema）

### 生成器（producer）

本质上，生成器就是用于生成各种数据类型的函数，它们执行后会立即返回结果，如：

```javascript
import mokia from 'mokia';

mokia.producer.boolean(); // 生成随机布尔值
mokia.producer.integer(); // 生成随机整型
mokia.producer.fullName(); // 生成随机英文名
mokia.producer.date(); // 生成随机日期字符串
```

通常为了生成特定范围的值，这些生成器函数会有多个重载，如`integer()`、`integer(max)`、`integer(min, max)`。

> 所有内置的生成器由一个独立的包[@mokia/producer](https://www.npmjs.com/package/@mokia/producer)提供，可以单独安装使用，你可以在 [API 文档](/mokia/api/producer)中查看。

### 装饰器（decorator）

装饰器也是函数，每个内置的生成器都对应着一个装饰器函数，执行装饰器函数并不会立即返回生成器的结果，而是得到一个返回生成器结果的函数：

```javascript
import mokia from 'mokia';

const int = mokia.integer(max); // 返回一个函数：() => number
// 等价于
const int = () => mokia.producer.integer(max);
```

装饰器函数与对应的生成器函数一样，拥有多个重载，接收的参数将会被缓存起来，每次结果函数被执行时，都会将这些参数作为生成器的参数来执行。

依赖于这一特性，装饰器函数通常用于定义[模拟数据结构（schema）](#模拟数据结构-schema)，以便生成结构复杂的模拟数据。

除此之外，其返回值也可以当作 TS 的属性装饰器使用：

```typescript
import mokia from 'mokia';

class User {
  @mokia.fullName()
  name: string;
}

const user = new User();
console.log(user.name); // 随机的英文名
```

> 所有内置的装饰器由一个独立的包[@mokia/decorator](https://www.npmjs.com/package/@mokia/decorator)提供，可以单独安装使用。

### 模拟数据结构（schema）

对于实际的业务场景，单纯使用生成器来产生模拟数据是远远不够的，真实的接口数据往往由不同的数据嵌套、组合形成，这时我们可以定义模拟数据结构来生成更加复杂的数据。

实际上，模拟数据结构就是普通的 JS 对象，通过传入`generate`生成器，就可以根据对象结构来生成模拟数据：

:::demo 基本类型、对象

```javascript
producer.generate({
  num: 1,
  bool: true,
  str: 'string',
  obj: {
    null: null,
    undefined: undefined,
  },
});
```

:::

:::demo 函数

```javascript
producer.generate({
  foo: () => Math.random(),
  nested: {
    nested: {
      value: () => Math.random(),
    },
  },
});
```

:::

:::demo 数组

```javascript
producer.generate({
  arr: [
    1,
    () => Math.random(),
    {
      foo: () => Math.random(),
    },
    [() => Math.random()],
  ],
});
```

:::

当传入对象的属性值为不同类型时，有不同的生成逻辑：

- 当值为`基本类型`时，返回当前值
- 当值为`函数`时，返回函数执行结果
- 当值为`对象`时，执行`generate(obj)`，并返回结果
- 当值类`数组`时，遍历每一项执行`generate(item)`，并返回结果

正因为 decorator 也是函数，所以可以参与模拟数据结构的定义：

:::demo 装饰器

```javascript
producer.generate({
  name: mokia.fullName(),
  birthday: mokia.birthday(),
  email: mokia.email(),
  homepage: mokia.url(),
});
```

:::

## 整合包（mokia）

上面提到的几个概念，虽然技术实现分离到不同的包中， 但在实际使用中，我们通常只需引用一个整合的包——`mokia`：

```diff
- import * as decorator from '@mokia/decorator';
- import * as producer from '@mokia/producer';
+ import mokia from 'mokia';

// 调用decorator
- decorator.boolean();
+ mokia.boolean();

// 调用producer
- producer.boolean();
+ mokia.producer.boolean();

// 作为函数调用
- producer.generate({ foo: decorator.boolean() });
+ mokia({ foo: mokia.boolean() });
```

## 服务端程序（@mokia/server）

基于[express](https://expressjs.com/)封装了一个小巧的服务端程序，可以创建一个以 JS 对象为路由配置的 Node 服务端。

```javascript
import { createServer } from '@mokia/server';

const config = {
  port: 3000,
  'GET /hello': () => {
    message: 'Hello World';
  },
};

const [app, destroy] = await createServer(config);

console.log(app); // http.Server实例
console.log(destroy); // 销毁函数
```

config 可支持的具体参数查看[createServer](/mokia/api/server#ServerConfig)。

## 命令行交互程序（@mokia/cli）

通过命令行交互程序，用户可以完全忽略服务端启动的相关逻辑，只需编写配置文件，就可以快速地创建模拟服务端程序。

创建配置入口文件（index.js）：

```javascript
module.exports = {
  port: 3000,
  'GET /hello': () => {
    message: 'Hello World';
  },
};
```

通过命令启动服务器：

```bash
npx mokia index.js
```

> [mokia](#整合包-mokia) 本身已集成了该功能。
