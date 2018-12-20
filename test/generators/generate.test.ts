import { expect } from 'chai'

import { mock } from '../../src'

describe('generator:generate', () => {

  it('generate(not object)', () => {
    const r = mock.generate(5)
    expect(r).to.equal(5)
  })

  it('generate({})', () => {
    const r = mock.generate({})
    expect(r).to.deep.equal({})
  })

  it('generate(instance)', () => {
    // tslint:disable-next-line:only-arrow-functions
    const Test: any = function () {/* */}
    Test.prototype.foo = true
    const r = mock.generate(new Test())
    expect(r).to.deep.equal({})
  })

  it('generate(object)', () => {
    const r = mock.generate({ name: 'Harrie', age: 18 })
    expect(r).to.deep.equal({ name: 'Harrie', age: 18 })
  })

  it('generate(dynamic object)', () => {
    const r = mock.generate({ name: mock.string('abc'), age: mock.natural(0, 100) })
    expect(r).to.have.property('name').is.a('string')
    expect(r).to.have.property('age').is.a('number').within(0, 100)
  })

  it('generate(function)', () => {
    const r = mock.generate(() => 'Harrie')
    expect(r).to.equal('Harrie')
  })

})
