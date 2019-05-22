import * as generators from '../generators'
import { createDecorator } from '../invoker'
import { DateType } from '../utils'

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

export function timestamp (): PropertyDecorator
export function timestamp (max: DateType): PropertyDecorator
export function timestamp (min: DateType, max: DateType): PropertyDecorator
export function timestamp (min?: DateType, max?: DateType): PropertyDecorator
export function timestamp (...args: any[]): PropertyDecorator {
  return createDecorator(generators.timestamp, args)
}
