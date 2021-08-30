---
sidebarDepth: 3
---

# 生成器（@mokia/producer）

## Basic

### boolean 布尔类型

:::demo boolean(chance?: number)

```javascript
boolean();
boolean(1);
```

:::

### integer 整型

:::demo integer(max?: number)

```javascript
integer();
integer(5);
```

:::

:::demo integer(min: number, max: number)

```javascript
integer(5, 10);
```

:::

### natural 自然数

:::demo natural(max?: number)

```javascript
natural();
natural(5);
```

:::

:::demo natural(min: number, max: number)

```javascript
natural(5, 10);
```

:::

### float 浮点数

:::demo float(max?: number)

```javascript
float();
float(5);
```

:::

:::demo float(min: number, max: number)

```javascript
float(5, 10);
```

:::

:::demo float(min: number, max: number, fixed: number)

```javascript
float(5, 10, 3);
```

:::

:::demo float(min: number, max: number, dMin: number, dMax: number)

```javascript
float(5, 10, 3, 5);
```

:::

### char 字符

:::demo char(pool?: string)

```javascript
char();
char('ABC');
```

:::

### string 字符串

:::demo string(length?: number)

```javascript
string();
string(5);
```

:::

:::demo string(pool: string, length?: number)

```javascript
string('ABC');
string('ABC', 5);
```

:::

:::demo string(pool: string, min: number, max: number)

```javascript
string('ABC', 5, 10);
```

:::

## Color

### hex 十六进制颜色字符串

:::demo hex()

```javascript
hex();
```

:::

### rgb RGB 颜色字符串

:::demo rgb()

```javascript
rgb();
```

:::

### rgba RGBA 颜色字符串

:::demo rgba()

```javascript
rgba();
```

:::

### hsl HSL 颜色字符串

:::demo hsl()

```javascript
hsl();
```

:::

## Complex

### iterate 迭代器

:::demo iterate(iterator: Function, length?: number)

```javascript
iterate(() => integer());
iterate(() => integer(), 3);
```

:::

### oneOf 取其中的一个

:::demo oneOf(list: any[])

```javascript
oneOf(['male', 'female', 'unknown']);
```

:::

### manyOf 取其中的多个

:::demo manyOf(list: any[], length?: number)

```javascript
manyOf(['apple', 'banana', 'grape', 'orange', 'pear']);
manyOf(['apple', 'banana', 'grape', 'orange', 'pear'], 3);
```

:::

:::demo manyOf(list: any[], min: number, max: number)

```javascript
manyOf(['apple', 'banana', 'grape', 'orange', 'pear'], 3, 5);
```

:::

### pick 挑选属性

:::demo pick(obj: any, length?: number)

```javascript
pick({ a: 1, b: 2, c: 3 });
pick({ a: 1, b: 2, c: 3 }, 3);
```

:::

:::demo pick(obj: any, props: string[])

```javascript
pick({ a: 1, b: 2, c: 3 }, ['a', 'b']);
```

:::

:::demo pick(obj: any, min: number, max: number)

```javascript
pick({ a: 1, b: 2, c: 3 }, 2, 3);
```

:::

## Date

### datetime 日期时间字符串

