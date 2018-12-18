import dayjs from 'dayjs'

import { MAX_DATE, MIN_DATE } from './constants'
import { integer } from './generators'

export type Func<R = any> = (...args: any[]) => R

/**
 * Checks if `target` is a Class
 *
 * @example
 *
 * isClass(class Foo { })
 * // => true
 *
 * isClass(function foo () { })
 * // => false
 *
 * isClass({})
 * // => false
 */
export function isClass (target: any): target is new (...args: any[]) => any {
  return typeof target === 'function'
    && /^class\s/.test(Function.prototype.toString.call(target))
}

/**
 * Checks if `func` is a Function
 *
 * @example
 *
 * isFunction(function foo () { })
 * // => true
 *
 * isFunction(class Foo { })
 * // => false
 *
 * isFunction('')
 * // => false
 */
export function isFunction (func: any): func is Func {
  return typeof func === 'function' && !isClass(func)
}

/**
 * Returns value that determined by original value
 *
 * @example
 *
 * defaultTo(1, 2)
 * // => 1
 *
 * defaultTo(undefined, 10)
 * // => 10
 *
 * defaultTo(NaN, 10)
 * // => 10
 *
 * defaultTo(null, 10)
 * // => 10
 */
export function defaultTo<T> (value: any, defaultValue: T): T {
  return (value === undefined || value === null || isNaN(value))
    ? defaultValue : value
}

/**
 * Returns value that determined by original value
 *
 * @example
 *
 * defaultBy(1, 2, 3)
 * // => 2
 *
 * defaultBy(undefined, 10, 20)
 * // => 20
 *
 * defaultBy(NaN, 10, 20)
 * // => 20
 *
 * defaultBy(null, 10, 20)
 * // => 20
 */
export function defaultBy<T> (value: any, trueValue: any, falseValue: any) {
  return (value === undefined || value === null || isNaN(value))
    ? falseValue : trueValue
}

/**
 * Returns an integer from any type
 *
 * @example
 *
 * ensureInteger(12)
 * // => 12
 *
 * ensureInteger(2.5)
 * // => 2
 *
 * ensureInteger(null)
 * // => 0
 *
 * ensureInteger(null, 1)
 * // => 1
 */
export function ensureInteger (value: any, defaultValue: number = 0): number {
  const num = parseInt(value, 10)
  return isNaN(num) ? defaultValue : num
}

/**
 * Returns a natural number from any type
 *
 * @example
 *
 * ensureNatural(12)
 * // => 12
 *
 * ensureNatural(2.5)
 * // => 2
 *
 * ensureNatural(-1)
 * // => 0
 *
 * ensureInteger(null)
 * // => 0
 */
export function ensureNatural (value: any, defaultValue: number = 0): number {
  const num = ensureInteger(value, defaultValue)
  return num < 0 ? 0 : num
}

/**
 * Returns a number within lower and upper bounds
 *
 * @example
 *
 * clamp(5, 0, 10)
 * // => 5
 *
 * clamp(-3, 0, 10)
 * // => 0
 *
 * clamp(18, 0, 10)
 * // => 10
 */
export function clamp (value: number, lower: number, upper: number) {
  const min = Math.min(lower, upper)
  const max = Math.max(lower, upper)

  return value < min ? min : value > max ? max : value
}

/**
 * Returns a string with capital first letter
 *
 * @example
 *
 * capitalize('abc')
 * // => 'Abc'
 */
export function capitalize (value: string) {
  return value.substring(0, 1).toUpperCase() + value.substring(1)
}

export type DateType = number | string | Date

/**
 * Transform DateLike variable to string with format string
 *
 * @example
 *
 * formatDate('2018-12-06 12:00:00', 'YYYY/MM/DD HH:mm')
 * // => 2018/12/06 12:00
 *
 * formatDate(1544068800000, 'YYYY/MM/DD HH:mm')
 * // => 2018/12/06 12:00
 *
 * formatDate(new Date(), 'YYYY/MM/DD HH:mm')
 * // => 2018/12/06 12:00
 */
export function formatDate (date: DateType, formatStr: string) {
  return dayjs(date).format(formatStr)
}

/**
 * Return random Date object
 *
 * @example
 *
 * randomDate()
 * // => [Thu Dec 06 2018 12:00:00]
 *
 * randomDate('2018-12-06 00:00:00')
 * // => [Tue Jul 26 2016 17:32:58]
 *
 * randomDate('2018-12-05 00:00:00', '2018-12-06 00:00:00')
 * // => [Wed Dec 05 2018 13:27:48]
 */
export function randomDate (): Date
export function randomDate (max: DateType): Date
export function randomDate (min: DateType, max: DateType): Date
export function randomDate (min?: DateType, max?: DateType): Date {
  const minDate = max && min ? new Date(min) : MIN_DATE
  const maxDate = max ? new Date(max) : min ? new Date(min) : MAX_DATE

  return new Date(integer(minDate.getTime(), maxDate.getTime()))
}

/**
 * Checks if `obj` is a true object
 *
 * @example
 *
 * isTrueObject({foo: 'bar'})
 * // => true
 *
 * isTrueObject(new Object())
 * // => true
 *
 * isTrueObject(null)
 * // => false
 *
 * isTrueObject(function foo () { })
 * // => false
 */
export function isTrueObject (obj: any): obj is Object {
  return !!obj && typeof obj === 'object'
}

/**
 * Returns an object with properties picked from another
 *
 * @example
 *
 * pickProps({ name: 'Harrie', age: 18, gender: 'male' }, 'name age')
 * // => { name: 'Harrie', age: 18 }
 *
 * pickProps({ name: 'Harrie', age: 18, gender: 'male' }, ['name', 'age'])
 * // => { name: 'Harrie', age: 18 }
 */
export function pickProps<T extends Object> (source: T, props: string | string[]): Partial<T> {
  if (!isTrueObject(source)) return { }
  if (!props.length) return source

  props = Array.isArray(props) ? props : props.split(' ')

  return props.reduce((r, prop) => {
    r[prop] = (source as any)[prop]

    return r
  }, {} as any)
}

/**
 * Returns an array with items picked from another
 *
 * @example
 *
 * pickProps(['a', 'b', 'c', 'd'], 3)
 * // => ['d', 'a', 'c']
 */
export function pickItems<T> (list: T[], length: number): T[] {
  length = length < list.length ? length : list.length

  return list
    .sort(() => Math.random() - 0.5)
    .slice(0, length)
}

/**
 * Returns a debounced function
 *
 * @example
 *
 * debounce(function () { }, 200)
 */
export function debounce<T extends Function> (fn: T, delay: number): T {
  let timer: any

  return function (this: any, ...args: any[]) {
    clearTimeout(timer)

    timer = setTimeout(() => {
      fn.apply(this, args)
    }, delay)
  } as any
}

/**
 * Converts hsl to rgb
 *
 * @reference
 *
 * https://www.w3.org/TR/css-color-3/#hsl-color
 *
 * @example
 *
 * hslToRgb(0, 1, 0.5)
 * // => [1, 0, 0]
 */
export function hslToRgb (h: number, s: number, l: number): number[] {
  const q = l < 0.5 ? l * (s + 1) : l + s - l * s
  const p = l * 2 - q

  return [h + 1 / 3, h, h - 1 / 3]
    .map((v) => {
      if (v < 0) v += 1
      if (v > 1) v -= 1
      if (v < 1 / 6) return p + (q - p) * 6 * v
      if (v < 1 / 2) return q
      if (v < 2 / 3) return p + (q - p) * (2 / 3 - v) * 6
      return p
    })
}
