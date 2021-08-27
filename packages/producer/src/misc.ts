import { integer } from './basic';
import { list } from './generate';

/**
 * Options of pagination
 */
export type PaginationOptions = {
  page?: number;
  pageSize?: number;
  total?: number;
  fields?: {
    list?: string;
    page?: string;
    pageSize?: string;
    total?: string;
    totalPages?: string;
  };
};

/**
 * Returns the object that contains paging information
 */
export function pagination<T>(schema: T, options?: PaginationOptions): Record<string, unknown> {
  const pageSize = options?.pageSize ?? 10;
  const total = options?.total ?? integer(0, 1000);
  const totalPages = Math.ceil(total / pageSize);
  const page = options?.page ?? integer(1, totalPages);

  let records: unknown[] = [];

  if (total) {
    if (page > 0 && page < totalPages) records = list(schema, pageSize);
    if (page === totalPages) records = list(schema, total % pageSize || pageSize);
  }

  return {
    [options?.fields?.list ?? 'list']: records,
    [options?.fields?.page ?? 'page']: page,
    [options?.fields?.pageSize ?? 'pageSize']: pageSize,
    [options?.fields?.total ?? 'total']: total,
    [options?.fields?.totalPages ?? 'totalPages']: totalPages,
  };
}
