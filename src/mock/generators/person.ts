import { clamp, defaultTo } from '../utils'
import { integer } from './basic'
import { oneOf } from './complex'
import { FIRST_NAMES, LAST_NAMES } from '../constants'

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
 * Returns a name
 *
 * @example
 * name()
 * // => 'Ronnie Howard'
 */
export function name () {
  return firstName() + ' ' + lastName()
}

/**
 * Returns a first name
 *
 * @example
 * firstName()
 * // => 'Evie'
 */
export function firstName () {
  return oneOf(FIRST_NAMES)
}

/**
 * Returns a last name
 *
 * @example
 * lastName()
 * // => 'Parker'
 */
export function lastName () {
  return oneOf(LAST_NAMES)
}
