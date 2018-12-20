import { expect } from 'chai'

import { mock } from '../../src'

describe('generator:uuid', () => {

  it('uuid()', () => {
    const r = mock.uuid()

    expect(r).is.a('string').match(/[a-z0-9]{8}-[a-z0-9]{4}-4[a-z0-9]{3}-[a-z0-9]{4}-[a-z0-9]{12}/)
  })

})

describe('generator:increment', () => {

  it('increment()', () => {
    const r1 = mock.increment()
    const r2 = mock.increment()

    expect(r1).is.a('number')
    expect(r2).is.a('number').equal(r1 + 1)
  })

  it('increment(step)', () => {
    const r1 = mock.increment()
    const r2 = mock.increment(10)

    expect(r1).is.a('number')
    expect(r2).is.a('number').equal(r1 + 10)
  })

})
