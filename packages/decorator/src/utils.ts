/**
 * Any function type
 */
export type AnyFunction<T = unknown> = (...args: unknown[]) => T;

/**
 * Create a decorator
 */
export function createDecorator<F extends AnyFunction>(fn: F, args: unknown[]): () => ReturnType<F> {
  return () => fn(...args) as ReturnType<F>;
}
