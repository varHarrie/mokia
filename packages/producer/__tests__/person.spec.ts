import * as producer from '../src';

describe('age', () => {
  it('age()', () => {
    const r = producer.age();

    expect(typeof r).toBe('number');
    expect(r).toBeGreaterThanOrEqual(1);
    expect(r).toBeLessThanOrEqual(100);
  });

  it('age(min)', () => {
    const r = producer.age(18);

    expect(typeof r).toBe('number');
    expect(r).toBeGreaterThanOrEqual(18);
    expect(r).toBeLessThanOrEqual(100);
  });

  it('age(min, max)', () => {
    const r = producer.age(18, 30);

    expect(typeof r).toBe('number');
    expect(r).toBeGreaterThanOrEqual(18);
    expect(r).toBeLessThanOrEqual(30);
  });
});

describe('birthday', () => {
  it('birthday()', () => {
    expect(producer.birthday()).toMatch(/^\d{4}-\d{2}-\d{2}$/);
  });

  it('birthday(format)', () => {
    expect(producer.birthday('DD/MM/YYYY')).toMatch(/^\d{2}\/\d{2}\/\d{4}$/);
  });
});

describe('firstName', () => {
  it('firstName()', () => {
    expect(producer.firstName()).toMatch(/^[A-Z][a-z]+$/);
  });
});

describe('lastName', () => {
  it('lastName()', () => {
    expect(producer.lastName()).toMatch(/^[A-Z][a-z]+$/);
  });
});

describe('fullName', () => {
  it('fullName()', () => {
    expect(producer.fullName()).toMatch(/^[A-Z][a-z]+\s[A-Z][a-z]+$/);
  });
});
