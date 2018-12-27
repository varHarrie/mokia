import { expect } from 'chai'

import { mock, decorators } from '../../src'

class Test {

  @decorators.boolean()
  public boolean: any

  @decorators.integer()
  public integer: any

  @decorators.natural()
  public natural: any

  @decorators.float()
  public float: any

  @decorators.char('abc')
  public char: any

  @decorators.string('abc')
  public string: any

}

describe('decorator', () => {

  it('decorator:basic', () => {
    const r = mock(Test)
    const i = parseInt(r.integer as any, 10)
    const n = parseInt(r.natural as any, 10)
    const f = parseInt(r.float as any, 10)

    expect(r.boolean).is.a('boolean')
    expect(r.integer).is.a('number').equal(i)
    expect(r.natural).is.a('number').least(0).equal(n)
    expect(r.float).is.a('number').least(f).below(f + 1)
    expect(r.char).is.a('string').lengthOf(1)
    expect(r.string).is.a('string')
  })

})
