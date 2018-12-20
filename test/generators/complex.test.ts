import { expect } from 'chai'

import { mock } from '../../src'

describe('generator:array', () => {

  it('array(proto)', () => {
    const r = mock.array({})

    expect(r).is.an('array').with.length.within(2, 5)
  })

  it('array(function)', () => {
    const r = mock.array(() => 'foo')

    expect(r).is.an('array').with.length.within(2, 5)
    expect(r).to.include.members(['foo'])
  })

  it('array(proto, length)', () => {
    const r = mock.array({}, 3)

    expect(r).is.an('array').with.lengthOf(3)
  })

  it('array(proto, min, max)', () => {
    const r = mock.array({}, 3, 5)

    expect(r).is.an('array').with.length.within(3, 5)
  })

})

describe('generator:oneOf', () => {

  it('oneOf(list)', () => {
    const r = mock.oneOf(['a', 'b', 'c'])

    expect(r).is.oneOf(['a', 'b', 'c'])
  })

})

describe('generator:manyOf', () => {

  it('manyOf(list)', () => {
    const list = ['a', 'b', 'c', 'd', 'e', 'f']
    const r = mock.manyOf(list)

    expect(r).is.an('array').with.length.within(0, list.length)
    expect(r).to.satisfy((rr: any[]) => rr.every((i) => list.includes(i)))
  })

  it('manyOf(list, length)', () => {
    const list = ['a', 'b', 'c', 'd', 'e', 'f']
    const r = mock.manyOf(list, 2)

    expect(r).is.an('array').with.lengthOf(2)
    expect(r).to.satisfy((rr: any[]) => rr.every((i) => list.includes(i)))
  })

  it('manyOf(list, min, max)', () => {
    const list = ['a', 'b', 'c', 'd', 'e', 'f']
    const r = mock.manyOf(list, 1, 2)

    expect(r).is.an('array').with.length.within(1, 2)
    expect(r).to.satisfy((rr: any[]) => rr.every((i) => list.includes(i)))
  })

})

describe('generator:pick', () => {

  it('pick(proto)', () => {
    const r = mock.pick(null)

    expect(r).to.equal(null)
  })

  it('pick(proto, length)', () => {
    const obj = { a: 1, b: 2, c: 3, d: 4, e: 5 }
    const keys = Object.keys(obj)
    const r = mock.pick(obj, 2)
    const k = Object.keys(r)

    expect(r).is.an('object')
    expect(k).have.lengthOf(2)
    expect(k).to.satisfy((kk: any[]) => kk.every((i) => keys.includes(i)))
  })

  it('pick(proto, props)', () => {
    const obj = { a: 1, b: 2, c: 3, d: 4, e: 5 }
    const r = mock.pick(obj, 'a b')
    const k = Object.keys(r)

    expect(r).is.an('object')
    expect(k).to.deep.equal(['a', 'b'])
  })

  it('pick(proto, min, max)', () => {
    const obj = { a: 1, b: 2, c: 3, d: 4, e: 5 }
    const keys = Object.keys(obj)
    const r = mock.pick(obj, 2, 3)
    const k = Object.keys(r)

    expect(r).is.an('object')
    expect(k).have.length.within(2, 3)
    expect(k).to.satisfy((kk: any[]) => kk.every((i) => keys.includes(i)))
  })

})
