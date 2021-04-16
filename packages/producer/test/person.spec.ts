import 'mocha';
import { expect } from 'chai';
import * as producer from '../src';

describe('age', () => {
  it('age()', () => {
    expect(producer.age()).is.a('number').within(1, 100);
  });

  it('age(min)', () => {
    expect(producer.age(18)).is.a('number').within(18, 100);
  });

  it('age(min, max)', () => {
    expect(producer.age(18, 30)).is.a('number').within(18, 30);
  });
});

describe('birthday', () => {
  it('birthday()', () => {
    expect(producer.birthday())
      .is.a('string')
      .match(/^\d{4}-\d{2}-\d{2}$/);
  });

  it('birthday(format)', () => {
    expect(producer.birthday('DD/MM/YYYY'))
      .is.a('string')
      .match(/^\d{2}\/\d{2}\/\d{4}$/);
  });
});

describe('firstName', () => {
  it('firstName()', () => {
    expect(producer.firstName())
      .is.a('string')
      .match(/^[A-Z][a-z]+$/);
  });
});

describe('lastName', () => {
  it('lastName()', () => {
    expect(producer.lastName())
      .is.a('string')
      .match(/^[A-Z][a-z]+$/);
  });
});

describe('fullName', () => {
  it('fullName()', () => {
    expect(producer.fullName())
      .is.a('string')
      .match(/^[A-Z][a-z]+\s[A-Z][a-z]+$/);
  });
});
