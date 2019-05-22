import * as generators from '../generators'
import { createDecorator } from '../invoker'

export function by (generator: (g: typeof generators) => any): PropertyDecorator {
  return createDecorator(generator, [generators])
}
