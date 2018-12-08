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

  debug('configPath', configPath)

  const options = {
    [HOST]: flags.host,
    [PORT]: flags.port,
    [PREFIX]: flags.prefix
  }

  try {
    let destroy: Function = await start(configPath, options)

    if (flags.watch) {
      fs.watch(configPath, debounce(async (event: string, file: string) => {
        await destroy()
        destroy = await start(configPath, options)
      }, 500))
    }
  } catch (error) {
    spinner.fail(error.message)
    process.exit(1)
  }

  if (flags.version) cli.showVersion()
  if (flags.help) cli.showHelp()
}

async function start (configPath: string, options: ServerConfig) {
  spinner.start('Loading...')

  let config = await import(configPath)
  if (config && config.default) config = config.default

  const [port, destroy] = await create({ ...config, ...options })
  spinner.succeed(`Server is listening on port ${chalk.green(port.toString())}.`)

  return destroy
}
