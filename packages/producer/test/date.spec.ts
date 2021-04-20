import 'mocha';
import { expect } from 'chai';
import * as producer from '../src';

describe('datetime', () => {
  it('datetime()', () => {
    expect(producer.datetime()).to.match(/^\d{4}-\d{2}-\d{2}\s\d{2}:\d{2}:\d{2}$/);
  });

  it('datetime(format)', () => {
    expect(producer.datetime('DD/MM/YY')).to.match(/^\d{2}\/\d{2}\/\d{2}$/);
  });

  it('datetime(format, min)', () => {
    const r = producer.datetime('YYYY-MM-DD HH:mm:ss', '1970-01-01 09:00:00');
    const d = new Date(r);

    expect(r).is.a('string');
    expect(d).is.greaterThanOrEqual(new Date(0));
  });

  it('datetime(format, min, max)', () => {
    const r = producer.datetime('YYYY-MM-DD HH:mm:ss', '2000-01-01 00:00:00', '2000-01-01 2:00:00');
    const d = new Date(r);

    expect(r).is.a('string');
    expect(d).within(new Date('2000-01-01 00:00:00'), new Date('2000-01-01 2:00:00'));
  });
});

describe('date', () => {
  it('date()', () => {
    expect(producer.date()).to.match(/^\d{4}-\d{2}-\d{2}$/);
  });
});

describe('time', () => {
  it('time()', () => {
    expect(producer.time()).to.match(/^\d{2}:\d{2}:\d{2}$/);
  });

  it('time(format)', () => {
    expect(producer.time('HH:mm')).to.match(/^\d{2}:\d{2}$/);
  });
});

describe('now', () => {
  it('now()', () => {
    expect(producer.now()).to.match(/^\d{4}-\d{2}-\d{2}\s\d{2}:\d{2}:\d{2}$/);
  });

  it('now(format)', () => {
    expect(producer.now('HH:mm:ss')).to.match(/^\d{2}:\d{2}:\d{2}$/);
  });
});

describe('timestamp', () => {
  it('timestamp()', () => {
    expect(producer.timestamp()).is.a('number').greaterThanOrEqual(0);
  });

  it('timestamp(min)', () => {
    const r = producer.timestamp('1970-01-01 09:00:00');
    expect(r).is.a('number').greaterThanOrEqual(0);
  });

  it('timestamp(min, max)', () => {
    const r = producer.timestamp('2000-01-01 00:00:00', '2000-01-01 2:00:00');
    expect(r).is.a('number').within(new Date('2000-01-01 00:00:00').getTime(), new Date('2000-01-01 2:00:00').getTime());
  });
});
