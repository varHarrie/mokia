import * as generators from '../generators'
import { createDecorator } from '../invoker'

export function uuid (): PropertyDecorator {
  return createDecorator(generators.uuid, [])
}

export function increment (step?: number): PropertyDecorator
export function increment (...args: any[]): PropertyDecorator {
  return createDecorator(generators.increment, args)
}
