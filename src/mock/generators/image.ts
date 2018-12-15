import { createCanvas } from 'canvas'

/**
 * Returns an image url
 *
 * @example
 *
 * image()
 * // => 'http://dummyimage.com/100x100/...'
 *
 * image('64x64')
 * // => 'http://dummyimage.com/64x64/...'
 */
export function image (size?: string): string
export function image (size: string, text: string): string
export function image (size: string, text: string, background: string): string
export function image (size: string, text: string, background: string, foreground: string): string
export function image (size: string, text: string, background: string, foreground: string, format: 'png' | 'jpg' | 'gif'): string
export function image (...args: any[]): string {
  const [
    size = '100x100',
    text = '',
    background = '6a737d',
    foreground = 'fff',
    format = 'png'
  ] = args as string[]

  // candidates:
  // http://dummyimage.com
  // http://dn-placeholder.qbox.me
  // https://placeholder.com
  // http://fpoimg.com
  // http://placekitten.com
  // http://placeimg.com
  // http://uifaces.com

  const host = 'http://dummyimage.com'
  const query = text ? '?text=' + text : ''

  return `${host}/${size}/${background}/${foreground}/${format}${query}`
}

/**
 * Returns a base64 image string
 *
 * @example
 *
 * dataImage()
 * // => 'data:image/...'
 *
 * dataImage('64x64')
 * // => 'data:image/...'
 */
export function dataImage (size?: string): string
export function dataImage (size: string, text: string): string
export function dataImage (size: string, text: string, background: string): string
export function dataImage (size: string, text: string, background: string, foreground: string): string
export function dataImage (size: string, text: string, background: string, foreground: string, format: 'png' | 'jpg' | 'gif'): string
export function dataImage (...args: any[]): string {
  const [
    size = '100x100',
    text = '',
    background = '6a737d',
    foreground = 'fff',
    format = 'png'
  ] = args as string[]

  const [width, height] = size.split('x').map((v) => parseInt(v, 10))
  const canvas = createCanvas(width, height)
  const ctx = canvas.getContext('2d')!

  ctx.fillStyle = background
  ctx.fillRect(0, 0, width, height)

  ctx.textAlign = 'center'
  ctx.textBaseline = 'middle'
  ctx.font = 'bold 14px sans-serif'
  ctx.fillStyle = foreground
  ctx.fillText(text, width / 2, height / 2, width)

  return canvas.toDataURL('image/' + format)
}
