import * as producer from '../src';

describe('uuid', () => {
  it('uuid()', () => {
    const r = producer.uuid();

    expect(r).toMatch(/[a-z0-9]{8}-[a-z0-9]{4}-4[a-z0-9]{3}-[a-z0-9]{4}-[a-z0-9]{12}/);
  });
});

describe('increment', () => {
  it('increment()', () => {
    const r1 = producer.increment();
    const r2 = producer.increment();

    expect(typeof r1).toBe('number');
    expect(typeof r2).toBe('number');
    expect(r2).toBe(r1 + 1);
  });

  it('increment(step)', () => {
    const r1 = producer.increment();
    const r2 = producer.increment(10);

    expect(typeof r1).toBe('number');
    expect(typeof r2).toBe('number');
    expect(r2).toBe(r1 + 10);
  });
});
