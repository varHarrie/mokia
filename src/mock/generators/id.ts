// tslint:disable:no-bitwise

/**
 * Returns an uuid
 *
 * @reference
 *
 * https://stackoverflow.com/a/2117523/10775019
 *
 *
 * @example
 *
 * uuid()
 * // => 'c0f7e803-1b82-47fe-a43d-3265d31f53af'
 */
export function uuid () {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
    const r = Math.random() * 16 | 0
    const v = c === 'x' ? r : (r & 0x3 | 0x8)
    return v.toString(16)
  })
}

let AUTO_INCREMENT_ID = 0

/**
 * Return auto increment id
 *
 * @example
 *
 * increment()
 * // => 1
 *
 * increment(100)
 * // => 101
 *
 */
export function increment (step: number = 1) {
  return AUTO_INCREMENT_ID += step
}
