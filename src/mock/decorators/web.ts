import * as generators from '../generators'
import { createDecorator } from '../invoker'

export function protocol (): PropertyDecorator {
  return createDecorator(generators.protocol, [])
}

export function tld (): PropertyDecorator {
  return createDecorator(generators.tld, [])
}

export function ip (): PropertyDecorator {
  return createDecorator(generators.ip, [])
}

export function ipv6 (): PropertyDecorator {
  return createDecorator(generators.ipv6, [])
}

export function port (min?: number, max?: number): PropertyDecorator
export function port (...args: any[]): PropertyDecorator {
  return createDecorator(generators.port, args)
}

export function domain (tld?: string): PropertyDecorator
export function domain (...args: any[]): PropertyDecorator {
  return createDecorator(generators.domain, args)
}

export function pathname (length?: number): PropertyDecorator
export function pathname (...args: any[]): PropertyDecorator {
  return createDecorator(generators.pathname, args)
}

export function url (protocol?: string, host?: string, prefix?: string): PropertyDecorator
export function url (...args: any[]): PropertyDecorator {
  return createDecorator(generators.url, args)
}

export function email (domain?: string): PropertyDecorator
export function email (...args: any[]): PropertyDecorator {
  return createDecorator(generators.email, args)
}
