# Mokia

A mock server integrated data simulation and http service.

[中文文档](./README.zh-cn.md)

## Features

- 🤟 Simple, easy to use
- 🔄 Reusable model
- 💎 Support TypeScript

## Basic Usage

1. Install mokia

  ```bash
  $ npm install mokia --save-dev
  # Or
  $ yarn add mokia --dev
  ```

2. Adds a ts file like `mock.ts`:

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

3. Add script to `package.json`:

  ```json
  "scripts": {
    "mock": "mokia mock.ts",
  }
  ```

4. Run script `npm run mock` to start a http server.

## Advanced Usage

To reduce duplicated code and keep reusability, we recommend to use class style:

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

### Server Config

  - `HOST` Server host, default to `'localhost'`
  - `PORT` Server port, default to `8080`
  - `PREFIX` URL prefix, default to `''`
  - `PRIORITY` priority url，all requests are redirected to this address first, default to`''`
  - `SILENT` whether to hide request logs, default to `false`
  - `INTERCEPTORS` route interceptors, default to `{}`

  Note: The keys of those parameters are `Symbol`, instead of `string`, so you should import they from `mokia`.

  ```typescript
  import { HOST, PORT, PREFIX, PRIORITY, SILENT, INTERCEPTORS } from 'mokia'

  export default {
    [HOST]: 'localhost',
    [PORT]: 3000,
    [PREFIX]: '/apis',
    [PRIORITY]: 'http://another.domain.com',
    [SILENT]: true,
    [INTERCEPTORS]: {
      request: (req, res) => {
        console.log('before')
      },
      response: (req, res, data) => {
        console.log('after')

        return {
          code: 200,
          data
        }
      }
    }
    // ...
  }
  ```

### Generators

  All generators can be use as `function` or `decorator`.

  ```typescript
  import { decorators, generators, mock } from 'mokia'

  // As decorator
  class User {
    @decorators.boolean()
    isAdmin: boolean
  }

  // Or just a normal function
  const bool = generators.boolean()

  // Be equivalent to
  const bool = mock.boolean()
  ```

- Basic
  - `boolean`(chance?: number, value?: boolean): boolean
  - `integer`(max?: number): number
  - `integer`(min: number, max: number): number
  - `natural`(max?: number): number
  - `natural`(min: number, max: number): number
  - `float`(max?: number): number
  - `float`(min: number, max, fixed?): number
  - `float`(min: number, max, dmin: number, dmax: number): number
  - `char`(pool: string): string
  - `string`(pool: string, length?: number): string
  - `string`(pool: string, min: number, max: number): string

- Complex
  - `generate`(mockable: Object | Function): any
  - `array`(proto: any, length?: number): any[]
  - `array`(proto: any, min: number, max: number): any[]
  - `oneOf`(list: any[]): any
  - `manyOf`(list: any[], length?: number): any[]
  - `manyOf`(list: any[], min: number, max: number): any[]
  - `pick`(proto: Object, length?: number): Object
  - `pick`(proto: Object, props: string | string[]): Object
  - `pick`(proto: Object, min: number, max: number): Object

- Date
  - `datetime`(format?: string): string
  - `datetime`(format: string, max: DateType): string
  - `datetime`(format: string, min: DateType, max: DateType): string
  - `date`(format?: string): string
  - `date`(format: string, max: DateType): string
  - `date`(format: string, min: DateType, max: DateType): string
  - `time`(format?: string): string
  - `time`(format: string, max: DateType): string
  - `time`(format: string, min: DateType, max: DateType): string
  - `timestamp`(max?: DateType): string
  - `timestamp`(min: DateType, max: DateType): string
  - `now`(format?: string): string

- Image
  - `image`(size?: string, text?: string, background?: string, foreground?: string, format?: string): string
  - `dataImage`(size?: string, text?: string, background?: string, foreground?: string, format?: string): string

- Text
  - `word`(length?: number): string
  - `word`(min: number, max: number): string
  - `title`(length?: number): string
  - `title`(min: number, max: number): string
  - `sentence`(length?: number): string
  - `sentence`(min: number, max: number): string
  - `paragraph`(length?: number): string
  - `paragraph`(min: number, max: number): string
  - `passage`(length?: number): string
  - `passage`(min: number, max: number): string
  - `zh.word`(length?: number): string
  - `zh.word`(min: number, max: number): string
  - `zh.title`(length?: number): string
  - `zh.title`(min: number, max: number): string
  - `zh.sentence`(length?: number): string
  - `zh.sentence`(min: number, max: number): string
  - `zh.paragraph`(length?: number): string
  - `zh.paragraph`(min: number, max: number): string
  - `zh.passage`(length?: number): string
  - `zh.passage`(min: number, max: number): string

- Color
  - `color`(): string
  - `rgb`(): string
  - `rgba`(): string
  - `hex`(): string
  - `hsl`(): string

- Web
  - `protocol`(): string
  - `tld`(): string
  - `ip`(): string
  - `ipv6`(): string
  - `port`(min?: number, max?: number): number
  - `domain`(tld?: string): string
  - `url`(protocol?: string, host?: string, prefix?: string): string
  - `email`(domain?: string)

- Person
  - `age`(min?: number, max?: number): number
  - `birthday`(format?: string): string
  - `fullName`(): string
  - `firstName`(): string
  - `lastName`(): string
  - `zh.fullName`(): string
  - `zh.firstName`(): string
  - `zh.lastName`(): string
  - `zh.phone`(): string
  - `zh.idNumber`(): string

- Region
  - `zh.region`(): { code: string, name: string }
  - `zh.regionName`(): string
  - `zh.province`(): { code: string, name: string }
  - `zh.provinceName`(): string
  - `zh.city`(): { code: string, name: string }
  - `zh.cityName`(): string
  - `zh.county`(): { code: string, name: string }
  - `zh.countyName`(): string
  - `zh.zipCode`(): string

- Id
  - `uuid`(): string
  - `increment`(step: number): number

## License

[MIT](./LICENSE)
