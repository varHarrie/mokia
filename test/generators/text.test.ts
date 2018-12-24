import { expect } from 'chai'

import { mock } from '../../src'

describe('generator:word', () => {

  it('word()', () => {
    const r = mock.word()

    expect(r).is.a('string').match(/^[a-z]{1,8}$/)
  })

  it('word(length)', () => {
    const r = mock.word(6)

    expect(r).is.a('string').match(/^[a-z]{6}$/)
  })

  it('word(min, max)', () => {
    const r = mock.word(3, 5)

    expect(r).is.a('string').match(/^[a-z]{3,5}$/)
  })

})

describe('generator:title', () => {

  it('title()', () => {
    const r = mock.title()
    const s = r.split(' ')

    expect(r).is.a('string').match(/^([A-Z][a-z]*\s)*([A-Z][a-z]*)$/)
    expect(s).has.length.within(1, 5)
  })

  it('title(length)', () => {
    const r = mock.title(6)
    const s = r.split(' ')

    expect(r).is.a('string').match(/^([A-Z][a-z]*\s)*([A-Z][a-z]*)$/)
    expect(s).has.lengthOf(6)
  })

  it('title(min, max)', () => {
    const r = mock.title(3, 5)
    const s = r.split(' ')

    expect(r).is.a('string').match(/^([A-Z][a-z]*\s)*([A-Z][a-z]*)$/)
    expect(s).has.length.within(3, 5)
  })

})

describe('generator:sentence', () => {

  it('sentence()', () => {
    const r = mock.sentence()
    const s = r.split(' ')

    expect(r).is.a('string').match(/^[A-Z][^.]*\.$/)
    expect(s).has.length.within(5, 15)
  })

  it('sentence(length)', () => {
    const r = mock.sentence(5)
    const s = r.split(' ')

    expect(r).is.a('string').match(/^[A-Z][^.]*\.$/)
    expect(s).has.lengthOf(5)
  })

  it('sentence(min, max)', () => {
    const r = mock.sentence(2, 3)
    const s = r.split(' ')

    expect(r).is.a('string').match(/^[A-Z][^.]*\.$/)
    expect(s).has.length.within(2, 3)
  })

})

describe('generator:paragraph', () => {

  it('paragraph()', () => {
    const r = mock.paragraph()
    const s = r.split('. ')

    expect(r).is.a('string').match(/^[A-Z].*\.$/)
    expect(s).has.length.within(2, 5)
  })

  it('paragraph(length)', () => {
    const r = mock.paragraph(3)
    const s = r.split('. ')

    expect(r).is.a('string').match(/^[A-Z].*\.$/)
    expect(s).has.lengthOf(3)
  })

  it('paragraph(min, max)', () => {
    const r = mock.paragraph(3, 5)
    const s = r.split('. ')

    expect(r).is.a('string').match(/^[A-Z].*\.$/)
    expect(s).has.length.within(3, 5)
  })

})

describe('generator:passage', () => {

  it('passage()', () => {
    const r = mock.passage()
    const s = r.split('\n')

    expect(r).is.a('string').match(/^[A-Z].*\.$/m)
    expect(s).has.length.within(2, 5)
  })

  it('passage(length)', () => {
    const r = mock.passage(3)
    const s = r.split('\n')

    expect(r).is.a('string').match(/^[A-Z].*\.$/m)
    expect(s).has.lengthOf(3)
  })

  it('passage(min, max)', () => {
    const r = mock.passage(3, 5)
    const s = r.split('\n')

    expect(r).is.a('string').match(/^[A-Z].*\.$/m)
    expect(s).has.length.within(3, 5)
  })

})
