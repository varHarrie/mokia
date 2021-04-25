/**
 * Returns fallback if value is undefined or null
 */
export function defaultTo<T>(value: unknown, fallback: T): T;
export function defaultTo<T>(v1: unknown, v2: unknown, fallback: T): T;
export function defaultTo<T>(v1: unknown, v2: unknown, v3: unknown, fallback: T): T;
export function defaultTo(...values: unknown[]): unknown {
  const fallback = values.pop();
  const isNumber = typeof fallback === 'number';

  return (
    values.find((value) => {
      if (isNumber) return !Number.isNaN(Number(value)); // Find one is number
      return value !== undefined && value !== null; // Find one is not null or undefined
    }) ?? fallback
  );
}

/**
 * Checks if target is a Class
 */
export function isClass(target: unknown): target is new (...args: unknown[]) => unknown {
  return typeof target === 'function' && /^class\s/.test(Function.prototype.toString.call(target));
}
