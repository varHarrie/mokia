import * as generators from '../generators'
import { createDecorator } from '../invoker'

export function image (size?: string): PropertyDecorator
export function image (size: string, text: string): PropertyDecorator
export function image (size: string, text: string, background: string): PropertyDecorator
export function image (size: string, text: string, background: string, foreground: string): PropertyDecorator
export function image (size: string, text: string, background: string, foreground: string, format: 'png' | 'jpg' | 'gif'): PropertyDecorator
export function image (...args: any[]): PropertyDecorator {
  return createDecorator(generators.image, args)
}

export function dataImage (size?: string): PropertyDecorator
export function dataImage (size: string, text: string): PropertyDecorator
export function dataImage (size: string, text: string, background: string): PropertyDecorator
export function dataImage (size: string, text: string, background: string, foreground: string): PropertyDecorator
export function dataImage (size: string, text: string, background: string, foreground: string, format: 'png' | 'jpg' | 'gif'): PropertyDecorator
export function dataImage (...args: any[]): PropertyDecorator {
  return createDecorator(generators.dataImage, args)
}
