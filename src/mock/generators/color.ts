import { hslToRgb } from '../utils'
import { GOLDEN_RATIO_CONJUGATE } from '../constants'

let hue = Math.random()

function randomHue () {
  return hue = (hue + GOLDEN_RATIO_CONJUGATE) % 1
}

/**
 * Returns a hex color string
 *
 * @example
 *
 * hex()
 * // => '#79f2e1'
 */
export function hex (): string {
  const values = hslToRgb(randomHue(), 0.5, 0.6)
    .map((v) => Math.round(v * 255).toString(16).padStart(2, '0'))
    .join('')

  return '#' + values
}

/**
 * Returns a rgb color string
 *
 * @example
 *
 * rgb()
 * // => 'rgb(228, 242, 124)'
 */
export function rgb (): string {
  const values = hslToRgb(randomHue(), 0.5, 0.6)
    .map((v) => Math.round(v * 255))
    .join(', ')

  return 'rgb(' + values + ')'
}

/**
 * Returns a rgba color string
 *
 * @example
 *
 * rgba()
 * // => 'rgba(242, 149, 121, 0.51)'
 */
export function rgba (): string {
  const values = hslToRgb(randomHue(), 0.5, 0.6)
    .map((v) => Math.round(v * 255))
    .join(', ')

  return 'rgb(' + values + ', ' + Math.random().toFixed(2) + ')'
}

/**
 * Returns a hsl color string
 *
 * @example
 *
 * hsl()
 * // => 'hsl(58, 50%, 60%)'
 */
export function hsl (): string {
  const h = randomHue() * 360

  return 'hsl(' + h + ', 50%, 60%)'
}

/**
 * Returns a hex color string
 *
 * @example
 *
 * color()
 * // => '#79f2e1'
 */
export function color (): string {
  return hex()
}
