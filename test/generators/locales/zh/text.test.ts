import { expect } from 'chai'

import { mock } from '../../../../src'

describe('generator:zh.word', () => {

  it('zh.word()', () => {
    const r = mock.zh.word()

    expect(r).is.a('string').match(/^[\u4e00-\u9fa5]$/)
  })

  it('zh.word(length)', () => {
    const r = mock.zh.word(6)

    expect(r).is.a('string').match(/^[\u4e00-\u9fa5]{6}$/)
  })

  it('zh.word(min, max)', () => {
    const r = mock.zh.word(3, 5)

    expect(r).is.a('string').match(/^[\u4e00-\u9fa5]{3,5}$/)
  })

})

describe('generator:zh.title', () => {

  it('zh.title()', () => {
    const r = mock.zh.title()

    expect(r).is.a('string').match(/^[\u4e00-\u9fa5]{3,8}$/)
  })

  it('zh.title(length)', () => {
    const r = mock.zh.title(6)

    expect(r).is.a('string').match(/^[\u4e00-\u9fa5]{6}$/)
  })

  it('zh.title(min, max)', () => {
    const r = mock.zh.title(3, 5)

    expect(r).is.a('string').match(/^[\u4e00-\u9fa5]{3,5}$/)
  })

})

describe('generator:zh.sentence', () => {

  it('zh.sentence()', () => {
    const r = mock.zh.sentence()

    expect(r).is.a('string').match(/^[\u4e00-\u9fa5]{8,18}。$/)
  })

  it('zh.sentence(length)', () => {
    const r = mock.zh.sentence(5)

    expect(r).is.a('string').match(/^[\u4e00-\u9fa5]{5}。$/)
  })

  it('zh.sentence(min, max)', () => {
    const r = mock.zh.sentence(2, 5)

    expect(r).is.a('string').match(/^[\u4e00-\u9fa5]{2,5}。$/)
  })

})

describe('generator:zh.paragraph', () => {

  it('zh.paragraph()', () => {
    const r = mock.zh.paragraph()

    expect(r).is.a('string').match(/^([\u4e00-\u9fa5]+。){3,8}$/)
  })

  it('zh.paragraph(length)', () => {
    const r = mock.zh.paragraph(3)

    expect(r).is.a('string').match(/^([\u4e00-\u9fa5]+。){3}$/)
  })

  it('zh.paragraph(min, max)', () => {
    const r = mock.zh.paragraph(3, 5)

    expect(r).is.a('string').match(/^([\u4e00-\u9fa5]+。){3,5}$/)
  })

})

describe('generator:zh.passage', () => {

  it('zh.passage()', () => {
    const r = mock.zh.passage()
    const s = r.split('\n')

    expect(r).is.a('string').match(/^([\u4e00-\u9fa5]+。\n?)+$/)
    expect(s).has.length.within(2, 5)
  })

  it('zh.passage(length)', () => {
    const r = mock.zh.passage(3)
    const s = r.split('\n')

    expect(r).is.a('string').match(/^([\u4e00-\u9fa5]+。\n?)+$/)
    expect(s).has.lengthOf(3)
  })

  it('zh.passage(min, max)', () => {
    const r = mock.zh.passage(3, 5)
    const s = r.split('\n')

    expect(r).is.a('string').match(/^([\u4e00-\u9fa5]+。\n?)+$/)
    expect(s).has.length.within(3, 5)
  })

})
