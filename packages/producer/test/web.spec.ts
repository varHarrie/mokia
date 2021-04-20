import 'mocha';
import { expect } from 'chai';
import * as producer from '../src';

describe('protocol', () => {
  it('protocol()', () => {
    expect(producer.protocol()).is.a('string');
  });
});

describe('tld', () => {
  it('tld()', () => {
    expect(producer.tld()).is.a('string');
  });
});

describe('ip', () => {
  it('ip()', () => {
    expect(producer.ip())
      .is.a('string')
      .match(/^\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}$/);
  });
});

describe('ipv6', () => {
  it('ipv6()', () => {
    expect(producer.ipv6())
      .is.a('string')
      .match(/^([0-9a-z]{1,4}:){7}([0-9a-z]{1,4})$/);
  });
});

describe('port', () => {
  it('port()', () => {
    expect(producer.port()).is.a('number').within(0, 65536);
  });

  it('port(min)', () => {
    expect(producer.port(8080)).is.a('number').within(8080, 65536);
  });

  it('port(min, max)', () => {
    expect(producer.port(8080, 8888)).is.a('number').within(8080, 8888);
  });
});

describe('domain', () => {
  it('domain()', () => {
    expect(producer.domain())
      .is.a('string')
      .match(/^[a-z]+\.[a-z]+$/);
  });

  it('domain(tld)', () => {
    expect(producer.domain('com'))
      .is.a('string')
      .match(/^[a-z]+\.com$/);
  });
});

describe('pathname', () => {
  it('pathname()', () => {
    expect(producer.pathname())
      .is.a('string')
      .match(/^(\/\w+)+$/);
  });

  it('pathname(tld)', () => {
    expect(producer.pathname(3))
      .is.a('string')
      .match(/^(\/\w+){3}$/);
  });
});

describe('url', () => {
  it('url()', () => {
    expect(producer.url())
      .is.a('string')
      .match(/^\w+:\/\/[a-z]+\.[a-z]+(\/\w+)+$/);
  });

  it('url(protocol)', () => {
    expect(producer.url('https'))
      .is.a('string')
      .match(/^https:\/\/[a-z]+\.[a-z]+(\/\w+)+$/);
  });

  it('url(protocol, host)', () => {
    expect(producer.url('https', 'github.com'))
      .is.a('string')
      .match(/^\w+:\/\/github\.com(\/\w+)+$/);
  });

  it('url(protocol, host, prefix)', () => {
    expect(producer.url('https', 'github.com', '/varHarrie'))
      .is.a('string')
      .match(/^\w+:\/\/github\.com\/varHarrie(\/\w+)+$/);
  });
});

describe('email', () => {
  it('email()', () => {
    expect(producer.email())
      .is.a('string')
      .match(/^[\w\W]+@\w+\.\w+$/);
  });

  it('email(protocol)', () => {
    expect(producer.email('gmail.com'))
      .is.a('string')
      .match(/^[\w\W]+@gmail.com$/);
  });
});
