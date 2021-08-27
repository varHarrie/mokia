import { CHARS } from '../src/constants';
import * as producer from '../src';

const chars = CHARS.split('');

describe('boolean', () => {
  it('boolean()', () => {
    expect(typeof producer.boolean()).toBe('boolean');
  });

  it('boolean(1)', () => {
    expect(producer.boolean(1)).toBe(true);
  });

  it('boolean(0)', () => {
    expect(producer.boolean(0)).toEqual(false);
  });
});

describe('integer', () => {
  it('integer()', () => {
    const r = producer.integer();
    const i = Math.floor(r);

    expect(r).toBe(i);
  });

  it('integer(float)', () => {
    const r = producer.integer(5.8);
    const i = Math.floor(r);

    expect(r).toBe(i);
  });

  it('integer(max)', () => {
    const r = producer.integer(10);
    const i = Math.floor(r);

    expect(r).toBeLessThanOrEqual(10);
    expect(r).toBe(i);
  });

  it('integer(min, max)', () => {
    const r = producer.integer(10, 20);
    const i = Math.floor(r);

    expect(r).toBeGreaterThanOrEqual(10);
    expect(r).toBeLessThanOrEqual(20);
    expect(r).toBe(i);
  });
});

describe('natural', () => {
  it('natural()', () => {
    const r = producer.natural();
    const i = Math.floor(r);

    expect(r).toBeGreaterThanOrEqual(0);
    expect(r).toBe(i);
  });

  it('natural(negative)', () => {
    expect(producer.natural(-10)).toBe(0);
  });

  it('natural(max)', () => {
    const r = producer.natural(10);
    const i = Math.floor(r);

    expect(r).toBeGreaterThanOrEqual(0);
    expect(r).toBeLessThanOrEqual(10);
    expect(r).toBe(i);
  });

  it('natural(min, max)', () => {
    const r = producer.natural(10, 20);
    const i = Math.floor(r);

    expect(r).toBeGreaterThanOrEqual(10);
    expect(r).toBeLessThanOrEqual(20);
    expect(r).toBe(i);
  });
});

describe('float', () => {
  it('float()', () => {
    const r = producer.float();
    const [i, f] = r.toString().split('.');

    expect(r).toBeGreaterThanOrEqual(0);
    expect(r).toBeLessThanOrEqual(101);
    expect(i.length).toBeGreaterThanOrEqual(1);
    expect(f.length).toBeGreaterThanOrEqual(1);
    expect(f.length).toBeLessThanOrEqual(2);
  });

  it('float(max)', () => {
    const r = producer.float(10);
    const [i, f] = r.toString().split('.');

    expect(r).toBeGreaterThanOrEqual(0);
    expect(r).toBeLessThanOrEqual(11);
    expect(i.length).toBeGreaterThanOrEqual(1);
    expect(f.length).toBeGreaterThanOrEqual(1);
    expect(f.length).toBeLessThanOrEqual(2);
  });

  it('float(min, max)', () => {
    const r = producer.float(5, 10);
    const [i, f] = r.toString().split('.');

    expect(r).toBeGreaterThanOrEqual(5);
    expect(r).toBeLessThanOrEqual(11);
    expect(i.length).toBeGreaterThanOrEqual(1);
    expect(f.length).toBeGreaterThanOrEqual(1);
    expect(f.length).toBeLessThanOrEqual(2);
  });

  it('float(min, max, fixed)', () => {
    const r = producer.float(5, 10, 5);
    const [i, f] = r.toString().split('.');

    expect(r).toBeGreaterThanOrEqual(5);
    expect(r).toBeLessThanOrEqual(11);
    expect(i.length).toBeGreaterThanOrEqual(1);
    expect(f.length).toBe(5);
  });

  it('float(min, max, 0)', () => {
    const r = producer.float(5, 10, 0);
    const [i, f] = r.toString().split('.');

    expect(r).toBeGreaterThanOrEqual(5);
    expect(r).toBeLessThanOrEqual(11);
    expect(i.length).toBeGreaterThanOrEqual(1);
    expect(f).toBe(undefined);
  });

  it('float(min, max, dmin, dmax)', () => {
    const r = producer.float(5, 10, 5, 10);
    const [i, f] = r.toString().split('.');

    expect(r).toBeGreaterThanOrEqual(5);
    expect(r).toBeLessThanOrEqual(11);
    expect(i.length).toBeGreaterThanOrEqual(1);
    expect(f.length).toBeGreaterThanOrEqual(5);
    expect(f.length).toBeLessThanOrEqual(10);
  });
});

describe('char', () => {
  it('char()', () => {
    const r = producer.char();

    expect(r.length).toBe(1);
    expect(chars).toContain(r);
  });

  it('char(pool)', () => {
    const r = producer.char(producer.char('abc'));

    expect(r.length).toBe(1);
    expect(r).toMatch(/[abc]/);
  });
});

describe('string', () => {
  it('string()', () => {
    const r = producer.string();

    expect(r.length).toBeGreaterThanOrEqual(1);
    expect(chars).toEqual(expect.arrayContaining(r.split('')));
  });

  it('string(pool)', () => {
    const r = producer.string('abc');

    expect(r.length).toBeGreaterThanOrEqual(1);
    expect(r).toMatch(/^[abc]*$/);
  });

  it('string(length)', () => {
    const r = producer.string(10);

    expect(r.length).toBe(10);
    expect(chars).toEqual(expect.arrayContaining(r.split('')));
  });

  it('string(pool, length)', () => {
    const pool = 'abc';
    const r = producer.string(pool, 10);

    expect(r).toMatch(/^[abc]{10}$/);
  });

  it('string(pool, min, max)', () => {
    const pool = 'abc';
    const r = producer.string(pool, 5, 10);

    expect(r).toMatch(/^[abc]{5,10}$/);
  });
});
