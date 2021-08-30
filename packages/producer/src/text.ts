import { integer, string } from './basic';
import { defaultTo } from './utils';
import { LOWERCASE_LETTERS } from './constants';

function capitalize(value: string) {
  return value.substring(0, 1).toUpperCase() + value.substring(1);
}

/**
 * Returns a word. eg: "aywivh"
 */
export function word(length?: number): string;
export function word(min: number, max: number): string;
export function word(n1?: unknown, n2?: unknown): string {
  const max = defaultTo(n2, n1, 8);
  const min = defaultTo(n1, 1);

  return string(LOWERCASE_LETTERS, min, max);
}

/**
 * Returns a title. eg: "Himgi Krpv Aicgw"
 */
export function title(length?: number): string;
export function title(min: number, max: number): string;
export function title(n1?: unknown, n2?: unknown): string {
  const max = defaultTo(n2, n1, 5);
  const min = defaultTo(n1, 1);

  return Array.from({ length: integer(min, max) })
    .map(() => capitalize(word()))
    .join(' ');
}

/**
 * Returns a sentence. eg: "Lnoq kfuwmzi pdura."
 */
export function sentence(length?: number): string;
export function sentence(min: number, max: number): string;
export function sentence(n1?: unknown, n2?: unknown): string {
  const max = defaultTo(n2, n1, 15);
  const min = defaultTo(n1, 5);

  const str = `${Array.from({ length: integer(min, max) })
    .map(() => word())
    .join(' ')}.`;

  return capitalize(str);
}

/**
 * Returns a paragraph. eg: "[sentence] [sentence] [sentence]"
 */
export function paragraph(length?: number): string;
export function paragraph(min: number, max: number): string;
export function paragraph(n1?: unknown, n2?: unknown): string {
  const max = defaultTo(n2, n1, 5);
  const min = defaultTo(n1, 2);

  return Array.from({ length: integer(min, max) })
    .map(() => sentence())
    .join(' ');
}

/**
 * Returns a passage. eg: "[paragraph]\n[paragraph]\n[paragraph]"
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
