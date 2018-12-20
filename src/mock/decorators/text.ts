import * as generators from '../generators'
import { createDecorator } from '../invoker'

export function word (length?: number): PropertyDecorator
export function word (min: number, max: number): PropertyDecorator
export function word (...args: any[]): PropertyDecorator {
  return createDecorator(generators.word, args)
}

export function title (length?: number): PropertyDecorator
export function title (min: number, max: number): PropertyDecorator
export function title (...args: any[]): PropertyDecorator {
  return createDecorator(generators.title, args)
}

export function sentence (length?: number): PropertyDecorator
export function sentence (min: number, max: number): PropertyDecorator
export function sentence (...args: any[]): PropertyDecorator {
  return createDecorator(generators.sentence, args)
}

export function paragraph (length?: number): PropertyDecorator
export function paragraph (min: number, max: number): PropertyDecorator
export function paragraph (...args: any[]): PropertyDecorator {
  return createDecorator(generators.paragraph, args)
}

export function passage (length?: number): PropertyDecorator
export function passage (min: number, max: number): PropertyDecorator
export function passage (...args: any[]): PropertyDecorator {
  return createDecorator(generators.passage, args)
}
