import * as producer from '../src';
import { PROTOCOLS, TLDS } from '../src/constants';

describe('protocol', () => {
  it('protocol()', () => {
    expect(PROTOCOLS).toContain(producer.protocol());
  });
});

describe('tld', () => {
  it('tld()', () => {
    expect(TLDS).toContain(producer.tld());
  });
});

describe('ip', () => {
  it('ip()', () => {
    expect(producer.ip()).toMatch(/^\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}$/);
  });
});

describe('ipv6', () => {
  it('ipv6()', () => {
    expect(producer.ipv6()).toMatch(/^([0-9a-z]{1,4}:){7}([0-9a-z]{1,4})$/);
  });
});

describe('port', () => {
  it('port()', () => {
    const r = producer.port();

    expect(typeof r).toBe('number');
    expect(r).toBeGreaterThanOrEqual(0);
    expect(r).toBeLessThanOrEqual(65536);
  });

  it('port(min)', () => {
    const r = producer.port(8080);

    expect(typeof r).toBe('number');
    expect(r).toBeGreaterThanOrEqual(8080);
    expect(r).toBeLessThanOrEqual(65536);
  });

  it('port(min, max)', () => {
    const r = producer.port(8080, 8888);

    expect(typeof r).toBe('number');
    expect(r).toBeGreaterThanOrEqual(8080);
    expect(r).toBeLessThanOrEqual(8888);
  });
});

describe('domain', () => {
  it('domain()', () => {
    expect(producer.domain()).toMatch(/^[a-z]+\.[a-z]+$/);
  });

  it('domain(tld)', () => {
    expect(producer.domain('com')).toMatch(/^[a-z]+\.com$/);
  });
});

describe('pathname', () => {
  it('pathname()', () => {
    expect(producer.pathname()).toMatch(/^(\/\w+)+$/);
  });

  it('pathname(tld)', () => {
    expect(producer.pathname(3)).toMatch(/^(\/\w+){3}$/);
  });
});

describe('url', () => {
  it('url()', () => {
    expect(producer.url()).toMatch(/^\w+:\/\/[a-z]+\.[a-z]+(\/\w+)+$/);
  });

  it('url(protocol)', () => {
    expect(producer.url('https')).toMatch(/^https:\/\/[a-z]+\.[a-z]+(\/\w+)+$/);
  });

  it('url(protocol, host)', () => {
    expect(producer.url('https', 'github.com')).toMatch(/^\w+:\/\/github\.com(\/\w+)+$/);
  });

  it('url(protocol, host, prefix)', () => {
    expect(producer.url('https', 'github.com', '/varHarrie')).toMatch(/^\w+:\/\/github\.com\/varHarrie(\/\w+)+$/);
  });
});

describe('email', () => {
  it('email()', () => {
    expect(producer.email()).toMatch(/^[\w\W]+@\w+\.\w+$/);
  });

  it('email(protocol)', () => {
    expect(producer.email('gmail.com')).toMatch(/^[\w\W]+@gmail.com$/);
  });
});
