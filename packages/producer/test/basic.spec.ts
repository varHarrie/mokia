import 'mocha';
import { expect } from 'chai';
import { CHARS } from '../src/constants';
import * as producer from '../src';

const chars = CHARS.split('');

describe('boolean', () => {
  it('boolean()', () => {
    expect(producer.boolean()).is.a('boolean');
  });

  it('boolean(1)', () => {
    expect(producer.boolean(1)).to.equal(true);
  });

  it('boolean(0)', () => {
    expect(producer.boolean(0)).to.equal(false);
  });
});

describe('integer', () => {
  it('integer()', () => {
    const r = producer.integer();
    const i = Math.floor(r);

    expect(r).is.a('number').equal(i);
  });

  it('integer(float)', () => {
    const r = producer.integer(5.8);
    const i = Math.floor(r);

    expect(r).is.a('number').equal(i);
  });

  it('integer(max)', () => {
    const r = producer.integer(10);
    const i = Math.floor(r);

    expect(r).is.a('number').most(10).equal(i);
  });

  it('integer(min, max)', () => {
    const r = producer.integer(10, 20);
    const i = Math.floor(r);

    expect(r).is.a('number').within(10, 20).equal(i);
  });
});

describe('natural', () => {
  it('natural()', () => {
    const r = producer.natural();
    const i = Math.floor(r);

    expect(r).is.a('number').least(0).equal(i);
  });

  it('natural(negative)', () => {
    expect(producer.natural(-10)).is.a('number').equal(0);
  });

  it('natural(max)', () => {
    const r = producer.natural(10);
    const i = Math.floor(r);

    expect(r).is.a('number').within(0, 10).equal(i);
  });

  it('natural(min, max)', () => {
    const r = producer.natural(10, 20);
    const i = Math.floor(r);

    expect(r).is.a('number').within(10, 20).equal(i);
  });
});

describe('float', () => {
  it('float()', () => {
    const r = producer.float();
    const [i, f] = r.toString().split('.');

    expect(r).is.a('number').within(0, 101);
    expect(i).has.length.least(1);
    expect(f).has.length.within(1, 2);
  });

  it('float(max)', () => {
    const r = producer.float(10);
    const [i, f] = r.toString().split('.');

    expect(r).is.a('number').within(0, 11);
    expect(i).has.length.least(1);
    expect(f).has.length.within(1, 2);
  });

  it('float(min, max)', () => {
    const r = producer.float(5, 10);
    const [i, f] = r.toString().split('.');

    expect(r).is.a('number').within(5, 11);
    expect(i).has.length.least(1);
    expect(f).has.length.within(1, 2);
  });

  it('float(min, max, fixed)', () => {
    const r = producer.float(5, 10, 5);
    const [i, f] = r.toString().split('.');

    expect(r).is.a('number').within(5, 11);
    expect(i).has.length.least(1);
    expect(f).has.lengthOf(5);
  });

  it('float(min, max, 0)', () => {
    const r = producer.float(5, 10, 0);
    const [i, f] = r.toString().split('.');

    expect(r).is.a('number').within(5, 10);
    expect(i).has.length.least(1);
    expect(f).to.equal(undefined);
  });

  it('float(min, max, dmin, dmax)', () => {
    const r = producer.float(5, 10, 5, 10);
    const [i, f] = r.toString().split('.');

    expect(r).is.a('number').within(5, 11);
    expect(i).has.length.least(1);
    expect(f).has.length.within(5, 10);
  });
});

describe('char', () => {
  it('char()', () => {
    expect(producer.char()).is.a('string').oneOf(chars);
  });

  it('char(pool)', () => {
    expect(producer.char('abc')).is.a('string').match(/[abc]/);
  });
});

describe('string', () => {
  it('string()', () => {
    const str = producer.string();

    expect(str).is.a('string');
    expect(chars).to.include.members(str.split(''));
  });

  it('string(pool)', () => {
    const str = producer.string('abc');

    expect(str).is.a('string');
    expect(str).to.match(/^[abc]*$/);
  });

  it('string(length)', () => {
    const str = producer.string(10);

    expect(str).is.a('string').with.lengthOf(10);
    expect(chars).to.include.members(str.split(''));
  });

  it('string(pool, length)', () => {
    const pool = 'abc';
    const str = producer.string(pool, 10);

    expect(str).is.a('string');
    expect(str).to.match(/^[abc]{10}$/);
  });

  it('string(pool, min, max)', () => {
    const str = producer.string('abc', 5, 10);

    expect(str).is.a('string');
    expect(str).to.match(/^[abc]{5,10}$/);
  });
});
