import { clamp } from 'lodash';
import { integer, string } from './basic';
import { oneOf } from './complex';
import { word } from './text';
import { defaultTo } from './utils';
import { LETTERS, LOWERCASE_LETTERS, NUMBERS, PROTOCOLS, TLDS } from './constants';

/**
 * Returns a protocol
 */
export function protocol(): string {
  return oneOf(PROTOCOLS);
}

/**
 * Returns a tld
 */
export function tld(): string {
  return oneOf(TLDS);
}

/**
 * Returns an ip address. eg: "233.173.228.16"
 */
export function ip(): string {
  return Array.from({ length: 4 })
    .map(() => integer(0, 255))
    .join('.');
}

/**
 * Returns an ipv6 address. eg: "b35c:9ff1:66d4:607e:4e7e:b3e7:36d:f7f3"
 */
export function ipv6(): string {
  return Array.from({ length: 8 })
    .map(() => integer(0, 65535).toString(16))
    .join(':');
}

/**
 * Returns a port number
 */
export function port(min?: number, max?: number): number {
  min = clamp(defaultTo(min, 0), 0, 65535);
  max = clamp(defaultTo(max, 65535), 0, 65535);

  return integer(min, max);
}

/**
 * Returns a domain. eg: "xfoekq.cn"
 */
export function domain(_tld?: string): string {
  return `${word()}.${_tld || tld()}`;
}

/**
 * Returns a pathname. eg: "/o8qpgvk/ask2ih/cey"
 */
export function pathname(length?: number): string {
  length = defaultTo(length, integer(1, 6));

  return `/${Array.from({ length })
    .map(() => string(LOWERCASE_LETTERS + NUMBERS, 1, 8))
    .join('/')}`;
}

/**
 * Returns an url. eg: "https://ieyqjo.org/cktoqm/zlire/aw/gaoq"
 */
export function url(prot?: string, host?: string, prefix?: string): string {
  prot = defaultTo(prot, protocol());
  host = defaultTo(host, domain());
  const path = defaultTo(prefix, '') + pathname();

  return `${prot}://${host}${path}`;
}

/**
 * Return a email address. eg: "rih.zqgll@owk.cn"
 */
export function email(_domain?: string): string {
  const head = Array.from({ length: integer(1, 2) })
    .map(() => string(NUMBERS + LETTERS, 1, 8))
    .join('.');

  return `${head}@${_domain || domain()}`;
}
