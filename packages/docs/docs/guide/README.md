# 指南

## 介绍

Mokia 是一个开箱即用的数据模拟工具，提供了一系列的数据模拟函数和一个服务端程序。

## 特性

- 丰富的数据[生成器（producer）](#生成器-producer)
- 基于 JS 对象的[模拟数据结构（schema）](#模拟数据结构-schema)
- 简单但功能丰富的服务端程序（server）

## 概念

### 生成器（producer）

本质上，生成器就是用于生成各种数据类型的函数，如：

```javascript
import * as producer from '@mokia/producer';

producer.boolean(); // 生成随机布尔值
producer.integer(); // 生成随机整型
producer.fullName(); // 生成随机英文名
producer.date(); // 生成随机日期字符串
```

通常为了生成特定范围的值，这些生成器函数会有多个重载，如`integer()`、`integer(max)`、`integer(min, max)`。

所有内置的生成器均已拆分至独立的包`@mokia/producer`，你可以在 API 文档中查看。

### 装饰器（decorator）

同样也是函数，每个内置的生成器都对应着一个装饰器函数，执行装饰器函数并不会返回生成器的结果，而是得到一个返回生成器结果的函数：

```javascript
import * as decorator from '@mokia/decorator';
import * as producer from '@mokia/producer';

const foo = decorator.integer(max); // 返回一个函数：() => number
// 等价于
const foo = (max) => producer.integer(max);
```

装饰器函数与对应的生成器函数一样，拥有多个重载，接收的参数将会被缓存起来，每次结果函数被执行时，都会  以这些参数作为生成器的参数来执行。

装饰器函数通常用于定义[模拟数据结构（schema）](#模拟数据结构-schema)，以便生成复杂的模拟数据。

除此之外，其返回值也可以当作 TS 属性装饰器使用：

```typescript
class User {
  @decorator.fullName()
  name: string;
}

const user = new User();
console.log(user.name); // 随机的英文名
```

### 模拟数据结构（schema）
