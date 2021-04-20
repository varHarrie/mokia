import { pick as _pick } from 'lodash';
import { defaultTo } from './utils';
import { integer } from './basic';
import { AnyFunction } from './types';

export function iterate<T>(iterator: AnyFunction<T>, length?: number): T[];
export function iterate<T>(iterator: AnyFunction<T>, min?: number, max?: number): T[];
export function iterate<T>(iterator: AnyFunction<T>, n1?: number, n2?: number): T[] {
  const count = integer(defaultTo(n1, 0), defaultTo(n2, n1, 10));
  const result: T[] = [];

  for (let i = 0; i < count; i += 1) {
    result.push(iterator(i));
  }

  return result;
}

export function oneOf<T>(list: T[]): T {
  const index = integer(0, list.length - 1);
  return list[index];
}

export function manyOf<T>(list: T[], length?: number): T[];
export function manyOf<T>(list: T[], min: number, max: number): T[];
export function manyOf<T>(list: T[], n1?: number, n2?: number): T[] {
  const count = integer(defaultTo(n1, 0), defaultTo(n2, n1, list.length));

  return Array.from(list)
    .sort(() => Math.random() - 0.5)
    .slice(0, count);
}

export function pick<T extends Record<string, unknown>>(obj: T, length?: number): Partial<T>;
export function pick<T extends Record<string, unknown>>(obj: T, min: number, max: number): Partial<T>;
export function pick<T extends Record<string, unknown>>(obj: T, props: string[]): Partial<T>;
export function pick<T extends Record<string, unknown>>(obj: T, n1?: string[] | number, n2?: number): Partial<T> {
  const props = Array.isArray(n1) ? n1 : manyOf(Object.keys(obj), (n1 as number) ?? 1, n2 as number);
  return _pick(obj, props) as Partial<T>;
}
