export const log = console.log

/**
 * Returns a debounced function
 *
 * @example
 *
 * debounce(function () { }, 200)
 */
export function debounce<T extends Function> (fn: T, delay: number): T {
  let timer: any

  return function (this: any, ...args: any[]) {
    clearTimeout(timer)

    timer = setTimeout(() => {
      fn.apply(this, args)
    }, delay)
  } as any
}
