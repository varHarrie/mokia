import 'mocha';
import { expect } from 'chai';
import * as producer from '../src';

describe('iterate', () => {
  it('iterate(iterator)', () => {
    const r = producer.iterate(() => 'foo');

    expect(r).is.an('array').with.length.within(0, 10);
  });

  it('iterate(iterator, length)', () => {
    const r = producer.iterate(() => 'foo', 3);
    expect(r).is.an('array').with.lengthOf(3);
  });

  it('iterate(iterator, min, max)', () => {
    const r = producer.iterate(() => 'foo', 3, 5);
    expect(r).is.an('array').with.length.within(3, 5);
  });
});

describe('oneOf', () => {
  it('oneOf(list)', () => {
    const r = producer.oneOf(['a', 'b', 'c']);
    expect(r).is.oneOf(['a', 'b', 'c']);
  });
});

describe('manyOf', () => {
  it('manyOf(list)', () => {
    const list = ['a', 'b', 'c', 'd', 'e', 'f'];
    const r = producer.manyOf(list);

    expect(r).is.an('array').with.length.within(0, list.length);
    expect(r).to.satisfies((rr: any[]) => rr.every((i) => list.includes(i)));
  });

  it('manyOf(list, length)', () => {
    const list = ['a', 'b', 'c', 'd', 'e', 'f'];
    const r = producer.manyOf(list, 2);

    expect(r).is.an('array').with.lengthOf(2);
    expect(r).to.satisfies((rr: any[]) => rr.every((i) => list.includes(i)));
  });

  it('manyOf(list, min, max)', () => {
    const list = ['a', 'b', 'c', 'd', 'e', 'f'];
    const r = producer.manyOf(list, 1, 2);

    expect(r).is.an('array').with.length.within(1, 2);
    expect(r).to.satisfies((rr: any[]) => rr.every((i) => list.includes(i)));
  });
});

describe('pick', () => {
  it('pick(obj)', () => {
    const obj = { a: 1, b: 2, c: 3, d: 4, e: 5 };
    const keys = Object.keys(obj);
    const r = producer.pick(obj);
    const k = Object.keys(r);

    expect(r).is.an('object');
    expect(k).have.lengthOf(1);
    expect(k).to.satisfies((kk: any[]) => kk.every((i) => keys.includes(i)));
  });

  it('pick(obj, length)', () => {
    const obj = { a: 1, b: 2, c: 3, d: 4, e: 5 };
    const keys = Object.keys(obj);
    const r = producer.pick(obj, 2);
    const k = Object.keys(r);

    expect(r).is.an('object');
    expect(k).have.lengthOf(2);
    expect(k).to.satisfies((kk: any[]) => kk.every((i) => keys.includes(i)));
  });

  it('pick(obj, min, max)', () => {
    const obj = { a: 1, b: 2, c: 3, d: 4, e: 5 };
    const keys = Object.keys(obj);
    const r = producer.pick(obj, 2, 3);
    const k = Object.keys(r);

    expect(r).is.an('object');
    expect(k).have.length.within(2, 3);
    expect(k).to.satisfies((kk: any[]) => kk.every((i) => keys.includes(i)));
  });

  it('pick(obj, props)', () => {
    const obj = { a: 1, b: 2, c: 3, d: 4, e: 5 };
    const r = producer.pick(obj, ['a', 'b']);
    const k = Object.keys(r);

    expect(r).is.an('object');
    expect(k).to.deep.equal(['a', 'b']);
  });
});
