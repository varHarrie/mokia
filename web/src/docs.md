## Basic

- boolean

  - boolean(chance?: number, value?: boolean): boolean

  ```javascript
  console.log(boolean())
  console.log(boolean(0.8))
  console.log(boolean(0.8, false))
  ```

- integer

  - integer(max?: number): number
  - integer(min: number, max: number): number

  ```javascript
  console.log(integer())
  console.log(integer(100))
  console.log(integer(10, 20))
  ```

- natural

  - natural(max?: number): number
  - natural(min: number, max: number): number

  ```javascript
  console.log(natural())
  console.log(natural(100))
  console.log(natural(10, 20))
  ```

- float

  - float(max?: number): number
  - float(min: number, max: number, fixed?): number
  - float(min: number, max: number, dmin: number, dmax: number): number

  ```javascript
  console.log(float())
  console.log(float(100))
  console.log(float(10, 20))
  console.log(float(10, 20, 2))
  console.log(float(10, 20, 5, 10))
  ```

- char

  - char(pool: string): string

  ```javascript
  console.log(char('xyz'))
  ```

- string

  - string(pool: string, length?: number): string
  - string(pool: string, min: number, max: number): string

  ```javascript
  console.log(string('abcdefg'))
  console.log(string('abcdefg', 5))
  console.log(string('abcdefg', 5, 10))
  ```

## Complex

- generate

  - generate(mockable: Object | Function): any

- array

  - array(proto: any, length?: number): any[]
  - array(proto: any, min: number, max: number): any[]

- oneOf

  - oneOf(list: any[]): any

- manyOf

  - manyOf(list: any[], length?: number): any[]
  - manyOf(list: any[], min: number, max: number): any[]

- pick

  - pick(proto: Object, length?: number): Object
  - pick(proto: Object, props: string | string[]): Object
  - pick(proto: Object, min: number, max: number): Object

## Date

- datetime

  - datetime(format?: string): string
  - datetime(format: string, max: DateType): string
  - datetime(format: string, min: DateType, max: DateType): string

- date

  - date(format?: string): string
  - date(format: string, max: DateType): string
  - date(format: string, min: DateType, max: DateType): string

- time

  - time(format?: string): string
  - time(format: string, max: DateType): string
  - time(format: string, min: DateType, max: DateType): string

- timestamp

  - timestamp(max?: DateType): string
  - timestamp(min: DateType, max: DateType): string

- now
  - now(format?: string): string

## Image

- image

  - image(size?: string, text?: string, background?: string, foreground?: string, format?: string): string

- dataImage

  - dataImage(size?: string, text?: string, background?: string, foreground?: string, format?: string): string

## Text

- word

  - word(length?: number): string
  - word(min: number, max: number): string

- title

  - title(length?: number): string
  - title(min: number, max: number): string

- sentence

  - sentence(length?: number): string
  - sentence(min: number, max: number): string

- paragraph

  - paragraph(length?: number): string
  - paragraph(min: number, max: number): string

- passage

  - passage(length?: number): string
  - passage(min: number, max: number): string

- zh.word

  - zh.word(length?: number): string
  - zh.word(min: number, max: number): string

- zh.title

  - zh.title(length?: number): string
  - zh.title(min: number, max: number): string

- zh.sentence

  - zh.sentence(length?: number): string
  - zh.sentence(min: number, max: number): string

- zh.paragraph

  - zh.paragraph(length?: number): string
  - zh.paragraph(min: number, max: number): string

- zh.passage

  - zh.passage(length?: number): string
  - zh.passage(min: number, max: number): string

## Color

- color

  - color(): string

- rgb

  - rgb(): string

- rgba

  - rgba(): string

- hex

  - hex(): string

- hsl

  - hsl(): string

## Web

- protocol

  - protocol(): string

- tld

  - tld(): string

- ip

  - ip(): string

- ipv6

  - ipv6(): string

- port

  - port(min?: number, max?: number): number

- domain

  - domain(tld?: string): string

- url

  - url(protocol?: string, host?: string, prefix?: string): string

- email

  - email(domain?: string)

## Person

- age

  - age(min?: number, max?: number): number

- birthday

  - birthday(format?: string): string

- fullName

  - fullName(): string

- firstName

  - firstName(): string

- lastName

  - lastName(): string

- zh.fullName

  - zh.fullName(): string

- zh.firstName

  - zh.firstName(): string

- zh.lastName

  - zh.lastName(): string

- zh.phone

  - zh.phone(): string

- zh.idNumber

  - zh.idNumber(): string

## Region

- zh.region

  - zh.region(): { code: string, name: string }

- zh.regionName

  - zh.regionName(): string

- zh.province

  - zh.province(): { code: string, name: string }

- zh.provinceName

  - zh.provinceName(): string

- zh.city

  - zh.city(): { code: string, name: string }

- zh.cityName

  - zh.cityName(): string

- zh.county

  - zh.county(): { code: string, name: string }

- zh.countyName

  - zh.countyName(): string

- zh.zipCode

  - zh.zipCode(): string

## Id

- uuid

  - uuid(): string

- increment

  - increment(step: number): number
