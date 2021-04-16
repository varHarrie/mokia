import 'mocha';
import { expect } from 'chai';
import * as producer from '../src';

describe('uuid', () => {
  it('uuid()', () => {
    const r = producer.uuid();

    expect(r)
      .is.a('string')
      .match(/[a-z0-9]{8}-[a-z0-9]{4}-4[a-z0-9]{3}-[a-z0-9]{4}-[a-z0-9]{12}/);
  });
});

describe('increment', () => {
  it('increment()', () => {
    const r1 = producer.increment();
    const r2 = producer.increment();

    expect(r1).is.a('number');
    expect(r2)
      .is.a('number')
      .equal(r1 + 1);
  });

  it('increment(step)', () => {
    const r1 = producer.increment();
    const r2 = producer.increment(10);

    expect(r1).is.a('number');
    expect(r2)
      .is.a('number')
      .equal(r1 + 10);
  });
});
