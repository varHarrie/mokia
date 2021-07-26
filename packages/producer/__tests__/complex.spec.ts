import * as producer from '../src';

describe('iterate', () => {
  it('iterate(iterator)', () => {
    const r = producer.iterate(() => 'foo');

    expect(Array.isArray(r)).toBe(true);
    expect(r.length).toBeGreaterThanOrEqual(0);
    expect(r.length).toBeLessThanOrEqual(10);
  });

  it('iterate(iterator, length)', () => {
    const r = producer.iterate(() => 'foo', 3);

    expect(Array.isArray(r)).toBe(true);
    expect(r.length).toBe(3);
  });

  it('iterate(iterator, min, max)', () => {
    const r = producer.iterate(() => 'foo', 3, 5);

    expect(Array.isArray(r)).toBe(true);
    expect(r.length).toBeGreaterThanOrEqual(3);
    expect(r.length).toBeLessThanOrEqual(5);
  });
});

describe('oneOf', () => {
  it('oneOf(list)', () => {
    const list = ['a', 'b', 'c'];
    const r = producer.oneOf(list);

    expect(list).toContain(r);
  });
});

describe('manyOf', () => {
  it('manyOf(list)', () => {
    const list = ['a', 'b', 'c', 'd', 'e', 'f'];
    const r = producer.manyOf(list);

    expect(Array.isArray(r)).toBe(true);
    expect(r.length).toBeLessThanOrEqual(list.length);
    expect(list).toEqual(expect.arrayContaining(r));
  });

  it('manyOf(list, length)', () => {
    const list = ['a', 'b', 'c', 'd', 'e', 'f'];
    const r = producer.manyOf(list, 2);

    expect(Array.isArray(r)).toBe(true);
    expect(r.length).toBe(2);
    expect(list).toEqual(expect.arrayContaining(r));
  });

  it('manyOf(list, min, max)', () => {
    const list = ['a', 'b', 'c', 'd', 'e', 'f'];
    const r = producer.manyOf(list, 2, 5);

    expect(Array.isArray(r)).toBe(true);
    expect(r.length).toBeGreaterThanOrEqual(2);
    expect(r.length).toBeLessThanOrEqual(5);
    expect(list).toEqual(expect.arrayContaining(r));
  });
});

describe('pick', () => {
  it('pick(obj)', () => {
    const obj = { a: 1, b: 2, c: 3, d: 4, e: 5 };
    const keys = Object.keys(obj);
    const r = producer.pick(obj);
    const k = Object.keys(r);

    expect(typeof r).toBe('object');
    expect(k.length).toBe(1);
    expect(keys).toEqual(expect.arrayContaining(k));
  });

  it('pick(obj, length)', () => {
    const obj = { a: 1, b: 2, c: 3, d: 4, e: 5 };
    const keys = Object.keys(obj);
    const r = producer.pick(obj, 3);
    const k = Object.keys(r);

    expect(typeof r).toBe('object');
    expect(k.length).toBe(3);
    expect(keys).toEqual(expect.arrayContaining(k));
  });

  it('pick(obj, min, max)', () => {
    const obj = { a: 1, b: 2, c: 3, d: 4, e: 5 };
    const keys = Object.keys(obj);
    const r = producer.pick(obj, 2, 3);
    const k = Object.keys(r);

    expect(typeof r).toBe('object');
    expect(k.length).toBeGreaterThanOrEqual(2);
    expect(k.length).toBeLessThanOrEqual(3);
    expect(keys).toEqual(expect.arrayContaining(k));
  });

  it('pick(obj, props)', () => {
    const obj = { a: 1, b: 2, c: 3, d: 4, e: 5 };
    const r = producer.pick(obj, ['a', 'b']);
    const k = Object.keys(r);

    expect(typeof r).toBe('object');
    expect(k).toEqual(['a', 'b']);
  });
});
