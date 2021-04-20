import { iterate } from './complex';
import { MockResult } from './types';

export function generate<T>(schema: T): MockResult<T> {
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
