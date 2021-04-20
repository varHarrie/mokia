import { clamp, defaultTo } from 'lodash';
import { integer } from './basic';
import { date } from './date';
import { oneOf } from './complex';
import { TEMPLATE_DATE, FIRST_NAMES, LAST_NAMES } from './constants';

const MAX_AGE = 100;

/**
 * Returns an age integer
 */
export function age(min?: number, max?: number): number {
  min = clamp(defaultTo(min, 1), 1, MAX_AGE);
  max = clamp(defaultTo(max, MAX_AGE), 1, MAX_AGE);

  return integer(min, max);
}

/**
 * Returns a birthday string
 */
export function birthday(format?: string): string {
  const min = new Date();
  min.setFullYear(min.getFullYear() - MAX_AGE);

  return date(format ?? TEMPLATE_DATE, min, new Date());
}

/**
 * Returns a first name
 */
export function firstName(): string {
  return oneOf(FIRST_NAMES);
}

/**
 * Returns a last name
 */
export function lastName(): string {
  return oneOf(LAST_NAMES);
}

/**
 * Returns a full name
 */
export function fullName(): string {
  return `${firstName()} ${lastName()}`;
}
