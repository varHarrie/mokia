import dayjs from 'dayjs';
import { integer } from './basic';
import { MAX_DATE, MIN_DATE, TEMPLATE_DATE, TEMPLATE_DATETIME, TEMPLATE_TIME } from './constants';

/**
 * Date like type
 */
export type DateLike = number | string | Date;

/**
 * Formats the date as a string
 */
function formatDate(date: DateLike, template: string) {
  return dayjs(date).format(template);
}

/**
 * Returns a date object
 */
function randomDate(): Date;
function randomDate(min: DateLike): Date;
function randomDate(min: DateLike, max: DateLike): Date;
function randomDate(min?: DateLike, max?: DateLike): Date;
function randomDate(min?: DateLike, max?: DateLike): Date {
  const minDate = min === undefined ? MIN_DATE : new Date(min);
  const maxDate = max === undefined ? MAX_DATE : new Date(max);

  return new Date(integer(minDate.getTime(), maxDate.getTime()));
}

/**
 * Returns a date time string
 */
export function datetime(format?: string): string;
export function datetime(format: string, min: DateLike): string;
export function datetime(format: string, min: DateLike, max: DateLike): string;
export function datetime(format?: string, min?: DateLike, max?: DateLike): string {
  return formatDate(randomDate(min, max), format ?? TEMPLATE_DATETIME);
}

/**
 * Returns date string
 */
export function date(format?: string): string;
export function date(format: string, min: DateLike): string;
export function date(format: string, min: DateLike, max: DateLike): string;
export function date(format?: string, min?: DateLike, max?: DateLike): string {
  return formatDate(randomDate(min, max), format ?? TEMPLATE_DATE);
}

/**
 * Returns date string
 */
export function time(format?: string): string;
export function time(format: string, min: DateLike): string;
export function time(format: string, min: DateLike, max: DateLike): string;
export function time(format?: string, min?: DateLike, max?: DateLike): string {
  return formatDate(randomDate(min, max), format ?? TEMPLATE_TIME);
}

/**
 * Returns current datetime string
 */
export function now(format?: string): string {
  return formatDate(new Date(), format || TEMPLATE_DATETIME);
}

/**
 * Returns timestamp string
 */
export function timestamp(): number;
export function timestamp(min: DateLike): number;
export function timestamp(min: DateLike, max: DateLike): number;
export function timestamp(min?: DateLike, max?: DateLike): number {
  return randomDate(min, max).getTime();
}
