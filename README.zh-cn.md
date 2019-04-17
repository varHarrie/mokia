# Mokia

一个集成了数据模拟和HTTP服务的Mock工具。

## 特性

- 🤟 简单易用
- 🔄 模型可复用
- 💎 支持TypeScript

## 基本用法

1. 安装`mokia`：

  ```bash
  $ npm install mokia --save-dev
  # 或者
  $ yarn add mokia --dev
  ```

2. 添加一个文件，比如“mock.ts”：

  ```typescript
  import { mock, PORT, ServerConfig } from 'mokia'

  const config: ServerConfig = {
    [PORT]: 3000,
    'GET /users': () => {
      return {
        users: mock.array({
          id: mock.uuid(),
          name: mock.fullName()
        }, 0, 5)
      }
    },
    'GET /users/:id': () => {
      return {
        id: mock.uuid(),
        name: mock.fullName()
      }
    }
  }

  export default config
  ```

3. 添加运行脚本到`package.json`：

  ```json
  "scripts": {
    "mock": "mokia mock.ts",
  }
  ```

4. 运行脚本`npm run mock`。

## 进阶用法

为了较少重复代码和保持代码复用性，我们推荐使用Class风格书写：

```typescript
import { decorators, mock, PORT, ServerConfig } from 'mokia'

class User {
  @decorators.uuid()
  id: string

  @decorators.fullName()
  name: string
}

const config: ServerConfig = {
  [PORT]: 3000,
  'GET /users': () => {
    return {
      users: mock.array(User, 0, 5)
    }
  },
  'GET /users/:id': () => {
    return mock(User)
  }
}

export default config
```

## APIs

### 服务器配置参数：

  - `HOST` 服务器主机，默认为`'localhost'`
  - `PORT` 服务器端口号，默认为`8080`
  - `PREFIX` URL前缀，默认为`''`
  - `PRIORITY` 首选地址，所有请求会优先重定向到该地址，默认为`''`
  - `SILENT` 是否隐藏请求日志，默认为`false`

  注意：这些参数传入时都不是字符串，而是`Symbol`，你应该从`mokia`包中引入。

  ```typescript
  import { HOST, PORT, PREFIX, PRIORITY, SILENT } from 'mokia'

  export default {
    [HOST]: 'localhost',
    [PORT]: 3000,
    [PREFIX]: '/apis',
    [PRIORITY]: 'http://another.domain.com',
    [SILENT]: true,
    // ...
  }
  ```

### 生成器

  所有生成器都可以作为函数或装饰器直接使用。

- 基础
  - boolean(chance?: number, value?: boolean): boolean
  - integer(max?: number): number
  - integer(min: number, max: number): number
  - natural(max?: number): number
  - natural(min: number, max: number): number
  - float(max?: number): number
  - float(min: number, max, fixed?): number
  - float(min: number, max, dmin: number, dmax: number): number
  - char(pool: string): string
  - string(pool: string, length?: number): string
  - string(pool: string, min: number, max: number): string

- 复合
  - generate(mockable: Object | Function): any
  - array(proto: any, length?: number): any[]
  - array(proto: any, min: number, max: number): any[]
  - oneOf(list: any[]): any
  - manyOf(list: any[], length?: number): any[]
  - manyOf(list: any[], min: number, max: number): any[]
  - pick(proto: Object, length?: number): Object
  - pick(proto: Object, props: string | string[]): Object
  - pick(proto: Object, min: number, max: number): Object

- 日期
  - datetime(format?: string): string
  - datetime(format: string, max: DateType): string
  - datetime(format: string, min: DateType, max: DateType): string
  - date(format?: string): string
  - date(format: string, max: DateType): string
  - date(format: string, min: DateType, max: DateType): string
  - time(format?: string): string
  - time(format: string, max: DateType): string
  - time(format: string, min: DateType, max: DateType): string
  - now(format?: string): string

- 图片
  - image(size?: string, text?: string, background?: string, foreground?: string, format?: string): string
  - dataImage(size?: string, text?: string, background?: string, foreground?: string, format?: string): string

- 文本
  - word(length?: number): string
  - word(min: number, max: number): string
  - title(length?: number): string
  - title(min: number, max: number): string
  - sentence(length?: number): string
  - sentence(min: number, max: number): string
  - paragraph(length?: number): string
  - paragraph(min: number, max: number): string
  - passage(length?: number): string
  - passage(min: number, max: number): string
  - zh.word(length?: number): string
  - zh.word(min: number, max: number): string
  - zh.title(length?: number): string
  - zh.title(min: number, max: number): string
  - zh.sentence(length?: number): string
  - zh.sentence(min: number, max: number): string
  - zh.paragraph(length?: number): string
  - zh.paragraph(min: number, max: number): string
  - zh.passage(length?: number): string
  - zh.passage(min: number, max: number): string

- 颜色
  - color(): string
  - rgb(): string
  - rgba(): string
  - hex(): string
  - hsl(): string

- Web
  - protocol(): string
  - tld(): string
  - ip(): string
  - ipv6(): string
  - port(min?: number, max?: number): number
  - domain(tld?: string): string
  - url(protocol?: string, host?: string, prefix?: string): string
  - email(domain?: string)

- 人物
  - age(min?: number, max?: number): number
  - birthday(format?: string): string
  - fullName(): string
  - firstName(): string
  - lastName(): string
  - zh.fullName(): string
  - zh.firstName(): string
  - zh.lastName(): string
  - zh.phone(): string
  - zh.idNumber(): string

- 地区
  - zh.region(): { code: string, name: string }
  - zh.regionName(): string
  - zh.province(): { code: string, name: string }
  - zh.provinceName(): string
  - zh.city(): { code: string, name: string }
  - zh.cityName(): string
  - zh.county(): { code: string, name: string }
  - zh.countyName(): string
  - zh.zipCode(): string

- Id
  - uuid(): string
  - increment(step: number): number

## License

[MIT](./LICENSE)
