import dayjs from 'dayjs'

export const MAX_INTEGER = 9007199254740992

const BASE_POOLS = {
  symbol: '!@#$%^&*()-_=+[]{}<>',
  positive: '123456789',
  number: '0123456789',
  lower: 'abcdefghijklmnopqrstuvwxyz',
  upper: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
}

export const POOLS = {
  ...BASE_POOLS,
  letter: BASE_POOLS.lower + BASE_POOLS.upper,
  word:  BASE_POOLS.lower + BASE_POOLS.upper + BASE_POOLS.number,
  all: BASE_POOLS.lower + BASE_POOLS.upper + BASE_POOLS.number + BASE_POOLS.symbol
}

export const DATETIME_FORMAT = 'YYYY-MM-DD HH:mm:ss'
export const DATE_FORMAT = 'YYYY-MM-DD'
export const TIME_FORMAT = 'HH:mm:ss'
export const MIN_DATE = new Date(0) // 1970-01-01
export const MAX_DATE = dayjs().add(10, 'year').toDate() // 10 years later

export const MOCKABLE = Symbol('MOCKABLE')
