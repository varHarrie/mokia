import * as generators from '../generators'
import { createDecorator } from '../invoker'
import { DateType } from '../utils'

export function boolean (chance?: number, value?: boolean): PropertyDecorator
export function boolean (...args: any[]): PropertyDecorator {
  return createDecorator(generators.boolean, args)
}

export function integer (max?: number): PropertyDecorator
export function integer (min: number, max: number): PropertyDecorator
export function integer (...args: any[]): PropertyDecorator {
  return createDecorator(generators.integer, args)
}

export function natural (max?: number): PropertyDecorator
export function natural (min: number, max: number): PropertyDecorator
export function natural (...args: any[]): PropertyDecorator {
  return createDecorator(generators.natural, args)
}

export function float (max?: number): PropertyDecorator
export function float (min: number, max: number): PropertyDecorator
export function float (min: number, max: number, fixed: number): PropertyDecorator
export function float (min: number, max: number, dmin: number, dmax: number): PropertyDecorator
export function float (...args: any[]): PropertyDecorator {
  return createDecorator(generators.float, args)
}

export function char (pool: string): PropertyDecorator
export function char (...args: any[]): PropertyDecorator {
  return createDecorator(generators.char, args)
}

export function string (pool: string, length?: number): PropertyDecorator
export function string (pool: string, min: number, max: number): PropertyDecorator
export function string (...args: any[]): PropertyDecorator {
  return createDecorator(generators.string, args)
}

export function word (length?: number): PropertyDecorator
export function word (min: number, max: number): PropertyDecorator
export function word (...args: any[]): PropertyDecorator {
  return createDecorator(generators.word, args)
}

export function title (length?: number): PropertyDecorator
export function title (min: number, max: number): PropertyDecorator
export function title (...args: any[]): PropertyDecorator {
  return createDecorator(generators.title, args)
}

export function sentence (length?: number): PropertyDecorator
export function sentence (min: number, max: number): PropertyDecorator
export function sentence (...args: any[]): PropertyDecorator {
  return createDecorator(generators.sentence, args)
}

export function paragraph (length?: number): PropertyDecorator
export function paragraph (min: number, max: number): PropertyDecorator
export function paragraph (...args: any[]): PropertyDecorator {
  return createDecorator(generators.paragraph, args)
}

export function passage (length?: number): PropertyDecorator
export function passage (min: number, max: number): PropertyDecorator
export function passage (...args: any[]): PropertyDecorator {
  return createDecorator(generators.passage, args)
}

export function datetime (format?: string): PropertyDecorator
export function datetime (format: string, max: DateType): PropertyDecorator
export function datetime (format: string, min: DateType, max: DateType): PropertyDecorator
export function datetime (format?: string, min?: DateType, max?: DateType): PropertyDecorator
export function datetime (...args: any[]): PropertyDecorator {
  return createDecorator(generators.datetime, args)
}

export function date (format?: string): PropertyDecorator
export function date (format: string, max: DateType): PropertyDecorator
export function date (format: string, min: DateType, max: DateType): PropertyDecorator
export function date (format?: string, min?: DateType, max?: DateType): PropertyDecorator
export function date (...args: any[]): PropertyDecorator {
  return createDecorator(generators.date, args)
}

export function time (format?: string): PropertyDecorator
export function time (format: string, max: DateType): PropertyDecorator
export function time (format: string, min: DateType, max: DateType): PropertyDecorator
export function time (format?: string, min?: DateType, max?: DateType): PropertyDecorator
export function time (...args: any[]): PropertyDecorator {
  return createDecorator(generators.time, args)
}

export function now (format?: string): PropertyDecorator
export function now (...args: any[]): PropertyDecorator {
  return createDecorator(generators.now, args)
}

export function image (size?: string): PropertyDecorator
export function image (size: string, text: string): PropertyDecorator
export function image (size: string, text: string, background: string): PropertyDecorator
export function image (size: string, text: string, background: string, foreground: string): PropertyDecorator
export function image (size: string, text: string, background: string, foreground: string, format: 'png' | 'jpg' | 'gif'): PropertyDecorator
export function image (...args: any[]): PropertyDecorator {
  return createDecorator(generators.image, args)
}

