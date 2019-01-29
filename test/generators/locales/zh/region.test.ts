import { expect } from 'chai'

import { mock } from '../../../../src'

describe('generator:zh.region', () => {

  it('zh.province()', () => {
    const r = mock.zh.province()

    expect(r).is.a('object')
    expect(r).to.have.property('code')
    expect(r).to.have.property('name')
  })

  it('zh.city()', () => {
    const r = mock.zh.city()

    expect(r).is.a('object')
    expect(r).to.have.property('code')
    expect(r).to.have.property('name')
  })

  it('zh.county()', () => {
    const r = mock.zh.county()

    expect(r).is.a('object')
    expect(r).to.have.property('code')
    expect(r).to.have.property('name')
  })

  it('zh.region()', () => {
    const r = mock.zh.region()

    expect(r).is.a('array')
    expect(r[0]).to.have.property('code')
    expect(r[0]).to.have.property('name')
  })

})

describe('generator:zh.regionName', () => {

  it('zh.provinceName()', () => {
    const r = mock.zh.provinceName()

    expect(r).is.a('string')
  })

  it('zh.cityName()', () => {
    const r = mock.zh.cityName()

    expect(r).is.a('string')
  })

  it('zh.countyName()', () => {
    const r = mock.zh.countyName()

    expect(r).is.a('string')
  })

  it('zh.regionName()', () => {
    const r = mock.zh.regionName()

    expect(r).is.a('string')
  })

})

describe('generator:zh.zipCode', () => {

  it('zh.zipCode()', () => {
    const r = mock.zh.zipCode()

    expect(r).is.a('string').match(/^\d{6}$/)
  })

})
