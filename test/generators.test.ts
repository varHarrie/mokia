import { expect } from 'chai'
import { mock } from '../src'

describe('generators', () => {

  it('generate(not object)', () => {
    const r = mock.generate(5)

    expect(r).to.equal(5)
  })

  it('generate({})', () => {
    const r = mock.generate({})

    expect(r).to.deep.equal({})
  })

  it('generate(object)', () => {
    const r = mock.generate({ name: 'Harrie', age: 18 })

    expect(r).to.deep.equal({ name: 'Harrie', age: 18 })
  })

  it('generate(dynamic object)', () => {
    const r = mock.generate({ name: mock.string('abc'), age: mock.natural(0, 100) })

    expect(r).to.have.property('name').is.a('string')
    expect(r).to.have.property('age').is.a('number').least(0).most(100)
  })

  it('generate(function)', () => {
    const r = mock.generate(() => 'Harrie')

    expect(r).to.equal('Harrie')
  })

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

  it('integer()', () => {
    const r = mock.integer()
    const i = parseInt(r as any, 10)

    expect(r).is.an('number').equal(i)
  })

  it('integer(float)', () => {
    const r = mock.integer(5.8)
    const i = parseInt(r as any, 10)

    expect(r).is.an('number').most(5)
  })

  it('integer(max)', () => {
    const r = mock.integer(10)
    const i = parseInt(r as any, 10)

    expect(r).is.an('number').most(10).equal(i)
  })

  it('integer(min, max)', () => {
    const r = mock.integer(10, 20)
    const i = parseInt(r as any, 10)

    expect(r).is.an('number').least(10).most(20).equal(i)
  })

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

    expect(r).is.an('number').least(0).most(10).equal(i)
  })

  it('natural(min, max)', () => {
    const r = mock.natural(10, 20)
    const i = parseInt(r as any, 10)

    expect(r).is.an('number').least(10).most(20).equal(i)
  })

  it('float()', () => {
    const r = mock.float()
    const [i, f] = r.toString().split('.')

    expect(r).is.an('number').least(0).most(101)
    expect(i).has.length.least(1)
    expect(f).has.length.least(1).most(3)
  })

  it('float(max)', () => {
    const r = mock.float(10)
    const [i, f] = r.toString().split('.')

    expect(r).is.an('number').least(0).most(11)
    expect(i).has.length.least(1)
    expect(f).has.length.least(1).most(3)
  })

  it('float(min, max)', () => {
    const r = mock.float(5, 10)
    const [i, f] = r.toString().split('.')

    expect(r).is.an('number').least(5).most(11)
    expect(i).has.length.least(1)
    expect(f).has.length.least(1).most(3)
  })

  it('float(min, max, fixed)', () => {
    const r = mock.float(5, 10, 3)
    const [i, f] = r.toString().split('.')

    expect(r).is.an('number').least(5).most(11)
    expect(i).has.length.least(1)
    expect(f).has.lengthOf(3)
  })

  it('float(min, max, 0)', () => {
    const r = mock.float(5, 10, 0)
    const [i, f] = r.toString().split('.')

    expect(r).is.an('number').least(5).most(10)
    expect(i).has.length.least(1)
    expect(f).to.equal(undefined)
  })

  it('float(min, max, dmin, dmax)', () => {
    const r = mock.float(5, 10, 3, 5)
    const [i, f] = r.toString().split('.')

    expect(r).is.an('number').least(5).most(11)
    expect(i).has.length.least(1)
    expect(f).has.length.least(3).most(5)
  })

})
