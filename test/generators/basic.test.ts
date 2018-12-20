import { expect } from 'chai'

import { mock } from '../../src'

describe('generator:boolean', () => {

  it('boolean()', () => {
    const r = mock.boolean()

    expect(r).is.a('boolean')
  })

  it('boolean(1)', () => {
    const r = mock.boolean(1)

    expect(r).to.equal(true)
  })

  it('boolean(0, false)', () => {
    const r = mock.boolean(0, false)

    expect(r).to.equal(true)
  })

})

describe('generator:integer', () => {

  it('integer()', () => {
    const r = mock.integer()
    const i = parseInt(r as any, 10)

    expect(r).is.an('number').equal(i)
  })

  it('integer(float)', () => {
    const r = mock.integer(5.8)
    const i = parseInt(r as any, 10)

    expect(r).is.an('number').most(5).equal(i)
  })

  it('integer(max)', () => {
    const r = mock.integer(10)
    const i = parseInt(r as any, 10)

    expect(r).is.an('number').most(10).equal(i)
  })

  it('integer(min, max)', () => {
    const r = mock.integer(10, 20)
    const i = parseInt(r as any, 10)

    expect(r).is.an('number').within(10, 20).equal(i)
  })

})

describe('generator:natural', () => {

  it('natural()', () => {
    const r = mock.natural()
    const i = parseInt(r as any, 10)

    expect(r).is.an('number').least(0).equal(i)
  })

  it('natural(negative)', () => {
    const r = mock.natural(-10)

    expect(r).is.an('number').equal(0)
  })

  it('natural(max)', () => {
    const r = mock.natural(10)
    const i = parseInt(r as any, 10)

    expect(r).is.an('number').within(0, 10).equal(i)
  })

  it('natural(min, max)', () => {
    const r = mock.natural(10, 20)
    const i = parseInt(r as any, 10)

    expect(r).is.an('number').within(10, 20).equal(i)
  })

})

describe('generator:float', () => {

  it('float()', () => {
    const r = mock.float()
    const [i, f] = r.toString().split('.')

    expect(r).is.an('number').within(0, 101)
    expect(i).has.length.least(1)
    expect(f).has.length.within(1, 3)
  })

  it('float(max)', () => {
    const r = mock.float(10)
    const [i, f] = r.toString().split('.')

    expect(r).is.an('number').within(0, 11)
    expect(i).has.length.least(1)
    expect(f).has.length.within(1, 3)
  })

  it('float(min, max)', () => {
    const r = mock.float(5, 10)
    const [i, f] = r.toString().split('.')

    expect(r).is.an('number').within(5, 11)
    expect(i).has.length.least(1)
    expect(f).has.length.within(1, 3)
  })

  it('float(min, max, fixed)', () => {
    const r = mock.float(5, 10, 3)
    const [i, f] = r.toString().split('.')

    expect(r).is.an('number').within(5, 11)
    expect(i).has.length.least(1)
    expect(f).has.lengthOf(3)
  })

  it('float(min, max, 0)', () => {
    const r = mock.float(5, 10, 0)
    const [i, f] = r.toString().split('.')

    expect(r).is.an('number').within(5, 10)
    expect(i).has.length.least(1)
    expect(f).to.equal(undefined)
  })

  it('float(min, max, dmin, dmax)', () => {
    const r = mock.float(5, 10, 3, 5)
    const [i, f] = r.toString().split('.')

    expect(r).is.an('number').within(5, 11)
    expect(i).has.length.least(1)
    expect(f).has.length.within(3, 5)
  })

})

describe('generator:char', () => {

  it('char(pool)', () => {
    const r = mock.char('abc')

    expect(r).is.a('string').match(/[abc]/)
  })

})

describe('generator:string', () => {

  it('string(pool)', () => {
    const r = mock.string('abc')

    expect(r).is.a('string').match(/^[abc]*$/)
  })

  it('string(pool, length)', () => {
    const r = mock.string('abc', 10)

    expect(r).is.a('string').match(/^[abc]{10}$/)
  })

  it('string(pool, min, max)', () => {
    const r = mock.string('abc', 5, 10)

    expect(r).is.a('string').match(/^[abc]{5,10}$/)
  })

})
