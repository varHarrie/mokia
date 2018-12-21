import * as decorators from './decorators'
import * as generators from './generators'
import * as helpers from './helpers'
import { pools } from './constants'

type Mock = typeof helpers.execute
  & typeof helpers
  & typeof generators

// tslint:disable-next-line:prefer-object-spread
const mock: Mock = Object.assign(helpers.execute, helpers, generators)

export { decorators, mock, pools }
