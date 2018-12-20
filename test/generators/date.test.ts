import { expect } from 'chai'

import { mock } from '../../src'

describe('generator:datetime', () => {

  it('datetime()', () => {
    const r = mock.datetime()

    expect(r).to.match(/^\d{4}-\d{2}-\d{2}\s\d{2}:\d{2}:\d{2}$/)
  })

  it('datetime(format)', () => {
    const r = mock.datetime('DD/MM/YY')

    expect(r).to.match(/^\d{2}\/\d{2}\/\d{2}$/)
  })

  it('datetime(format, max)', () => {
    const r = mock.datetime('YYYY-MM-DD HH:mm:ss', '1970-01-01 09:00:00')
    const d = new Date(r)

    expect(r).is.a('string')
    expect(d).within(new Date(0), new Date('1970-01-01 09:00:00'))
  })

  it('datetime(format, min, max)', () => {
    const r = mock.datetime('YYYY-MM-DD HH:mm:ss', '2000-01-01 00:00:00', '2000-01-01 2:00:00')
    const d = new Date(r)

    expect(r).is.a('string')
    expect(d).within(new Date('2000-01-01 00:00:00'), new Date('2000-01-01 2:00:00'))
  })

})

describe('generator:date', () => {

  it('date()', () => {
    const r = mock.date()

    expect(r).to.match(/^\d{4}-\d{2}-\d{2}$/)
  })

})

describe('generator:time', () => {

  it('time()', () => {
    const r = mock.time()

    expect(r).to.match(/^\d{2}:\d{2}:\d{2}$/)
  })

})

describe('generator:now', () => {

  it('now()', () => {
    const r = mock.now()

    expect(r).to.match(/^\d{4}-\d{2}-\d{2}\s\d{2}:\d{2}:\d{2}$/)
  })

  it('now(format)', () => {
    const r = mock.now('HH:mm:ss')

    expect(r).to.match(/^\d{2}:\d{2}:\d{2}$/)
  })

})
