import * as decorators from './decorators'
import * as generators from './generators'
import mockFn from './mock'
import { POOLS as pools } from './constants'

type Mock = typeof mockFn & typeof generators

const mock: Mock = mockFn as any
const mockAny: any = mock

Object.keys(generators).forEach((key) => {
  mockAny[key] = (generators as any)[key]
})

export { decorators, generators, mock, pools }
