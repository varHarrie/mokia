# mokia

## mokia

**类型**

```typescript
import * as decorator from '@mokia/decorator';
import * as producer from '@mokia/producer';

type Mokia = typeof producer.generate & typeof decorator & { producer: typeof producer };
```

**示例**

```javascript
import mokia from 'mokia';

mokia({
  name: mokia.fullName(),
  age: mokia.age(),
});
```
