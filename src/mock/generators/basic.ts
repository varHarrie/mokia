import * as utils from '../utils'
import { MAX_INTEGER, pools } from '../constants'

/**
 * Returns boolean value
 *
 * @example
 *
 * boolean()
 * // => true / false
 *
 * boolean(1)
 * // => true
 *
 * boolean(1, false)
 * // => false
 */
export function boolean (chance: number = 0.5, value: boolean = true): boolean {
  chance = Math.min(Math.max(chance, 0), 1)

  return Math.random() < chance ? Boolean(value) : !value
}

/**
 * Returns an integer
 *
 * @example
 *
 * integer()
 * // => -MAX_INTEGER ~ MAX_INTEGER
 *
 * integer(100)
 * // => 0 ~ 100
 *
 * integer(100, 200)
 * // => 100 ~ 200
 */
export function integer (max?: number): number
export function integer (min: number, max: number): number
export function integer (n1?: any, n2?: any): number {
  if (n2 === undefined) {
    n2 = utils.ensureInteger(n1, MAX_INTEGER)
    n1 = n1 === undefined ? -MAX_INTEGER : 0
  } else {
    n1 = parseInt(n1, 10)
    n2 = parseInt(n2, 10)
  }

  const min = Math.min(n1, n2)
  const max = Math.max(n1, n2)

  return Math.round(Math.random() * (max - min)) + min
}

/**
 * Returns a natural number
 *
 * @example
 *
 * natural()
 * // => 0 ~ MAX_INTEGER
 *
 * natural(100)
 * // => 0 ~ 100
 *
 * natural(100, 200)
 * // => 100 ~ 200
 */
export function natural (max?: number): number
export function natural (min: number, max: number): number
export function natural (n1?: any, n2?: any): number {
  if (n2 === undefined) {
    n2 = utils.ensureNatural(n1, MAX_INTEGER)
    n1 = 0
  } else {
    n1 = utils.ensureNatural(n1)
    n2 = utils.ensureNatural(n2)
  }

  const min = Math.min(n1, n2)
  const max = Math.max(n1, n2)

  return Math.round(Math.random() * (max - min)) + min
}

/**
 * Returns a float number
 *
 */
export function float (max?: number): number
export function float (min: number, max: number): number
export function float (min: number, max: number, fixed: number): number
export function float (min: number, max: number, dmin: number, dmax: number): number
export function float (n1?: any, n2?: any, n3?: any, n4?: any): number {

  const min = utils.defaultBy(n2, utils.defaultTo(n1, 0), 0)
  const max = utils.defaultTo(n2, utils.defaultTo(n1, 100))
  const dmin = utils.defaultTo(n3, 1)
  const dmax = utils.defaultTo(n4, utils.defaultTo(n3, 3))

  const decLen = integer(dmin, dmax)
  const int = integer(min, max)
  const dec = decLen > 0 ? string(pools.number, decLen - 1) + char(pools.positive) : ''

  return parseFloat(`${int}.${dec}`)
}

/**
 * Returns a char
 *
 * @example
 *
 * char()
 * // => 'v'
 *
 * char('0123456789')
 * // => '6'
 */
export function char (pool: string): string {
  return pool.charAt(natural(pool.length - 1))
}

/**
 * Returns a string
 *
 * @example
 *
 * string('abcd')
 * // => 'baddcdabac'
 *
 * string('abcd', 5)
 * // => 'cadbd'
 *
 * string('abcd', 3, 10)
 * // => 'bdabcc'
 */
export function string (pool: string, length?: number): string
export function string (pool: string, min: number, max: number): string
export function string (pool: any, n1?: any, n2?: any): string {
  const max = utils.defaultTo(n2, utils.defaultTo(n1, 10))
  const min = utils.defaultTo(n1, 0)

  const len = natural(min, max)
  let text = ''

  for (let i = 0; i < len; i++) {
    text += char(pool)
  }

  return text
}
