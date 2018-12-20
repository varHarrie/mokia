import { expect } from 'chai'

import { mock } from '../../src'

describe('generator:image', () => {

  it('image()', () => {
    const r = mock.image()

    expect(r).is.a('string')
  })

})

describe('generator:dataImage', () => {

  it('dataImage()', () => {
    const r = mock.dataImage()

    expect(r).is.a('string').satisfy((rr: string) => rr.startsWith('data:image/'))
  })

})
