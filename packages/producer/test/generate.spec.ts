import 'mocha';
import { expect } from 'chai';
import * as producer from '../src';

describe('generate', () => {
  it('generate(function)', () => {
    const r = producer.generate(() => 'Harrie');
    expect(r).to.equal('Harrie');
  });

  it('generate(array)', () => {
    const r = producer.generate([() => 1, () => 2, 3]);
    expect(r).to.deep.equal([1, 2, 3]);
  });

  it('generate(object)', () => {
    const r = producer.generate({ a: () => 1, b: () => 2, c: 3 });
    expect(r).to.deep.equal({ a: 1, b: 2, c: 3 });
  });

  it('generate(other)', () => {
    expect(producer.generate('foo')).to.equal('foo');
    expect(producer.generate(null)).to.equal(null);
    expect(producer.generate(undefined)).to.equal(undefined);
  });
});

describe('list', () => {
  it('list(schema)', () => {
    const r = producer.list(() => 'foo');
    expect(r).is.an('array').with.length.within(0, 10);
  });

  it('list(schema, length)', () => {
    const r = producer.list(() => 'foo', 3);
    expect(r).is.an('array').with.lengthOf(3);
  });

  it('list(schema, min, max)', () => {
    const r = producer.list(() => 'foo', 3, 5);
    expect(r).is.an('array').with.length.within(3, 5);
  });
});
