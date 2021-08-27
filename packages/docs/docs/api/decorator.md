# 装饰器（@mokia/decorator）

所有装饰器函数都返回[`Decorator`](#Decorator)。

接收的参数与对应的生成器函数相同，可查阅[生成器](/mokia/api/producer)。

## Decorator

**类型**

```typescript
type Decorator = (target?: unknown, propertyKey?: string | symbol) => any;
```

**示例**

作为函数使用时，将会返回对应的生成器函数：

```javascript
import * as decorator from '@mokia/decorator';
import * as producer from '@mokia/producer';

const foo = decorator.integer(max);
// 等价于
const foo = () => producer.integer(max);
```

也可以作为 ES 装饰器使用：

```javascript
import * as decorator from '@mokia/decorator';

class User {
  @decorator.fullName()
  name: string;
}
```
