import * as producer from '../../src';

describe('province', () => {
  it('province()', () => {
    const r = producer.zhCN.province();

    expect(typeof r).toBe('object');
    expect(r).toHaveProperty('code');
    expect(r).toHaveProperty('name');
  });
});

describe('provinceName', () => {
  it('provinceName()', () => {
    expect(typeof producer.zhCN.provinceName()).toBe('string');
  });
});

describe('city', () => {
  it('city()', () => {
    const r = producer.zhCN.city();

    expect(typeof r).toBe('object');
    expect(r).toHaveProperty('code');
    expect(r).toHaveProperty('name');
  });
});

describe('cityName', () => {
  it('cityName()', () => {
    expect(typeof producer.zhCN.cityName()).toBe('string');
  });
});

describe('county', () => {
  it('county()', () => {
    const r = producer.zhCN.county();

    expect(typeof r).toBe('object');
    expect(r).toHaveProperty('code');
    expect(r).toHaveProperty('name');
  });
});

describe('countyName', () => {
  it('countyName()', () => {
    expect(typeof producer.zhCN.countyName()).toBe('string');
  });
});

describe('region', () => {
  it('region()', () => {
    const r = producer.zhCN.region();

    expect(Array.isArray(r)).toBe(true);

    r.forEach((item) => {
      expect(item).toHaveProperty('code');
      expect(item).toHaveProperty('name');
    });
  });
});

describe('regionName', () => {
  it('regionName()', () => {
    expect(typeof producer.zhCN.regionName()).toBe('string');
  });

  it('regionName(separator)', () => {
    const r = producer.zhCN.regionName(',');
    const s = r.split(',');

    expect(typeof r).toBe('string');
    expect(s.length).toBeGreaterThanOrEqual(1);
    expect(s.length).toBeLessThanOrEqual(3);
  });
});
