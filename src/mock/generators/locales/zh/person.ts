import { FIRST_NAMES, LAST_NAMES, PHONE_PREFIX } from './constants'
import { oneOf } from '../..'
import { string } from '../../basic'
import { NUMBERS } from '../../../constants'

/**
 * Returns a full name
 *
 * @example
 * fullName()
 * // => '陶楷呈'
 */
export function fullName () {
  return firstName() + ' ' + lastName()
}

/**
 * Returns a first name
 *
 * @example
 * firstName()
 * // => '于'
 */
export function firstName () {
  return oneOf(FIRST_NAMES.split(' '))
}

/**
 * Returns a last name
 *
 * @example
 * lastName()
 * // => '文函'
 */
export function lastName () {
  return oneOf(LAST_NAMES.split(' '))
}

/**
 * Returns a phone number
 *
 * @example
 * phone()
 * // => 13897496187
 */
export function phone () {
  return oneOf(PHONE_PREFIX.split('')) + string(NUMBERS, 8)
}
