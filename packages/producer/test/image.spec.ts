import 'mocha';
import { expect } from 'chai';
import * as producer from '../src';

describe('imageDataURL', () => {
  it('imageDataURL()', () => {
    expect(producer.imageDataURL())
      .is.a('string')
      .satisfies((url: string) => url.startsWith('data:image/'));
  });

  it('imageDataURL(size)', () => {
    const width = 100;
    const height = 200;
    const prefix = 'data:image/svg+xml;charset=UTF-8;base64,';

    const url = producer.imageDataURL(`${width}x${height}`);
    const decoded = Buffer.from(url.replace(prefix, ''), 'base64').toString();

    expect(decoded)
      .is.a('string')
      .satisfies((url: string) => url.includes(`width="${width}px" height="${height}px`));
  });

  it('imageDataURL(size, text)', () => {
    const width = 100;
    const height = 200;
    const text = 'Hello World';
    const prefix = 'data:image/svg+xml;charset=UTF-8;base64,';

    const url = producer.imageDataURL(`${width}x${height}`, text);
    const decoded = Buffer.from(url.replace(prefix, ''), 'base64').toString();

    expect(decoded).is.a('string');
    expect(decoded).satisfies((url: string) => url.includes(`width="${width}px" height="${height}px`));
    expect(decoded).satisfies((url: string) => url.includes(`>${text}<`));
  });
});
