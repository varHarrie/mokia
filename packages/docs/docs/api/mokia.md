# mokia

## mokia

**类型**

```typescript
import * as decorator from '@mokia/decorator';
import * as producer from '@mokia/producer';

type Mokia = typeof mock & typeof decorator & { producer: typeof producer; defineConfig: typeof defineConfig };
```

**示例**

```javascript
import mokia from 'mokia';

mokia({
  name: mokia.fullName(),
  age: mokia.age(),
});
```

## defineConfig

从实现上看，仅仅返回了传入的参数，但可以为 IDE 提供类型推导依据。

**签名**

```typescript
function defineConfig(config: MokiaUserConfig): MokiaUserConfig;
```

**参数**

| 参数   | 类型                                            | 描述                 |
| ------ | ----------------------------------------------- | -------------------- |
| config | [`MokiaUserConfig`](./server.html#serverconfig) | 创建服务器的配置对象 |

**示例**

```javascript
import { defineConfig } from 'mokia';

export default defineConfig({
  port: 3000,
  'GET /hello': () => {
    message: 'Hello World';
  },
});
```
