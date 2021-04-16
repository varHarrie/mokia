/**
 * Any function type
 */
export type AnyFunction<T = unknown> = (...args: unknown[]) => T;

/**
 * Date like type
 */
export type DateLike = number | string | Date;

/**
 * Mock result
 */
export type MockResult<T> = T extends (...args: any) => infer R ? R : T extends Array<infer I> ? Array<MockResult<I>> : T extends object ? { [K in keyof T]: MockResult<T[K]> } : T;
