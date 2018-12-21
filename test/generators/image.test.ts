import { expect } from 'chai'

import { mock } from '../../src'

describe('generator:image', () => {

  it('image()', () => {
    const r = mock.image()

    expect(r).is.a('string')
  })

  it('image(size, text)', () => {
    const r = mock.image('10x10', 'Hello')

    expect(r).is.a('string').match(/\?text=Hello$/)
  })

})

describe('generator:dataImage', () => {

  it('dataImage()', () => {
    const r = mock.dataImage()

    expect(r).is.a('string').satisfy((rr: string) => rr.startsWith('data:image/'))
  })

})
