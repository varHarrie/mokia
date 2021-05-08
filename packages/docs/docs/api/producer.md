---
sidebarDepth: 3
---

# 生成器（@mokia/producer）

## Basic

### boolean 布尔类型

:::demo boolean(chance?: number)
producer.boolean();
producer.boolean(1);
:::

### integer 整型

:::demo integer(max?: number)
producer.integer();
producer.integer(5);
:::

:::demo integer(min: number, max: number)
producer.integer(5, 10);
:::

### natural 自然数

:::demo natural(max?: number)
producer.natural();
producer.natural(5);
:::

:::demo natural(min: number, max: number)
producer.natural(5, 10);
:::

### float 浮点数

:::demo float(max?: number)
producer.float();
producer.float(5);
:::

:::demo float(min: number, max: number)
producer.float(5, 10);
:::

:::demo float(min: number, max: number, fixed: number)
producer.float(5, 10, 3);
:::

:::demo float(min: number, max: number, dMin: number, dMax: number)
producer.float(5, 10, 3, 5);
:::

### char 字符

:::demo char(pool?: string)
producer.char();
producer.char('ABC');
:::

### string 字符串

:::demo string(length?: number)
producer.string();
producer.string(5);
:::

:::demo string(pool: string, length?: number)
producer.string('ABC');
producer.string('ABC', 5);
:::

:::demo string(pool: string, min: number, max: number)
producer.string('ABC', 5, 10);
:::

## Color

### hex 十六进制颜色字符串

:::demo hex()
producer.hex();
:::

### rgb RGB 颜色字符串

:::demo rgb()
producer.rgb();
:::

### rgba RGBA 颜色字符串

:::demo rgba()
producer.rgba();
:::

### hsl HSL 颜色字符串

:::demo hsl()
producer.hsl();
:::

## Complex

### iterate 迭代器

:::demo iterate(iterator: Function, length?: number)
producer.iterate(() => Math.random());
producer.iterate(() => Math.random(), 3);
:::

### oneOf 取其中的一个

:::demo oneOf(list: any[])
producer.oneOf(['male', 'female', 'unknown']);
:::

### manyOf 取其中的多个

:::demo manyOf(list: any[], length?: number)
producer.manyOf(['apple', 'banana', 'grape', 'orange', 'pear']);
producer.manyOf(['apple', 'banana', 'grape', 'orange', 'pear'], 3);
:::

:::demo manyOf(list: any[], min: number, max: number)
producer.manyOf(['apple', 'banana', 'grape', 'orange', 'pear'], 3, 5);
:::

### pick 挑选属性

:::demo pick(obj: any, length?: number)
producer.pick({ a: 1, b: 2, c: 3 });
producer.pick({ a: 1, b: 2, c: 3 }, 3);
:::

:::demo pick(obj: any, props: string[])
producer.pick({ a: 1, b: 2, c: 3 }, ['a', 'b']);
:::

:::demo pick(obj: any, min: number, max: number)
producer.pick({ a: 1, b: 2, c: 3 }, 2, 3);
:::
