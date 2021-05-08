---
sidebarDepth: 3
---

# 生成器（@mokia/producer）

## Basic

### boolean 布尔类型

<Demo title="boolean(chance?: number)">
  <template>
producer.boolean();
producer.boolean(1);
  </template>
</Demo>

### integer 整型

<Demo title="integer(max?: number)">
  <template>
producer.integer();
producer.integer(5);
  </template>
</Demo>

<Demo title="integer(min: number, max: number)">
  <template>
producer.integer(5, 10);
  </template>
</Demo>

### natural 自然数

<Demo title="natural(max?: number)">
  <template>
producer.natural();
producer.natural(5);
  </template>
</Demo>

<Demo title="natural(min: number, max: number)">
  <template>
producer.natural(5, 10);
  </template>
</Demo>

### float 浮点数

<Demo title="float(max?: number)">
  <template>
producer.float();
producer.float(5);
  </template>
</Demo>

<Demo title="float(min: number, max: number)">
  <template>
producer.float(5, 10);
  </template>
</Demo>

<Demo title="float(min: number, max: number, fixed: number)">
  <template>
producer.float(5, 10, 3);
  </template>
</Demo>

<Demo title="float(min: number, max: number, dMin: number, dMax: number)">
  <template>
producer.float(5, 10, 3, 5);
  </template>
</Demo>

### char 字符

<Demo title="char(pool?: string)">
  <template>
producer.char();
producer.char('ABC');
  </template>
</Demo>

### string 字符串

<Demo title="string(length?: number)">
  <template>
producer.string();
producer.string(5);
  </template>
</Demo>

<Demo title="string(pool: string, length?: number)">
  <template>
producer.string('ABC');
producer.string('ABC', 5);
  </template>
</Demo>

<Demo title="string(pool: string, min: number, max: number)">
  <template>
producer.string('ABC', 5, 10);
  </template>
</Demo>

## Color

### hex 十六进制颜色字符串

<Demo title="hex()">
  <template>
producer.hex();
  </template>
</Demo>

### rgb RGB 颜色字符串

<Demo title="rgb()">
  <template>
producer.rgb();
  </template>
</Demo>

### rgba RGBA 颜色字符串

<Demo title="rgba()">
  <template>
producer.rgba();
  </template>
</Demo>

### hsl HSL 颜色字符串

<Demo title="hsl()">
  <template>
producer.hsl();
  </template>
</Demo>

## Complex

### iterate 迭代器

<Demo title="iterate(iterator: Function, length?: number)">
  <template>
producer.iterate(() => Math.random());
producer.iterate(() => Math.random(), 3);
  </template>
</Demo>

### oneOf 取其中的一个

<Demo title="oneOf(list: any[])">
  <template>
producer.oneOf(['male', 'female', 'unknown']);
  </template>
</Demo>

### manyOf 取其中的多个

<Demo title="manyOf(list: any[], length?: number)">
  <template>
producer.manyOf(['apple', 'banana', 'grape', 'orange', 'pear']);
producer.manyOf(['apple', 'banana', 'grape', 'orange', 'pear'], 3);
  </template>
</Demo>

<Demo title="manyOf(list: any[], min: number, max: number)">
  <template>
producer.manyOf(['apple', 'banana', 'grape', 'orange', 'pear'], 3, 5);
  </template>
</Demo>

### pick 挑选属性

<Demo title="pick(obj: any, length?: number)">
  <template>
producer.pick({ a: 1, b: 2, c: 3 });
producer.pick({ a: 1, b: 2, c: 3 }, 3);
  </template>
</Demo>

<Demo title="pick(obj: any, props: string[])">
  <template>
producer.pick({ a: 1, b: 2, c: 3 }, ['a', 'b']);
  </template>
</Demo>
