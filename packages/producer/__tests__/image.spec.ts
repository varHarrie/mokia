import * as producer from '../src';

describe('imageDataURL', () => {
  it('imageDataURL()', () => {
    const r = producer.imageDataURL();

    expect(typeof r).toBe('string');
    expect(r.startsWith('data:image/')).toBe(true);
  });

  it('imageDataURL(size)', () => {
    const width = 100;
    const height = 200;
    const prefix = 'data:image/svg+xml;charset=UTF-8;base64,';

    const url = producer.imageDataURL(`${width}x${height}`);
    const decoded = Buffer.from(url.replace(prefix, ''), 'base64').toString();

    expect(typeof decoded).toBe('string');
    expect(decoded.includes(`width="${width}px" height="${height}px`)).toBe(true);
  });

  it('imageDataURL(size, text)', () => {
    const width = 100;
    const height = 200;
    const text = 'Hello World';
    const prefix = 'data:image/svg+xml;charset=UTF-8;base64,';

    const url = producer.imageDataURL(`${width}x${height}`, text);
    const decoded = Buffer.from(url.replace(prefix, ''), 'base64').toString();

    expect(typeof decoded).toBe('string');
    expect(decoded.includes(`width="${width}px" height="${height}px`)).toBe(true);
    expect(decoded.includes(`>${text}<`)).toBe(true);
  });
});
