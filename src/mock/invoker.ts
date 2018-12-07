import { MOCKABLE } from './constants'
import { Func } from './utils'

export type Invoker<T = any, R = any> = (this: T) => R

export function createInvoker<T = any, R = any> (fn: Func<R>, args: any[]): Invoker<T, R> {
  return function (this: T) {
    return fn.apply(this, args)
  }
}

export function createDecorator (fn: Func, args: any[]): PropertyDecorator {
  return (target: any, propertyKey: string | symbol) => {
    const invoker = createInvoker(fn, args)

    target[MOCKABLE] = target[MOCKABLE]
      ? { ...target[MOCKABLE], [propertyKey]: invoker }
      : { [propertyKey]: invoker }
  }
}