:::tip
基于 dayjs，支持格式请查看[这里](https://day.js.org/docs/en/display/format#list-of-all-available-formats)。
:::

:::demo datetime(format?: string)

```javascript
datetime();
datetime('DD/MM/YYYY HH:mm:ss');
```

:::

:::demo datetime(format: string, min: Date | number | string, max: Date | number | string)

```javascript
datetime('YYYY-MM-DD', 0, Date.now());
datetime('YYYY-MM-DD', '2021-01-01', '2021-12-31');
```

:::

### date 日期字符串

:::demo date(format?: string)

```javascript
date();
```

:::

### time 时间字符串

:::demo time(format?: string)

```javascript
time();
```

:::

### now 当前时间字符串

:::demo now(format?: string)

```javascript
now();
```

:::

### timestamp 当前时间字符串

:::demo timestamp(format?: string)

```javascript
timestamp();
```

:::

## Generate

### generate 复合数据

:::demo generate(schema: any)

```javascript
generate(5);
generate([1, '2', true]);
generate({ a: 1, b: '2', c: true });
```

:::

:::demo generate(schema: any)

```javascript
generate(() => integer());
generate([() => integer()]);
generate({ foo: () => integer() });
generate({
  foo: {
    bar: {
      baz: () => integer(),
    },
  },
});
```

:::

:::demo generate(schema: any)

```javascript
class Person {
  constructor() {
    this.name = fullName();
  }
}

generate(Person);
```

:::

### list 列表

:::tip
等价于 [iterate](#iterate-迭代器) 与 [generate](#generate-复合数据) 的组合。
:::

:::demo list(schema: any, length?: number)

```javascript
list({ foo: () => integer() });
list({ foo: () => integer() }, 3);
```

:::

:::demo list(schema: any, min: number, max: number)

```javascript
list({ foo: () => integer() }, 3, 5);
```

:::

## Id

### uuid UUID 字符串

:::demo uuid()

```javascript
uuid();
```

:::

### increment 自增 ID 数字

:::demo increment()

```javascript
increment();
```

:::

## Image

### imageDataURL 图片 DataURL

:::demo imageDataURL(size?: string, text?: string, background?: string, foreground?: string)

```html
<img id="image1" src="" />
<img id="image2" src="" />
<img id="image3" src="" />
<img id="image4" src="" />
<img id="image5" src="" />
```

```javascript
$('#image1').src = imageDataURL();
$('#image2').src = imageDataURL('128x128');
$('#image3').src = imageDataURL('200x100', 'Hello World');
$('#image4').src = imageDataURL('200x100', 'Custom Color', '#499DF2');
$('#image5').src = imageDataURL('200x100', 'Custom Color', 'white', 'black');
```

:::

## Misc

### pagination 分页

:::demo pagination(schema: any)

```javascript
pagination({ foo: 1 });
```

:::

:::demo pagination(schema: any, options: PaginationOptions)

```javascript
pagination({ foo: 1 }, { page: 1, pageSize: 5, total: 25 });
pagination(
  { foo: 1 },
  {
    fields: {
      list: 'data',
      page: 'current',
      pageSize: 'size',
      total: 'count',
      totalPages: 'pageCount',
    },
  },
);
```

:::

## Person

### age 年龄

:::demo age(min?: number, max?: number)

```javascript
age();
age(18);
age(0, 18);
```

:::

### birthday 生日

:::demo birthday(format?: string)

```javascript
birthday();
birthday('DD/MM/YYYY');
```

:::

### firstName 名

:::demo firstName()

```javascript
firstName();
```

:::

### lastName 姓

:::demo lastName()

```javascript
lastName();
```

:::

### fullName 姓名

:::demo fullName()

```javascript
fullName();
```

:::

## Text

### word 单词

:::demo word(length?: number)

```javascript
word();
word(5);
```

:::

:::demo word(min: number, max: number)

```javascript
word(5, 10);
```

:::

### title 标题

:::demo title(length?: number)

```javascript
title();
title(5);
```

:::

:::demo title(min: number, max: number)

```javascript
title(2, 5);
```

:::

### sentence 句子

:::demo sentence(length?: number)

```javascript
sentence();
sentence(5);
```

:::

:::demo sentence(min: number, max: number)

```javascript
sentence(5, 10);
```

:::

### paragraph 段落

:::demo paragraph(length?: number)

```javascript
paragraph();
paragraph(5);
```

:::

:::demo paragraph(min: number, max: number)

```javascript
paragraph(3, 5);
```

:::

### passage 文章

:::demo passage(length?: number)

```javascript
passage();
passage(5);
```

:::

:::demo passage(min: number, max: number)

```javascript
passage(3, 5);
```

:::

## Web

### protocol 协议

:::demo protocol()

```javascript
protocol();
```

:::

### tld 顶级域名

:::demo tld()

```javascript
tld();
```

:::

### ip IP v4

:::demo ip()

```javascript
ip();
```

:::

### ipv6 IP v6

:::demo ipv6()

```javascript
ipv6();
```

:::

### port 端口号

:::demo port()

```javascript
port();
```

:::

### domain 域名

:::demo domain(tld?: string)

```javascript
domain();
domain('com');
```

:::

### pathname 路径

:::demo pathname(length?: number)

```javascript
pathname();
pathname(5);
```

:::

### url URL

:::demo url(protocol?: string, host?: string, prefix?: string)

```javascript
url();
url('https');
url('https', 'github.com');
url('https', 'github.com', '/varharrie');
```

:::

### email 电子邮箱地址

:::demo email(domain?: string)

```javascript
email();
email('gmail.com');
```

:::

## [zh-CN] Person

### firstName 名

:::demo zhCN.firstName()

```javascript
zhCN.firstName();
```

:::

### lastName 姓

:::demo zhCN.lastName()

```javascript
zhCN.lastName();
```

:::

### fullName 姓名

:::demo zhCN.fullName()

```javascript
zhCN.fullName();
```

:::

### phoneNumber 手机号码

:::demo zhCN.phoneNumber()

```javascript
zhCN.phoneNumber();
```

:::

### idNumber 身份证号码

:::demo zhCN.idNumber()

```javascript
zhCN.idNumber();
```

:::

## [zh-CN] Region

### provinceName 省

:::demo zhCN.provinceName()

```javascript
zhCN.provinceName();
```

:::

### cityName 市

:::demo zhCN.cityName()

```javascript
zhCN.cityName();
```

:::

### countyName 县

:::demo zhCN.countyName()

```javascript
zhCN.countyName();
```

:::

### regionName 地区

:::demo zhCN.regionName(separator?: string)

```javascript
zhCN.regionName();
zhCN.regionName('，');
```

:::

## [zh-CN] Text

### word 字

:::demo zhCN.word(length?: number)

```javascript
zhCN.word();
zhCN.word(5);
```

:::

:::demo zhCN.word(min: number, max: number)

```javascript
zhCN.word(5, 10);
```

:::

### title 标题

:::demo zhCN.title(length?: number)

```javascript
zhCN.title();
zhCN.title(5);
```

:::

:::demo zhCN.title(min: number, max: number)

```javascript
zhCN.title(2, 5);
```

:::

### sentence 句子

:::demo zhCN.sentence(length?: number)

```javascript
zhCN.sentence();
zhCN.sentence(5);
```

:::

:::demo zhCN.sentence(min: number, max: number)

```javascript
zhCN.sentence(5, 10);
```

:::

### paragraph 段落

:::demo zhCN.paragraph(length?: number)

```javascript
zhCN.paragraph();
zhCN.paragraph(5);
```

:::

:::demo zhCN.paragraph(min: number, max: number)

```javascript
zhCN.paragraph(3, 5);
```

:::

### passage 文章

:::demo zhCN.passage(length?: number)

```javascript
zhCN.passage();
zhCN.passage(5);
```

:::

:::demo zhCN.passage(min: number, max: number)

```javascript
zhCN.passage(3, 5);
```

:::
