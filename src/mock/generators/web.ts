import { integer, string } from './basic'
import { pools, PROTOCOLS, TLDS } from '../constants'
import { oneOf } from './complex'
import { word } from './text'
import { clamp, defaultTo } from '../utils'

/**
 * Returns a protocol
 *
 * @example
 *
 * protocol()
 * // => 'http'
 */
export function protocol (): string {
  return oneOf(PROTOCOLS.split(' '))
}

/**
 * Returns a tld
 *
 * @example
 *
 * tld()
 * // => 'hk'
 */
export function tld (): string {
  return oneOf(TLDS.split(' '))
}

/**
 * Returns an ip address
 *
 * @example
 *
 * ip()
 * // => '233.173.228.16
 */
export function ip (): string {
  return Array
    .from({ length: 4 })
    .map(() => integer(0, 255))
    .join('.')
}

/**
 * Returns an ipv6 address
 *
 * @example
 *
 * ipv6()
 * // => 'b35c:9ff1:66d4:607e:4e7e:b3e7:36d:f7f3
 */
export function ipv6 (): string {
  return Array
    .from({ length: 8 })
    .map(() => integer(0, 65535).toString(16))
    .join(':')
}

/**
 * Returns a port number
 *
 * @example
 *
 * port()
 * // => 5286
 */
export function port (min?: number, max?: number): number {
  min = clamp(defaultTo(min, 0), 0, 65535)
  max = clamp(defaultTo(max, 65535), 0, 65535)

  return integer(min, max)
}

/**
 * Returns a domain
 *
 * @example
 *
 * domain()
 * // => 'xfoekq.cn'
 *
 * domain('hk')
 * // => 'voewpzn.hk'
 */
export function domain (_tld?: string) {
  return word() + '.' + (_tld || tld())
}

/**
 * Returns a pathname
 *
 * @example
 * pathname()
 * // => '/o8qpgvk/ask2ih/cey'
 *
 * pathname(2)
 * // => '/qutmva/flq2'
 */
export function pathname (length?: number) {
  length = defaultTo(length, integer(1, 6))

  return Array
    .from({ length })
    .map(() => string(pools.letter + pools.number, 1, 8))
    .join('/')
}

/**
 * Returns an url
 *
 * @example
 *
 * url()
 * // => 'mailto://wobiq.com/jqpvk/qogx'
 *
 * url('https')
 * // => 'https://ieyqjo.org/cktoqm/zlire/aw/gaoq'
 *
 * url('https', 'github.com')
 * // => 'https://github.com/owiytj/akwpt/bns'
 *
 * url('https', 'github.com', 'varHarrie')
 * // => 'https://github.com/varHarrie/nchgyuel/aj/qigpjvr'
 */
export function url (_protocol?: string, host?: string, prefix?: string): string {
  _protocol = defaultTo(_protocol, protocol())
  host = defaultTo(host, domain())
  const path = defaultTo(prefix, '') + pathname()

  return _protocol + '://' + host + path
}

/**
 * Return a email address
 *
 * @example
 *
 * email()
 * // => 'rih.zqgll'
 *
 * email('gmail.com')
 * // => 'bqignwo.qzu@gmail.com'
 */
export function email (_domain?: string) {
  const head = Array
      .from({ length: integer(1, 2) })
      .map(() => string(pools.username, 1, 8))
      .join('.')

  return head + '@' + (_domain || domain())
}
