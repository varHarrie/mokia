import { integer, string } from './basic'
import { pools } from '../constants'
import { capitalize, defaultTo } from '../utils'

/**
 * Returns a word
 *
 * @example
 *
 * word()
 * // => 'aywivh'
 *
 * word(5)
 * // => 'krqmh'
 *
 * word(3, 10)
 * // => 'rivpau'
 */
export function word (length?: number): string
export function word (min: number, max: number): string
export function word (n1?: any, n2?: any): string {
  const max = defaultTo(n2, defaultTo(n1, 8))
  const min = defaultTo(n1, 1)

  return string(pools.lower, min, max)
}

/**
 * Returns a title
 *
 * @example
 *
 * title()
 * // => 'Himgi Krpv Aicgw'
 *
 * title(5)
 * // => 'Ymxgw Qkv Jmy Tlfsun Kiewcg'
 *
 * title(3, 10)
 * // => 'Pkfqif Hipr Jvsm Oqkkk'
 */
export function title (length?: number): string
export function title (min: number, max: number): string
export function title (n1?: any, n2?: any): string {
  const max = defaultTo(n2, defaultTo(n1, 5))
  const min = defaultTo(n1, 1)

  return Array
    .from({ length: integer(min, max) })
    .map(() => capitalize(word()))
    .join(' ')
}

/**
 * Returns a sentence
 *
 * @example
 *
 * sentence()
 * // => 'Lnoq kfuwmzi pdura.'
 *
 * sentence(5)
 * // => 'Skvp qkfvpd fhre zloqjbn uekgr.'
 *
 * sentence(3, 10)
 * // => 'Vkriw kbuq lgonza wurmg.'
 */
export function sentence (length?: number): string
export function sentence (min: number, max: number): string
export function sentence (n1?: any, n2?: any): string {
  const max = defaultTo(n2, defaultTo(n1, 15))
  const min = defaultTo(n1, 5)

  const str = Array
    .from({ length: integer(min, max) })
    .map(() => word())
    .join(' ') + '.'

  return capitalize(str)
}

/**
 * Returns a paragraph
 *
 * @example
 *
 * paragraph()
 * // => 'xxx. xxx. xxx.'
 *
 * paragraph(2)
 * // => 'xxx. xxx.'
 *
 * paragraph(2, 4)
 * // => 'xxx. xxx. xxx. xxx.'
 */
export function paragraph (length?: number): string
export function paragraph (min: number, max: number): string
export function paragraph (n1?: any, n2?: any): string {
  const max = defaultTo(n2, defaultTo(n1, 5))
  const min = defaultTo(n1, 2)

  return Array
    .from({ length: integer(min, max) })
    .map(() => sentence())
    .join(' ')
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
