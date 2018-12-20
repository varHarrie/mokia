import * as generators from '../generators'
import { createDecorator } from '../invoker'

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
