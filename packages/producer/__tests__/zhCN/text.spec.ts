import * as producer from '../../src';

describe('word', () => {
  it('word()', () => {
    expect(producer.zhCN.word()).toMatch(/^[\u4e00-\u9fa5]{1}$/);
  });

  it('word(length)', () => {
    expect(producer.zhCN.word(6)).toMatch(/^[\u4e00-\u9fa5]{6}$/);
  });

  it('word(min, max)', () => {
    expect(producer.zhCN.word(3, 5)).toMatch(/^[\u4e00-\u9fa5]{3,5}$/);
  });
});

describe('title', () => {
  it('title()', () => {
    expect(producer.zhCN.title()).toMatch(/^[\u4e00-\u9fa5]{3,8}$/);
  });

  it('title(length)', () => {
    expect(producer.zhCN.title(6)).toMatch(/^[\u4e00-\u9fa5]{6}$/);
  });

  it('title(min, max)', () => {
    expect(producer.zhCN.title(3, 5)).toMatch(/^[\u4e00-\u9fa5]{3,5}$/);
  });
});

describe('sentence', () => {
  it('sentence()', () => {
    expect(producer.zhCN.sentence()).toMatch(/^[\u4e00-\u9fa5]{8,18}。$/);
  });

  it('sentence(length)', () => {
    expect(producer.zhCN.sentence(5)).toMatch(/^[\u4e00-\u9fa5]{5}。$/);
  });

  it('sentence(min, max)', () => {
    expect(producer.zhCN.sentence(2, 3)).toMatch(/^[\u4e00-\u9fa5]{2,3}。$/);
  });
});

describe('paragraph', () => {
  it('paragraph()', () => {
    expect(producer.zhCN.paragraph()).toMatch(/^([\u4e00-\u9fa5]{8,18}。){3,8}$/);
  });

  it('paragraph(length)', () => {
    expect(producer.zhCN.paragraph(3)).toMatch(/^([\u4e00-\u9fa5]{8,18}。){3}$/);
  });

  it('paragraph(min, max)', () => {
    expect(producer.zhCN.paragraph(3, 5)).toMatch(/^([\u4e00-\u9fa5]{8,18}。){3,5}$/);
  });
});

describe('passage', () => {
  it('passage()', () => {
    const r = producer.zhCN.passage();
    const s = r.split('\n');

    s.forEach((line) => {
      expect(line).toMatch(/^([\u4e00-\u9fa5]{8,18}。){3,8}$/);
    });

    expect(s.length).toBeGreaterThanOrEqual(2);
    expect(s.length).toBeLessThanOrEqual(5);
  });

  it('passage(length)', () => {
    const r = producer.zhCN.passage(2);
    const s = r.split('\n');

    s.forEach((line) => {
      expect(line).toMatch(/^([\u4e00-\u9fa5]{8,18}。){3,8}$/);
    });

    expect(s.length).toBe(2);
  });

  it('passage(min, max)', () => {
    const r = producer.zhCN.passage(3, 5);
    const s = r.split('\n');

    s.forEach((line) => {
      expect(line).toMatch(/^([\u4e00-\u9fa5]{8,18}。){3,8}$/);
    });

    expect(s.length).toBeGreaterThanOrEqual(3);
    expect(s.length).toBeLessThanOrEqual(5);
  });
});
