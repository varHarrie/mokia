import * as generators from './generators'
import { createDecorator, InvokerDecorator } from './invoker'
import { DateType } from './utils'

export function boolean (chance?: number, value?: boolean): InvokerDecorator
export function boolean (...args: any[]): InvokerDecorator {
  return createDecorator(generators.boolean, args)
}

export function integer (max?: number): InvokerDecorator
export function integer (min: number, max: number): InvokerDecorator
export function integer (...args: any[]): InvokerDecorator {
  return createDecorator(generators.integer, args)
}

export function natural (max?: number): InvokerDecorator
export function natural (min: number, max: number): InvokerDecorator
export function natural (...args: any[]): InvokerDecorator {
  return createDecorator(generators.natural, args)
}

export function float (max?: number): InvokerDecorator
export function float (min: number, max: number): InvokerDecorator
export function float (min: number, max: number, fixed: number): InvokerDecorator
export function float (min: number, max: number, dmin: number, dmax: number): InvokerDecorator
export function float (...args: any[]): InvokerDecorator {
  return createDecorator(generators.float, args)
}

export function char (pool: string): InvokerDecorator
export function char (...args: any[]): InvokerDecorator {
  return createDecorator(generators.char, args)
}

export function string (pool: string, length?: number): InvokerDecorator
export function string (pool: string, min: number, max: number): InvokerDecorator
export function string (...args: any[]): InvokerDecorator {
  return createDecorator(generators.string, args)
}

export function datetime (format?: string): InvokerDecorator
export function datetime (format: string, max: DateType): InvokerDecorator
export function datetime (format: string, min: DateType, max: DateType): InvokerDecorator
export function datetime (format?: string, min?: DateType, max?: DateType): InvokerDecorator
export function datetime (...args: any[]): InvokerDecorator {
  return createDecorator(generators.datetime, args)
}

export function date (format?: string): InvokerDecorator
export function date (format: string, max: DateType): InvokerDecorator
export function date (format: string, min: DateType, max: DateType): InvokerDecorator
export function date (format?: string, min?: DateType, max?: DateType): InvokerDecorator
export function date (...args: any[]): InvokerDecorator {
  return createDecorator(generators.date, args)
}

export function time (format?: string): InvokerDecorator
export function time (format: string, max: DateType): InvokerDecorator
export function time (format: string, min: DateType, max: DateType): InvokerDecorator
export function time (format?: string, min?: DateType, max?: DateType): InvokerDecorator
export function time (...args: any[]): InvokerDecorator {
  return createDecorator(generators.time, args)
}

export function now (format?: string): InvokerDecorator
export function now (...args: any[]): InvokerDecorator {
  return createDecorator(generators.now, args)
}

export function image (size?: string): InvokerDecorator
export function image (size: string, text: string): InvokerDecorator
export function image (size: string, text: string, background: string): InvokerDecorator
export function image (size: string, text: string, background: string, foreground: string): InvokerDecorator
export function image (size: string, text: string, background: string, foreground: string, format: 'png' | 'jpg' | 'gif'): InvokerDecorator
export function image (...args: any[]): InvokerDecorator {
  return createDecorator(generators.image, args)
}

export function dataImage (size?: string): InvokerDecorator
export function dataImage (size: string, text: string): InvokerDecorator
export function dataImage (size: string, text: string, background: string): InvokerDecorator
export function dataImage (size: string, text: string, background: string, foreground: string): InvokerDecorator
export function dataImage (size: string, text: string, background: string, foreground: string, format: 'png' | 'jpg' | 'gif'): InvokerDecorator
export function dataImage (...args: any[]): InvokerDecorator {
  return createDecorator(generators.dataImage, args)
}

export function array<T> (proto: T, length?: number): InvokerDecorator
export function array<T> (proto: T, min: number, max: number): InvokerDecorator
export function array<T> (proto: T, n1?: number, n2?: number): InvokerDecorator
export function array (...args: any[]): InvokerDecorator {
  return createDecorator(generators.array, args)
}

export function oneOf<T> (list: T[]): InvokerDecorator
export function oneOf (...args: any[]): InvokerDecorator {
  return createDecorator(generators.oneOf, args)
}

export function manyOf<T> (list: T[], length?: number): InvokerDecorator
export function manyOf<T> (list: T[], min: number, max: number): InvokerDecorator
export function manyOf<T> (list: T[], n1?: number, n2?: number): InvokerDecorator
export function manyOf (...args: any[]): InvokerDecorator {
  return createDecorator(generators.manyOf, args)
}

export function pick<T extends object> (proto: T, props?: string): InvokerDecorator
export function pick<T extends object> (proto: T, props: string[]): InvokerDecorator
export function pick<T extends object> (proto: T, length?: number): InvokerDecorator
export function pick<T extends object> (proto: T, min: number, max: number): InvokerDecorator
export function pick<T extends object> (proto: T, n1?: any, n2?: any): InvokerDecorator
export function pick (...args: any[]): InvokerDecorator {
  return createDecorator(generators.manyOf, args)
}
