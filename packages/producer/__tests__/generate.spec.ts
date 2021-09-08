import * as producer from '../src';

describe('generate', () => {
  it('generate(function)', () => {
    const r = producer.generate(() => 'Harrie');
    expect(r).toBe('Harrie');
  });

  it('generate(array)', () => {
    const r = producer.generate([() => 1, () => 2, 3]);
    expect(r).toEqual([1, 2, 3]);
  });

  it('generate(object)', () => {
    const r = producer.generate({ a: () => 1, b: () => 2, c: 3 });
    expect(r).toEqual({ a: 1, b: 2, c: 3 });
  });

  it('generate(other)', () => {
    expect(producer.generate('foo')).toBe('foo');
    expect(producer.generate(null)).toBe(null);
    expect(producer.generate(undefined)).toBe(undefined);
  });
});

describe('list', () => {
  it('list(schema)', () => {
    const r = producer.list(() => 'foo');

    expect(Array.isArray(r)).toBe(true);
    expect(r.length).toBeGreaterThanOrEqual(0);
    expect(r.length).toBeLessThanOrEqual(10);
  });

  it('list(schema, length)', () => {
    const r = producer.list(() => 'foo', 3);

    expect(Array.isArray(r)).toBe(true);
    expect(r.length).toBe(3);
  });

  it('list(schema, min, max)', () => {
    const r = producer.list(() => 'foo', 3, 5);

    expect(Array.isArray(r)).toBe(true);
    expect(r.length).toBeGreaterThanOrEqual(3);
    expect(r.length).toBeLessThanOrEqual(5);
  });
});
