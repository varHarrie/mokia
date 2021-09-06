# 服务器配置

## 组成

服务器配置主要有两部分组成：

- 基本配置：用于配置服务器基本参数。
- 路由配置：用于配置路由逻辑，取值可以为`函数`或`对象`。

例如：

```javascript
module.exports = {
  port: 3000,
  prefix: '/api'
  'GET /hi'() {
    return 'hello world';
  },
};
```

- `port`、`prefix`为基本配置，更多参数和具体用法详见[基本配置](#基本配置)；

- `GET /hi`为路由配置，客户端通过`GET`方法访问服务器`/api/hi`接口，将会返回`"hello world"`字符串信息。

## 默认配置文件

若不显式设置配置，mokia 将会默认采用以下基本配置：

```json
{
  "host": "localhost",
  "port": 8080,
  "prefix": "",
  "silent": false
}
```

## 基本配置

### host

- 类型：`string`
- 默认值：`"localhost"`

用于设置服务器`hostname`，详情查阅 express 的[listen](http://expressjs.com/en/5x/api.html#app.listen)。

### port

- 类型：`number`
- 默认值：`8080`

用于设置服务器`port`，详情查阅 express 的[listen](http://expressjs.com/en/5x/api.html#app.listen)。

### prefix

- 类型：`string`
- 默认值：`""`

用于设置路由前缀。

### silent

- 类型：`boolean`
- 默认值：`false`

静默模式，禁用日志输出。

### delay

- 类型：`number` \| `[number, number]`
- 默认值：无

模拟延迟时长（ms），若类型为数组，则每次请求随机取`[min, max]`范围的数据作为延迟时长。

### bodyWrapper

- 类型：`(body: unknown) => unknown`
- 默认值：`producer.generate`

用于响应体包装处理。

> 如果直接使用`@mokia/server`，其默认值为`undefined`。

### middlewares

- 类型：`{ prefix: Array<RequestHandler>, suffix: Array<RequestHandler> }`
- 默认值：无

用于追加 express 的自定义中间件。

### proxy

- 类型：`string` \| `ProxyRecord` \| `ProxyEntry`
- 默认值：无

用于配置代理模式，可选参数请参考[http-proxy-middleware](https://github.com/chimurai/http-proxy-middleware#options)。

当服务器接收到请求时，将会优先寻找路由配置中的接口，如果没有命中，才会转向代理服务器。

### context

- 类型：`any`
- 默认值：`producer`

用于绑定`this`上下文，在路由配置中将可以通过`this`访问指定的内容。

> 如果直接使用`@mokia/server`，其默认值为`undefined`。
