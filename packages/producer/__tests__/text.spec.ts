import * as producer from '../src';

describe('word', () => {
  it('word()', () => {
    expect(producer.word()).toMatch(/^[a-z]{1,8}$/);
  });

  it('word(length)', () => {
    expect(producer.word(6)).toMatch(/^[a-z]{6}$/);
  });

  it('word(min, max)', () => {
    expect(producer.word(3, 5)).toMatch(/^[a-z]{3,5}$/);
  });
});

describe('title', () => {
  it('title()', () => {
    const r = producer.title();
    const s = r.split(' ');

    expect(r).toMatch(/^([A-Z][a-z]*\s)*([A-Z][a-z]*)$/);
    expect(s.length).toBeGreaterThanOrEqual(1);
    expect(s.length).toBeLessThanOrEqual(5);
  });

  it('title(length)', () => {
    const r = producer.title(6);
    const s = r.split(' ');

    expect(r).toMatch(/^([A-Z][a-z]*\s)*([A-Z][a-z]*)$/);
    expect(s.length).toBe(6);
  });

  it('title(min, max)', () => {
    const r = producer.title(3, 5);
    const s = r.split(' ');

    expect(r).toMatch(/^([A-Z][a-z]*\s)*([A-Z][a-z]*)$/);
    expect(s.length).toBeGreaterThanOrEqual(3);
    expect(s.length).toBeLessThanOrEqual(5);
  });
});

describe('sentence', () => {
  it('sentence()', () => {
    const r = producer.sentence();
    const s = r.split(' ');

    expect(r).toMatch(/^[A-Z][^.]*\.$/);
    expect(s.length).toBeGreaterThanOrEqual(5);
    expect(s.length).toBeLessThanOrEqual(15);
  });

  it('sentence(length)', () => {
    const r = producer.sentence(5);
    const s = r.split(' ');

    expect(r).toMatch(/^[A-Z][^.]*\.$/);
    expect(s.length).toBe(5);
  });

  it('sentence(min, max)', () => {
    const r = producer.sentence(2, 3);
    const s = r.split(' ');

    expect(r).toMatch(/^[A-Z][^.]*\.$/);
    expect(s.length).toBeGreaterThanOrEqual(2);
    expect(s.length).toBeLessThanOrEqual(3);
  });
});

describe('paragraph', () => {
  it('paragraph()', () => {
    const r = producer.paragraph();
    const s = r.split('. ');

    expect(r).toMatch(/^[A-Z].*\.$/);
    expect(s.length).toBeGreaterThanOrEqual(2);
    expect(s.length).toBeLessThanOrEqual(5);
  });

  it('paragraph(length)', () => {
    const r = producer.paragraph(3);
    const s = r.split('. ');

    expect(r).toMatch(/^[A-Z].*\.$/);
    expect(s.length).toBe(3);
  });

  it('paragraph(min, max)', () => {
    const r = producer.paragraph(3, 5);
    const s = r.split('. ');

    expect(r).toMatch(/^[A-Z].*\.$/);
    expect(s.length).toBeGreaterThanOrEqual(3);
    expect(s.length).toBeLessThanOrEqual(5);
  });
});

describe('passage', () => {
  it('passage()', () => {
    const r = producer.passage();
    const s = r.split('\n');

    expect(r).toMatch(/^[A-Z].*\.$/m);
    expect(s.length).toBeGreaterThanOrEqual(2);
    expect(s.length).toBeLessThanOrEqual(5);
  });

  it('passage(length)', () => {
    const r = producer.passage(3);
    const s = r.split('\n');

    expect(r).toMatch(/^[A-Z].*\.$/m);
    expect(s.length).toBe(3);
  });

  it('passage(min, max)', () => {
    const r = producer.passage(3, 5);
    const s = r.split('\n');

    expect(r).toMatch(/^[A-Z].*\.$/m);
    expect(s.length).toBeGreaterThanOrEqual(3);
    expect(s.length).toBeLessThanOrEqual(5);
  });
});
