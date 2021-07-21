import * as producer from '../src';

describe('datetime', () => {
  it('datetime()', () => {
    expect(producer.datetime()).toMatch(/^\d{4}-\d{2}-\d{2}\s\d{2}:\d{2}:\d{2}$/);
  });

  it('datetime(format)', () => {
    expect(producer.datetime('DD/MM/YY')).toMatch(/^\d{2}\/\d{2}\/\d{2}$/);
  });

  it('datetime(format, min)', () => {
    const r = producer.datetime('YYYY-MM-DD HH:mm:ss', '1970-01-01 09:00:00');
    const d = new Date(r);

    expect(typeof r).toBe('string');
    expect(d.getTime()).toBeGreaterThanOrEqual(new Date(0).getTime());
  });

  it('datetime(format, min, max)', () => {
    const min = '2000-01-01 00:00:00';
    const max = '2000-01-01 2:00:00';
    const r = producer.datetime('YYYY-MM-DD HH:mm:ss', min, max);
    const d = new Date(r);

    expect(typeof r).toBe('string');
    expect(d.getTime()).toBeGreaterThanOrEqual(new Date(min).getTime());
    expect(d.getTime()).toBeLessThanOrEqual(new Date(max).getTime());
  });
});

describe('date', () => {
  it('date()', () => {
    expect(producer.date()).toMatch(/^\d{4}-\d{2}-\d{2}$/);
  });
});

describe('time', () => {
  it('time()', () => {
    expect(producer.time()).toMatch(/^\d{2}:\d{2}:\d{2}$/);
  });

  it('time(format)', () => {
    expect(producer.time('HH:mm')).toMatch(/^\d{2}:\d{2}$/);
  });
});

describe('now', () => {
  it('now()', () => {
    expect(producer.now()).toMatch(/^\d{4}-\d{2}-\d{2}\s\d{2}:\d{2}:\d{2}$/);
  });

  it('now(format)', () => {
    expect(producer.now('HH:mm:ss')).toMatch(/^\d{2}:\d{2}:\d{2}$/);
  });
});

describe('timestamp', () => {
  it('timestamp()', () => {
    const r = producer.timestamp();

    expect(typeof r).toBe('number');
    expect(r).toBeGreaterThanOrEqual(0);
  });

  it('timestamp(min)', () => {
    const r = producer.timestamp('1970-01-01 09:00:00');

    expect(typeof r).toBe('number');
    expect(r).toBeGreaterThanOrEqual(0);
  });

  it('timestamp(min, max)', () => {
    const min = '2000-01-01 00:00:00';
    const max = '2000-01-01 2:00:00';
    const r = producer.timestamp(min, max);

    expect(typeof r).toBe('number');
    expect(r).toBeGreaterThanOrEqual(new Date(min).getTime());
    expect(r).toBeLessThanOrEqual(new Date(max).getTime());
  });
});
