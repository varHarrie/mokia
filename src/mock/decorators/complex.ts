import * as generators from '../generators'
import { createDecorator } from '../invoker'

export function generate (mockable: Function | Object): PropertyDecorator {
  return createDecorator(generators.generate, [mockable])
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
