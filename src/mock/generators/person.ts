import { clamp, defaultTo } from '../utils'
import { integer } from './basic'
import { oneOf } from './complex'
import { DATE_FORMAT, FIRST_NAMES, LAST_NAMES } from '../constants'
import { date } from './date'

/**
 * Returns an age
 *
 * @example
 * age()
 * // => 58
 */
export function age (min?: number, max?: number): number {
  min = clamp(defaultTo(min, 1), 1, 100)
  max = clamp(defaultTo(max, 100), 1, 100)

  return integer(min, max)
}

/**
 * Returns a birthday
 *
 * @example
 * birthday()
 * // => '1975-05-08'
 */
export function birthday (format?: string): string {
  return date(format || DATE_FORMAT, '1900-01-01', Date.now())
}

/**
 * Returns a full name
 *
 * @example
 * fullName()
 * // => 'Ronnie Howard'
 */
export function fullName (): string {
  return firstName() + ' ' + lastName()
}

/**
 * Returns a first name
 *
 * @example
 * firstName()
 * // => 'Evie'
 */
export function firstName (): string {
  return oneOf(FIRST_NAMES)
}

/**
 * Returns a last name
 *
 * @example
 * lastName()
 * // => 'Parker'
 */
export function lastName (): string {
  return oneOf(LAST_NAMES)
}
