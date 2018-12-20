import * as generators from '../generators'
import { createDecorator } from '../invoker'

export function age (min?: number, max?: number): PropertyDecorator
export function age (...args: any[]): PropertyDecorator {
  return createDecorator(generators.age, args)
}

export function name (): PropertyDecorator {
  return createDecorator(generators.name, [])
}

export function firstName (): PropertyDecorator {
  return createDecorator(generators.firstName, [])
}

export function lastName (): PropertyDecorator {
  return createDecorator(generators.lastName, [])
}
