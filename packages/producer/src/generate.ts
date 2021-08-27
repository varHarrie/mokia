import { iterate } from './complex';
import { isClass } from './utils';

/**
 * Mock result type
 */
export type MockResult<T> = T extends (...args: unknown[]) => infer R
  ? R
  : T extends Array<infer I>
  ? Array<MockResult<I>>
  : T extends Record<string, unknown>
  ? { [K in keyof T]: MockResult<T[K]> }
  : T;

const create = (Constructor: new (...args: unknown[]) => unknown) => new Constructor();

const hasToJson = <T>(obj: T): obj is T & { toJSON: () => unknown } => 'toJSON' in obj && typeof (obj as unknown as { toJSON: unknown }).toJSON === 'function';

/**
 * Returns the generated result according to schema
 */
export function generate<T>(schema: T): MockResult<T> {
  if (isClass(schema)) {
    return generate(create(schema) as T);
  }

  if (typeof schema === 'function') {
    return schema();
  }

  if (Array.isArray(schema)) {
    return schema.map((item) => generate(item)) as MockResult<T>;
  }

  if (schema && typeof schema === 'object') {
    if (hasToJson(schema)) return schema.toJSON() as MockResult<T>;

    const result: Record<string, unknown> = {};

    Object.keys(schema).forEach((key) => {
      result[key] = generate(schema[key]);
    });

    return result as MockResult<T>;
  }

  return schema as MockResult<T>;
}

/**
 * Returns the generated list according to schema
 */
export function list<T>(schema: T, length?: number): Array<MockResult<T>>;
export function list<T>(schema: T, min: number, max: number): Array<MockResult<T>>;
export function list<T>(schema: T, n1?: number, n2?: number): Array<MockResult<T>> {
  return iterate(() => generate(schema), n1, n2);
}
