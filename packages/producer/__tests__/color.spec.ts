import * as producer from '../src';

describe('hex', () => {
  it('hex()', () => {
    expect(producer.hex()).toMatch(/^#[0-9a-z]{6}$/);
  });
});

describe('rgb', () => {
  it('rgb()', () => {
    expect(producer.rgb()).toMatch(/^rgb\(\d{1,3}, \d{1,3}, \d{1,3}\)$/);
  });
});

describe('rgba', () => {
  it('rgba()', () => {
    expect(producer.rgba()).toMatch(/^rgba\(\d{1,3}, \d{1,3}, \d{1,3}, \d+(\.\d+)?\)$/);
  });
});

describe('hsl', () => {
  it('hsl()', () => {
    expect(producer.hsl()).toMatch(/^hsl\(\d{1,3}, \d{1,3}%, \d{1,3}%\)$/);
  });
});
