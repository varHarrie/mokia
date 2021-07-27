# 服务器（@mokia/server）

## createServer

**签名**

```typescript
function createServer(config: ServerConfig): Promise<[server: http.Server, destroy: () => Promise<void>]>;
```

**参数**

| 参数   | 类型                            | 描述                 |
| ------ | ------------------------------- | -------------------- |
| config | [`ServerConfig`](#ServerConfig) | 创建服务器的配置对象 |

**返回值**

| 返回值  | 类型                  | 描述           |
| ------- | --------------------- | -------------- |
| app     | `http.Server`         | 服务器实例     |
| destroy | `() => Promise<void>` | 服务器销毁函数 |

**示例**

```javascript
import { createServer } from '@mokia/server';

const config = {
  port: 3000,
  'GET /hello': () => {
    message: 'Hello World';
  },
};

const [app, destroy] = await createServer(config);
```

## ServerConfig

**类型**

```typescript
export type BaseConfig = {
  host?: string;
  port?: string | number;
  prefix?: string;
  silent?: boolean;
  delay?: number | [number, number];
  preferredUrl?: string;
  fallbackUrl?: string;
  bodyWrapper?: BodyWrapper;
  prefixMiddleware?: RequestHandler | ErrorRequestHandler;
  suffixMiddleware?: RequestHandler | ErrorRequestHandler;
};

export type RouteConfig = {
  [key in string]: key extends keyof BaseConfig ? BaseConfig[key] : RouteValue;
};

export type ServerConfig = BaseConfig | RouteConfig;
```

**属性**

| 属性             | 类型                                      | 描述                                                             |
| ---------------- | ----------------------------------------- | ---------------------------------------------------------------- |
| host             | `string`                                  | 主机                                                             |
| port             | `string` \| `number`                      | 端口号                                                           |
| prefix           | `string`                                  | 路由前缀                                                         |
| silent           | `boolean`                                 | 静默模式，禁用日志输出                                           |
| deploy           | `number` \| `[number, number]`            | 模拟延迟时间（ms）                                               |
| preferredUrl     | `string`                                  | 优先地址，请求会先转发到该前缀地址，若 404，再由本服务器路由处理 |
| fallbackUrl      | `string`                                  | 回退地址，若没有匹配的地址，则转发到该前缀地址                   |
| bodyWrapper      | `(body: unknown) => unknown`              | 用于响应体包装处理                                               |
| prefixMiddleware | `RequestHandler` \| `ErrorRequestHandler` | 前缀中间件                                                       |
| suffixMiddleware | `RequestHandler` \| `ErrorRequestHandler` | 后缀中间件                                                       |
