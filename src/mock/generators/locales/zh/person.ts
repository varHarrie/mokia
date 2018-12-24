import { FIRST_NAMES, LAST_NAMES, PHONE_PREFIX } from './constants'
import { char, integer, string } from '../../basic'
import { NUMBERS, pools } from '../../../constants'
import { birthday } from '../../person'
import { oneOf } from '../../complex'

/**
 * Returns a full name
 *
 * @example
 * fullName()
 * // => '陶楷呈'
 */
export function fullName (): string {
  return firstName() + lastName()
}

/**
 * Returns a first name
 *
 * @example
 * firstName()
 * // => '于'
 */
export function firstName (): string {
  return oneOf(FIRST_NAMES.split(' '))
}

/**
 * Returns a last name
 *
 * @example
 * lastName()
 * // => '文函'
 */
export function lastName (): string {
  return oneOf(LAST_NAMES.split(' '))
}

/**
 * Returns a phone number
 *
 * @example
 * phone()
 * // => '13897496187'
 */
export function phone (): string {
  return oneOf(PHONE_PREFIX.split(' ')) + string(NUMBERS, 8)
}

/**
 * Returns an id number
 *
 * @example
 * // => '44156197601061635'
 */
export function idNumber (): string {
  const prefix = char(pools.positive) + string(pools.number, 5)
  const suffix = string(pools.number, 3) + char('0123456789x')

  return prefix + birthday('YYYYMMDD') + suffix
}
