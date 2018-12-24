import { expect } from 'chai'

import { mock } from '../../../../src'

describe('generator:zh.fullName', () => {

  it('zh.fullName()', () => {
    const r = mock.zh.fullName()

    expect(r).is.a('string').match(/^[\u4e00-\u9fa5]{2,4}$/)
  })

})

describe('generator:zh.firstName', () => {

  it('zh.firstName()', () => {
    const r = mock.zh.firstName()

    expect(r).is.a('string').match(/^[\u4e00-\u9fa5]{1,2}$/)
  })

})

describe('generator:zh.lastName', () => {

  it('zh.lastName()', () => {
    const r = mock.zh.lastName()

    expect(r).is.a('string').match(/^[\u4e00-\u9fa5]{1,2}$/)
  })

})

describe('generator:zh.phone', () => {

  it('zh.phone()', () => {
    const r = mock.zh.phone()

    expect(r).is.a('string').match(/^1\d{10}$/)
  })

})

describe('generator:zh.idNumber', () => {

  it('zh.idNumber()', () => {
    const r = mock.zh.idNumber()

    expect(r).is.a('string').match(/^[1-9]\d{5}(19|20)\d{2}(0\d|10|11|12)(0\d|1\d|2\d|30|31)\d{3}[0-9x]$/)
  })

})
