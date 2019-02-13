import { expect } from 'chai'

import { mock } from '../../src'

describe('generator:protocol', () => {

  it('protocol()', () => {
    const r = mock.protocol()

    expect(r).is.a('string')
  })

})

describe('generator:tld', () => {

  it('tld()', () => {
    const r = mock.tld()

    expect(r).is.a('string')
  })

})

describe('generator:ip', () => {

  it('ip()', () => {
    const r = mock.ip()

    expect(r).is.a('string').match(/^\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}$/)
  })

})

describe('generator:ipv6', () => {

  it('ipv6()', () => {
    const r = mock.ipv6()

    expect(r).is.a('string').match(/^([0-9a-z]{1,4}:){7}([0-9a-z]{1,4})$/)
  })

})

describe('generator:port', () => {

  it('port()', () => {
    const r = mock.port()

    expect(r).is.a('number').within(0, 65536)
  })

  it('port(min)', () => {
    const r = mock.port(8080)

    expect(r).is.a('number').within(8080, 65536)
  })

  it('port(min, max)', () => {
    const r = mock.port(8080, 8888)

    expect(r).is.a('number').within(8080, 8888)
  })

})

describe('generator:domain', () => {

  it('domain()', () => {
    const r = mock.domain()

    expect(r).is.a('string').match(/^[a-z]+\.[a-z]+$/)
  })

  it('domain(tld)', () => {
    const r = mock.domain('com')

    expect(r).is.a('string').match(/^[a-z]+\.com$/)
  })

})

describe('generator:pathname', () => {

  it('pathname()', () => {
    const r = mock.pathname()

    expect(r).is.a('string').match(/^(\/\w+)+$/)
  })

  it('pathname(tld)', () => {
    const r = mock.pathname(3)

    expect(r).is.a('string').match(/^(\/\w+){3}$/)
  })

})

describe('generator:url', () => {

  it('url()', () => {
    const r = mock.url()

    expect(r).is.a('string').match(/^\w+:\/\/[a-z]+\.[a-z]+(\/\w+)+$/)
  })

  it('url(protocol)', () => {
    const r = mock.url('https')

    expect(r).is.a('string').match(/^https:\/\/[a-z]+\.[a-z]+(\/\w+)+$/)
  })

  it('url(protocol, host)', () => {
    const r = mock.url('https', 'github.com')

    expect(r).is.a('string').match(/^\w+:\/\/github\.com(\/\w+)+$/)
  })

  it('url(protocol, host, prefix)', () => {
    const r = mock.url('https', 'github.com', '/varHarrie')

    expect(r).is.a('string').match(/^\w+:\/\/github\.com\/varHarrie(\/\w+)+$/)
  })

})

describe('generator:email', () => {

  it('email()', () => {
    const r = mock.email()

    expect(r).is.a('string').match(/^[\w\W]+@\w+\.\w+$/)
  })

  it('email(protocol)', () => {
    const r = mock.email('gmail.com')

    expect(r).is.a('string').match(/^[\w\W]+@gmail.com$/)
  })

})
