import { iterate } from './complex';
import { isClass } from './utils';

export const GENERATION_SCHEMA = Symbol('GENERATION_SCHEMA');

export type MockResult<T> = T extends (...args: unknown[]) => infer R
  ? R
  : T extends Array<infer I>
  ? Array<MockResult<I>>
  : T extends Record<string, unknown>
  ? { [K in keyof T]: MockResult<T[K]> }
  : T;

export function generate<T>(schema: T): MockResult<T> {
  if (isClass(schema)) {
    // eslint-disable-next-line new-cap
    const instance = new schema() as { [GENERATION_SCHEMA]?: unknown };
    return generate((instance[GENERATION_SCHEMA] ?? instance) as T);
  }

  if (typeof schema === 'function') {
    return schema();
  }

  if (Array.isArray(schema)) {
    return schema.map((item) => generate(item)) as MockResult<T>;
  }

  if (schema && typeof schema === 'object') {
    const result: Record<string, unknown> = {};

    Object.keys(schema).forEach((key) => {
      result[key] = generate(schema[key]);
    });

    return result as MockResult<T>;
  }

  return schema as MockResult<T>;
}

export function list<T>(schema: T, length?: number): Array<MockResult<T>>;
export function list<T>(schema: T, min: number, max: number): Array<MockResult<T>>;
export function list<T>(schema: T, n1?: number, n2?: number): Array<MockResult<T>> {
  return iterate(() => generate(schema), n1, n2);
}
