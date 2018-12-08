import chalk from 'chalk'
import Debug from 'debug'
import fs from 'fs'
import meow from 'meow'
import ora from 'ora'
import path from 'path'

import { create, HOST, PORT, PREFIX, ServerConfig } from '..'
import { debounce } from '../mock/utils'

const debug = Debug('mokia:cli')
const cwd = process.cwd()
const spinner = ora()

export default async function run (cli: meow.Result) {
  const { input, flags } = cli
  const configPath = path.join(cwd, input[0] || 'index.ts')

  if (flags.debug) {
    Debug.enable('mokia:*')
  }

  debug('configPath', configPath)
  debug('flags', flags)

  try {
    let destroy: Function = await start(configPath, flags)

    if (flags.watch) {
      fs.watch(configPath, debounce(async (event: string, file: string) => {
        debug('file change', file)
        console.log(`${chalk.yellow('*')} Server is restarting...`)

        await destroy()
        delete require.cache[configPath]
        destroy = await start(configPath, flags)
      }, 500))
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

  let config = await import(configPath)
  if (config && config.default) config = config.default

  if (options.host) config[HOST] = options.host
  if (options.port) config[PORT] = options.port
  if (options.prefix) config[PREFIX] = options.prefix

  debug('config', config)

  const [port, destroy] = await create(config)
  spinner.succeed(`Server is listening on port ${chalk.green(port.toString())}.`)

  return destroy
}
