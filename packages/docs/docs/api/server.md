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
  bodyWrapper?: BodyWrapper;
  middlewares?: Middlewares;
  proxy?: ProxyOptions;
};

export type RouteConfig = {
  [key: `${Uppercase<RouteMethod>} /${string}`]: RouteValue;
};

export type ServerConfig = BaseConfig & RouteConfig;
```

**属性**

具体用法查阅[服务器配置](/mokia/guide/config.html#基本配置)。
