import { generate } from './generators'
import { getMockable, Mockable } from './mockable'
import { pickProps } from './utils'

type Proto<T> = T extends new (...args: any[]) => infer R ? R : T

export function mixin<P> (proto: P, props: string | string[]): Proto<P>
export function mixin<P1, P2> (p1: P1, p2: P2, props: string | string[]): Proto<P1> & Proto<P2>
export function mixin<P1, P2, P3> (p1: P1, p2: P2, p3: P3, props: string | string[]): Proto<P1> & Proto<P2> & Proto<P3>
export function mixin<P1, P2, P3, P4> (p1: P1, p2: P2, p3: P3, p4: P4, props: string | string[]): Proto<P1> & Proto<P2> & Proto<P3> & Proto<P4>
export function mixin (...protos: any[]): Mockable
export function mixin (...protos: any[]): Mockable {
  const last = protos[protos.length - 1]
  const props = typeof last === 'string' || Array.isArray(last)
    ? protos.pop()
    : null

  const mockables = protos.map((proto) => getMockable(proto))
  const mockable = Object.assign({}, ...mockables)

  return props
    ? pickProps(mockable, props)
    : mockable
}

export function execute<P> (proto: P, props: string | string[]): Proto<P>
export function execute<P1, P2> (p1: P1, p2: P2, props: string | string[]): Proto<P1> & Proto<P2>
export function execute<P1, P2, P3> (p1: P1, p2: P2, p3: P3, props: string | string[]): Proto<P1> & Proto<P2> & Proto<P3>
export function execute<P1, P2, P3, P4> (p1: P1, p2: P2, p3: P3, p4: P4, props: string | string[]): Proto<P1> & Proto<P2> & Proto<P3> & Proto<P4>
export function execute (...protos: any[]): any
export function execute (...protos: any[]): any {
  const mockable = mixin(...protos)
  return generate(mockable)
}
