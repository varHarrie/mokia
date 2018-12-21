import { expect } from 'chai'

import { mock } from '../../src'

describe('generator:hex', () => {

  it('hex()', () => {
    const r = mock.hex()

    expect(r).is.a('string').match(/^#[0-9a-z]{6}$/)
  })

})

describe('generator:rgb', () => {

  it('rgb()', () => {
    const r = mock.rgb()

    expect(r).is.a('string').match(/^rgb\(\d{1,3}, \d{1,3}, \d{1,3}\)$/)
  })

})

describe('generator:rgba', () => {

  it('rgba()', () => {
    const r = mock.rgba()

    expect(r).is.a('string').match(/^rgba\(\d{1,3}, \d{1,3}, \d{1,3}, \d+(\.\d+)?\)$/)
  })

})

describe('generator:hsl', () => {

  it('hsl()', () => {
    const r = mock.hsl()

    expect(r).is.a('string').match(/^hsl\(\d{1,3}, \d{1,3}%, \d{1,3}%\)$/)
  })

})

describe('generator:color', () => {

  it('color()', () => {
    const r = mock.color()

    expect(r).is.a('string').match(/^#[0-9a-z]{6}$/)
  })

})
