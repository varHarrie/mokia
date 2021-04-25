import { AnyFunction } from './types';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type Decorator = (target?: unknown, propertyKey?: string | symbol) => any;

const DecoratedProps = Symbol('DecoratedProps');

type TargetType = Record<string, unknown> & { [DecoratedProps]: string[] };

function toJSON(this: TargetType) {
  return Array.from(new Set([...Object.keys(this), ...this[DecoratedProps]])).reduce((obj, prop) => {
    obj[prop] = typeof this[prop] === 'function' || prop.startsWith('__') ? undefined : this[prop];
    return obj;
  }, {} as Record<string, unknown>);
}

/**
 * Create a decorator
 */
export function createDecorator<F extends AnyFunction>(fn: F, args: unknown[]): Decorator {
  return (target: TargetType, propertyKey: string) => {
    if (target && typeof propertyKey === 'string') {
      if (!('toJSON' in target)) target.toJSON = toJSON;
      if (!(DecoratedProps in target)) target[DecoratedProps] = [];

      target[DecoratedProps].push(propertyKey);

      const privateKey = `__${propertyKey}`;

      Object.defineProperty(target, propertyKey, {
        get() {
          return (this[privateKey] = this[privateKey] ?? fn(...args));
        },
        set(val) {
          this[privateKey] = val;
        },
        configurable: true,
        enumerable: true,
      });

      return;
    }

    return fn(...args);
  };
}
