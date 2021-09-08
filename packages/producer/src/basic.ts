import { clamp } from 'lodash';
import { NUMBERS, POSITIVE_NUMBERS, CHARS } from './constants';
import { defaultTo } from './utils';

/**
 * Make sure to return an integer
 */
function ensureInteger(value: unknown, defaultValue: number = 0): number {
  const num = Number(value);
  return Math.floor(isNaN(num) ? defaultValue : num);
}

/**
 * Make sure to return an natural
 */
function ensureNatural(value: unknown, defaultValue: number = 0): number {
  const num = ensureInteger(value, defaultValue);
  return num < 0 ? 0 : num;
}

/**
 * Returns an boolean value
 */
export function boolean(chance?: number): boolean {
  return Math.random() < clamp(chance ?? 0.5, 0, 1);
}

/**
 * Returns an integer
 */
export function integer(max?: number): number;
export function integer(min: number, max: number): number;
export function integer(n1?: number, n2?: number): number {
  if (n2 === undefined) {
    n2 = ensureInteger(n1, Number.MAX_SAFE_INTEGER);
    n1 = 0;
  } else {
    n1 = ensureInteger(n1);
    n2 = ensureInteger(n2, Number.MAX_SAFE_INTEGER);
  }

  const min = Math.min(n1, n2);
  const max = Math.max(n1, n2);

  return Math.round(Math.random() * (max - min)) + min;
}

/**
 * Returns an natural number
 */
export function natural(max?: number): number;
export function natural(min: number, max: number): number;
export function natural(n1?: number, n2?: number): number {
  if (n2 === undefined) {
    n2 = ensureNatural(n1, Number.MAX_SAFE_INTEGER);
    n1 = 0;
  } else {
    n1 = ensureNatural(n1);
    n2 = ensureNatural(n2, Number.MAX_SAFE_INTEGER);
  }

  const min = Math.min(n1, n2);
  const max = Math.max(n1, n2);

  return Math.round(Math.random() * (max - min)) + min;
}

/**
 * Returns a float number
 */
export function float(max?: number): number;
export function float(min: number, max: number): number;
export function float(min: number, max: number, fixed: number): number;
export function float(min: number, max: number, dMin: number, dMax: number): number;
export function float(n1?: number, n2?: number, n3?: number, n4?: number): number {
  if (n2 === undefined) {
    n2 = ensureInteger(n1, 100);
    n1 = 0;
  } else {
    n1 = ensureInteger(n1);
    n2 = ensureInteger(n2, 100);
  }

  const min = Math.min(n1, n2);
  const max = Math.max(n1, n2);
  const int = integer(min, max);

  const dMin = defaultTo(n3, 1);
  const dMax = defaultTo(n4, n3, 2);
  const dLen = natural(dMin, dMax);
  const dec = dLen > 0 ? string(NUMBERS, dLen - 1) + char(POSITIVE_NUMBERS) : '';

  return parseFloat(`${int}.${dec}`);
}

/**
 * Returns a char
 */
export function char(pool?: string): string {
  pool = pool ?? CHARS;
  return pool.charAt(natural(pool.length - 1));
}

/**
 * Returns a string
 */
export function string(length?: number): string;
export function string(pool: string, length?: number): string;
export function string(pool: string, min: number, max: number): string;
export function string(arg: unknown, n1?: number, n2?: number): string {
  let pool = CHARS;

  if (arg === undefined || typeof arg === 'number') {
    n1 = arg ?? 1;
    n2 = arg ?? 10;
  } else {
    pool = arg as string;

    if (n2 === undefined) {
      n2 = defaultTo(n1, 10);
      n1 = defaultTo(n1, 1);
    } else {
      n1 = defaultTo(n1, 1);
      n2 = defaultTo(n2, 10);
    }
  }

  const min = Math.min(n1 as number, n2);
  const max = Math.max(n1 as number, n2);

  const len = natural(min, max);
  let text = '';

  for (let i = 0; i < len; i += 1) {
    text += char(pool);
  }

  return text;
}
