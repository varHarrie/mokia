import * as generators from '../../../generators/locales/zh'
import { createDecorator } from '../../../invoker'

export function fullName (): PropertyDecorator {
  return createDecorator(generators.fullName, [])
}

export function firstName (): PropertyDecorator {
  return createDecorator(generators.firstName, [])
}

export function lastName (): PropertyDecorator {
  return createDecorator(generators.lastName, [])
}

export function phone (): PropertyDecorator {
  return createDecorator(generators.phone, [])
}

export function idNumber (): PropertyDecorator {
  return createDecorator(generators.idNumber, [])
}
