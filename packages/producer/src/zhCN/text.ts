import { integer, string } from '../basic';
import { defaultTo } from '../utils';
import { WORDS } from './constants';

/**
 * Returns a word.
 */
export function word(length?: number): string;
export function word(min: number, max: number): string;
export function word(n1?: unknown, n2?: unknown): string {
  const max = defaultTo(n2, n1, 1);
  const min = defaultTo(n1, 1);

  return string(WORDS, min, max);
}

/**
 * Returns a title.
 */
export function title(length?: number): string;
export function title(min: number, max: number): string;
export function title(n1?: unknown, n2?: unknown): string {
  const max = defaultTo(n2, n1, 8);
  const min = defaultTo(n1, 3);

  return word(min, max);
}

/**
 * Returns a sentence.
 */
export function sentence(length?: number): string;
export function sentence(min: number, max: number): string;
export function sentence(n1?: unknown, n2?: unknown): string {
  const max = defaultTo(n2, n1, 18);
  const min = defaultTo(n1, 8);

  return `${word(min, max)}。`;
}

/**
 * Returns a paragraph.
 */
export function paragraph(length?: number): string;
export function paragraph(min: number, max: number): string;
export function paragraph(n1?: unknown, n2?: unknown): string {
  const max = defaultTo(n2, n1, 8);
  const min = defaultTo(n1, 3);

  return Array.from({ length: integer(min, max) })
    .map(() => sentence())
    .join('');
}

/**
 * Returns a passage.
 */
export function passage(length?: number): string;
export function passage(min: number, max: number): string;
export function passage(n1?: unknown, n2?: unknown): string {
  const max = defaultTo(n2, n1, 5);
  const min = defaultTo(n1, 2);

  return Array.from({ length: integer(min, max) })
    .map(() => paragraph())
    .join('\n');
}
