import * as producer from '../src';

describe('pagination', () => {
  it('pagination()', () => {
    const r = producer.pagination({ a: 1 });

    expect(typeof r).toBe('object');
    expect(Array.isArray(r.list)).toBe(true);
    expect(typeof r.page).toBe('number');
    expect(typeof r.pageSize).toBe('number');
    expect(typeof r.total).toBe('number');
    expect(typeof r.totalPages).toBe('number');
  });

  it('pagination(options)', () => {
    Array.from({ length: 3 }).forEach((_, i) => {
      const r = producer.pagination({ a: 1 }, { page: i + 1, pageSize: 10, total: 23 });

      expect(typeof r).toBe('object');
      expect(Array.isArray(r.list)).toBe(true);
      expect((r.list as []).length).toBe(i === 2 ? 3 : 10);

      expect(r.page).toBe(i + 1);
      expect(r.pageSize).toBe(10);
      expect(r.total).toBe(23);
      expect(r.totalPages).toBe(3);
    });
  });

  it('pagination({fields})', () => {
    const r = producer.pagination(
      { a: 1 },
      {
        fields: {
          list: 'data',
          page: 'current',
          pageSize: 'size',
          total: 'count',
          totalPages: 'pageCount',
        },
      },
    );

    expect(typeof r).toBe('object');
    expect(Array.isArray(r.data)).toBe(true);
    expect(typeof r.current).toBe('number');
    expect(typeof r.size).toBe('number');
    expect(typeof r.count).toBe('number');
    expect(typeof r.pageCount).toBe('number');
  });
});
