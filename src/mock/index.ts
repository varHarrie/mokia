import * as decorators from './decorators'
import * as generators from './generators'
import * as helpers from './helpers'
import { pools } from './constants'

type Mock = typeof helpers & typeof generators

const mock: Mock = { ...generators, ...helpers }

export { decorators, mock, pools }
