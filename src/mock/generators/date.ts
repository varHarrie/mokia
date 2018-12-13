import * as utils from '../utils'
import { DATE_FORMAT, DATETIME_FORMAT, TIME_FORMAT } from '../constants'

/**
 * Returns a datetime string
 *
 * @example
 *
 * datetime()
 * // => 2007-03-27 18:23:14
 *
 * datetime('YYYY-MM')
 * // => 2001-05
 *
 * datetime('YYYY-MM-DD', '2018-12-31')
 * // => 2014-06-03
 *
 * datetime('YYYY-MM-DD', '2018-12-01', '2018-12-31')
 * // => 2018-12-26
 */
export function datetime (format?: string): string
export function datetime (format: string, max: utils.DateType): string
export function datetime (format: string, min: utils.DateType, max: utils.DateType): string
export function datetime (format?: string, n1?: any, n2?: any): string {
  return utils.formatDate(utils.randomDate(n1, n2), format || DATETIME_FORMAT)
}

/**
 * Returns date string
 */
export function date (format?: string): string
export function date (format: string, max: utils.DateType): string
export function date (format: string, min: utils.DateType, max: utils.DateType): string
export function date (format?: string, min?: any, max?: any): string {
  return datetime(format || DATE_FORMAT, min, max)
}

/**
 * Returns date string
 */
export function time (format?: string): string
export function time (format: string, max: utils.DateType): string
export function time (format: string, min: utils.DateType, max: utils.DateType): string
export function time (format?: string, min?: any, max?: any): string {
  return datetime(format || TIME_FORMAT, min, max)
}

/**
 * Return current datetime string
 */
export function now (format?: string): string {
  return utils.formatDate(new Date(), format || DATETIME_FORMAT)
}