export function dataImage (size?: string): PropertyDecorator
export function dataImage (size: string, text: string): PropertyDecorator
export function dataImage (size: string, text: string, background: string): PropertyDecorator
export function dataImage (size: string, text: string, background: string, foreground: string): PropertyDecorator
export function dataImage (size: string, text: string, background: string, foreground: string, format: 'png' | 'jpg' | 'gif'): PropertyDecorator
export function dataImage (...args: any[]): PropertyDecorator {
  return createDecorator(generators.dataImage, args)
}

export function uuid (): PropertyDecorator {
  return createDecorator(generators.uuid, [])
}

export function increment (step?: number): PropertyDecorator
export function increment (...args: any[]): PropertyDecorator {
  return createDecorator(generators.increment, args)
}

export function protocol (): PropertyDecorator {
  return createDecorator(generators.protocol, [])
}

export function tld (): PropertyDecorator {
  return createDecorator(generators.tld, [])
}

export function ip (): PropertyDecorator {
  return createDecorator(generators.ip, [])
}

export function ipv6 (): PropertyDecorator {
  return createDecorator(generators.ipv6, [])
}

export function port (min?: number, max?: number): PropertyDecorator
export function port (...args: any[]): PropertyDecorator {
  return createDecorator(generators.port, args)
}

export function domain (tld?: string): PropertyDecorator
export function domain (...args: any[]): PropertyDecorator {
  return createDecorator(generators.domain, args)
}

export function pathname (length?: number): PropertyDecorator
export function pathname (...args: any[]): PropertyDecorator {
  return createDecorator(generators.pathname, args)
}

export function url (protocol?: string, host?: string, prefix?: string): PropertyDecorator
export function url (...args: any[]): PropertyDecorator {
  return createDecorator(generators.url, args)
}

export function email (domain?: string): PropertyDecorator
export function email (...args: any[]): PropertyDecorator {
  return createDecorator(generators.email, args)
}

export function hex (): PropertyDecorator {
  return createDecorator(generators.hex, [])
}

export function rgb (): PropertyDecorator {
  return createDecorator(generators.rgb, [])
}

export function rgba (): PropertyDecorator {
  return createDecorator(generators.rgba, [])
}

export function hsl (): PropertyDecorator {
  return createDecorator(generators.hsl, [])
}

export function color (): PropertyDecorator {
  return createDecorator(generators.color, [])
}

export function array<T> (proto: T, length?: number): PropertyDecorator
export function array<T> (proto: T, min: number, max: number): PropertyDecorator
export function array<T> (proto: T, n1?: number, n2?: number): PropertyDecorator
export function array (...args: any[]): PropertyDecorator {
  return createDecorator(generators.array, args)
}

export function oneOf<T> (list: T[]): PropertyDecorator
export function oneOf (...args: any[]): PropertyDecorator {
  return createDecorator(generators.oneOf, args)
}

export function manyOf<T> (list: T[], length?: number): PropertyDecorator
export function manyOf<T> (list: T[], min: number, max: number): PropertyDecorator
export function manyOf<T> (list: T[], n1?: number, n2?: number): PropertyDecorator
export function manyOf (...args: any[]): PropertyDecorator {
  return createDecorator(generators.manyOf, args)
}

export function pick<T extends object> (proto: T, props?: string): PropertyDecorator
export function pick<T extends object> (proto: T, props: string[]): PropertyDecorator
export function pick<T extends object> (proto: T, length?: number): PropertyDecorator
export function pick<T extends object> (proto: T, min: number, max: number): PropertyDecorator
export function pick<T extends object> (proto: T, n1?: any, n2?: any): PropertyDecorator
export function pick (...args: any[]): PropertyDecorator {
  return createDecorator(generators.manyOf, args)
}
