import 'mocha';
import { expect } from 'chai';
import * as producer from '../src';

describe('hex', () => {
  it('hex()', () => {
    expect(producer.hex())
      .is.a('string')
      .match(/^#[0-9a-z]{6}$/);
  });
});

describe('rgb', () => {
  it('rgb()', () => {
    expect(producer.rgb())
      .is.a('string')
      .match(/^rgb\(\d{1,3}, \d{1,3}, \d{1,3}\)$/);
  });
});

describe('rgba', () => {
  it('rgba()', () => {
    expect(producer.rgba())
      .is.a('string')
      .match(/^rgba\(\d{1,3}, \d{1,3}, \d{1,3}, \d+(\.\d+)?\)$/);
  });
});

describe('hsl', () => {
  it('hsl()', () => {
    expect(producer.hsl())
      .is.a('string')
      .match(/^hsl\(\d{1,3}, \d{1,3}%, \d{1,3}%\)$/);
  });
});
