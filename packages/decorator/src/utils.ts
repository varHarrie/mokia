import { GENERATION_SCHEMA } from '@mokia/producer';
import { AnyFunction } from './types';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type Decorator = (target?: unknown, propertyKey?: string | symbol) => any;

/**
 * Create a decorator
 */
export function createDecorator<F extends AnyFunction>(fn: F, args: unknown[]): Decorator {
  return (target, propertyKey) => {
    if (target && typeof propertyKey === 'string') {
      const instance = target as { [GENERATION_SCHEMA]?: Record<string, unknown> };
      const original = instance[GENERATION_SCHEMA];
      const decorator = createDecorator(fn, args);

      instance[GENERATION_SCHEMA] = original ? { ...original, [propertyKey]: decorator } : { [propertyKey]: decorator };
      return;
    }

    return fn(...args);
  };
}
