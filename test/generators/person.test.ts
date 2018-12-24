import { expect } from 'chai'

import { mock } from '../../src'

describe('generator:age', () => {

  it('age()', () => {
    const r = mock.age()

    expect(r).is.a('number').within(1, 100)
  })

  it('age(min)', () => {
    const r = mock.age(18)

    expect(r).is.a('number').within(18, 100)
  })

  it('age(min, max)', () => {
    const r = mock.age(18, 30)

    expect(r).is.a('number').within(18, 30)
  })

})

describe('generator:birthday', () => {

  it('birthday()', () => {
    const r = mock.birthday()

    expect(r).is.a('string').match(/^\d{4}-\d{2}-\d{2}$/)
  })

  it('birthday(format)', () => {
    const r = mock.birthday('DD/MM/YYYY')

    expect(r).is.a('string').match(/^\d{2}\/\d{2}\/\d{4}$/)
  })

})

describe('generator:fullName', () => {

  it('fullName()', () => {
    const r = mock.fullName()

    expect(r).is.a('string').match(/^[A-Z][a-z]+\s[A-Z][a-z]+$/)
  })

})

describe('generator:firstName', () => {

  it('firstName()', () => {
    const r = mock.firstName()

    expect(r).is.a('string').match(/^[A-Z][a-z]+$/)
  })

})

describe('generator:lastName', () => {

  it('lastName()', () => {
    const r = mock.lastName()

    expect(r).is.a('string').match(/^[A-Z][a-z]+$/)
  })

})
