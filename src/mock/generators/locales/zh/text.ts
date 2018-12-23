import { WORDS } from './constants'
import { string, integer } from '../../basic'
import { defaultTo, capitalize } from '../../../utils'

/**
 * Returns a word
 *
 * @example
 *
 * word()
 * // => '已'
 *
 * word(5)
 * // => '极相称局会'
 *
 * word(3, 10)
 * // => '当断个看'
 */
export function word (length?: number): string
export function word (min: number, max: number): string
export function word (n1?: any, n2?: any): string {
  const max = defaultTo(n2, defaultTo(n1, 1))
  const min = defaultTo(n1, 1)

  return string(WORDS, min, max)
}

/**
 * Returns a title
 *
 * @example
 *
 * title()
 * // => '走因拉名'
 *
 * title(5)
 * // => '热实身六部'
 *
 * title(3, 10)
 * // => '快节世得成候'
 */
export function title (length?: number): string
export function title (min: number, max: number): string
export function title (n1?: any, n2?: any): string {
  const max = defaultTo(n2, defaultTo(n1, 8))
  const min = defaultTo(n1, 3)

  return word(min, max)
}

/**
 * Returns a sentence
 *
 * @example
 *
 * sentence()
 * // => '于活平少联展思各多受族代至。'
 *
 * sentence(5)
 * // => '名龙有好都。'
 *
 * sentence(3, 10)
 * // => '色最提量毛斯合。'
 */
export function sentence (length?: number): string
export function sentence (min: number, max: number): string
export function sentence (n1?: any, n2?: any): string {
  const max = defaultTo(n2, defaultTo(n1, 18))
  const min = defaultTo(n1, 8)

  return word(min, max) + '。'
}

/**
 * Returns a paragraph
 *
 * @example
 *
 * paragraph()
 * // => 'xxx。xxx。xxx。'
 *
 * paragraph(2)
 * // => 'xxx。xxx。'
 *
 * paragraph(2, 4)
 * // => 'xxx。xxx。xxx。xxx。'
 */
export function paragraph (length?: number): string
export function paragraph (min: number, max: number): string
export function paragraph (n1?: any, n2?: any): string {
  const max = defaultTo(n2, defaultTo(n1, 8))
  const min = defaultTo(n1, 3)

  return Array
    .from({ length: integer(min, max) })
    .map(() => sentence())
    .join('')
}

/**
 * Returns a passage
 *
 * @example
 *
 * passage()
 * // => '...\n...\n...'
 *
 * passage(2)
 * // => '...\n...\n'
 *
 * passage(2, 4)
 * // => '...\n...\n...\n...'
 */
export function passage (length?: number): string
export function passage (min: number, max: number): string
export function passage (n1?: any, n2?: any): string {
  const max = defaultTo(n2, defaultTo(n1, 5))
  const min = defaultTo(n1, 2)

  return Array
    .from({ length: integer(min, max) })
    .map(() => paragraph())
    .join('\n')
}
