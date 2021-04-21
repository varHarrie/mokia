/**
 * Any function type
 */
export type AnyFunction<T = unknown> = (...args: unknown[]) => T;

/**
 * Date like type
 */
export type DateLike = number | string | Date;
