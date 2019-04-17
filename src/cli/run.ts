import chalk from 'chalk'
import Debug from 'debug'
import fs from 'fs'
import meow from 'meow'
import ora from 'ora'
import path from 'path'

import { create, HOST, PORT, PREFIX, PRIORITY, ServerConfig, SILENT } from '../server'
import { debounce, log } from '../utils'

const debug = Debug('mokia:cli')
const cwd = process.cwd()
const spinner = ora()
const noop = () => {
  /* */
}

const tsOptions = {
  compilerOptions: {
    target: 'es6',
    module: 'commonjs',
    lib: ['dom', 'es2016', 'es2017'],
    strictPropertyInitialization: false,
    noUnusedLocals: false,
    moduleResolution: 'node',
    allowSyntheticDefaultImports: true,
    esModuleInterop: true,
    experimentalDecorators: true,
    emitDecoratorMetadata: true
  }
}

export default async function run (cli: meow.Result) {
  const { input, flags } = cli
  const configPath = path.join(cwd, input[0] || 'index.ts')

  if (flags.debug) {
    Debug.enable('mokia:*')
  }

  debug('configPath', configPath)
  debug('flag ', flags)

  if (/\.ts$/.test(configPath)) {
    debug('enable TypeScript...')
    require('ts-node').register(tsOptions)
  }

  try {
    let destroy: Function = await start(configPath, flags)

    if (flags.watch) {
      fs.watch(
        configPath,
        debounce(async (event: string, file: string) => {
          debug('file change', file)
          log(chalk.yellow('*'), `Server is restarting...`)
          spinner.start('Loading...')

          await destroy()
          cleanCache(configPath)
          destroy = await start(configPath, flags)
        }, 500)
      )
    }
  } catch (error) {
    spinner.fail(error.message)
    process.exit(1)
  }

  if (flags.version) cli.showVersion()
  if (flags.help) cli.showHelp()
}

async function start (configPath: string, options: any) {
  spinner.start('Loading...')

  let config: ServerConfig

  try {
    config = await import(configPath)
    if (config && config.default) config = (config as any).default
  } catch (error) {
    debug('error', error)
    spinner.fail(`Could not load: ${configPath}, waiting for change...`)
    return noop
  }

  if (options.host) config[HOST] = options.host
  if (options.port) config[PORT] = options.port
  if (options.prefix) config[PREFIX] = options.prefix
  if (options.silent) config[SILENT] = options.silent
  if (options.priority) config[PRIORITY] = options.priority

  debug('config', config)

  const [port, destroy] = await create(config)
  spinner.succeed(`Server is listening on port ${chalk.green(port.toString())}.`)

  return destroy
}

function cleanCache (configPath: string) {
  const module = require.cache[configPath]
  const siblings = module && module.parent && module.parent.children

  if (siblings) {
    const index = siblings.indexOf(module)
    siblings.splice(index, 1)
  }

  require.cache[configPath] = null
}

process.on('unhandledRejection', (err) => {
  debug('unhandled rejection', err)
})
