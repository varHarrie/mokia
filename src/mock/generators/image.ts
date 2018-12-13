import * as utils from '../utils'

/**
 * Returns an image url
 *
 * @example
 *
 * image()
 * // => http://dummyimage.com/100x100
 *
 * image('64x64')
 * // => http://dummyimage.com/64x64
 */
export function image (size?: string): string
export function image (size: string, text: string): string
export function image (size: string, text: string, background: string): string
export function image (size: string, text: string, background: string, foreground: string): string
export function image (size: string, text: string, background: string, foreground: string, format: 'png' | 'jpg' | 'gif'): string
export function image (...args: any[]): string {
  return utils.createUrlImage(...args)
}

/**
 * Returns a base64 image string
 *
 * @example
 *
 * dataImage()
 * // => data:image/...
 *
 * dataImage('64x64')
 * // => data:image/...
 */
export function dataImage (size?: string): string
export function dataImage (size: string, text: string): string
export function dataImage (size: string, text: string, background: string): string
export function dataImage (size: string, text: string, background: string, foreground: string): string
export function dataImage (size: string, text: string, background: string, foreground: string, format: 'png' | 'jpg' | 'gif'): string
export function dataImage (...args: any[]): string {
  return utils.createBase64Image(...args)
}
