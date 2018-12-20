import * as generators from '../generators'
import { createDecorator } from '../invoker'

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
