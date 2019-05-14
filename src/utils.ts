import chalk from 'chalk'
import path from 'path'

export const log = console.log

export const colors: { [key: string]: Function } = {
  GET: chalk.green,
  POST: chalk.blue,
  PUT: chalk.yellow,
  PATCH: chalk.magenta,
  DELETE: chalk.red,
  OPTIONS: chalk.gray
}

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

/**
 * Concat urls
 *
 * @example
 *
 * concatUrls('/aaa', 'bbb', 'ccc', '/ddd')
 * // => '/aaa/bbb/ccc/ddd'
 */
export function concatUrls (...urls: string[]) {
  return urls.map((u, i) => (i > 0 && u[0] !== '/' ? '/' + u : u)).join('')
}

/**
 * Get all dependencies.
 *
 * @example
 *
 * getDependencies('./index.js')
 * // => []
 */
export function getDependencies (rootPath: string, ignore?: RegExp) {
  const module = require.cache[path.resolve(rootPath)]
  const modules = new Set<string>()

  const loopModule = (module: any) => {
    if ((ignore && ignore.test(module.filename)) || modules.has(module.filename)) return

    modules.add(module.filename)
    module.children.forEach(loopModule)
  }

  loopModule(module)
  return [...modules]
}
