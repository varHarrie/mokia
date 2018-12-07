import chalk from 'chalk'
import Debug from 'debug'
import meow from 'meow'
import ora from 'ora'
import path from 'path'

import { start } from '..'

const debug = Debug('mokia:cli')
const cwd = process.cwd()

export default async function run (cli: meow.Result) {
  const { input, flags } = cli
  const configPath = path.join(cwd, input[0] || 'index.ts')

  debug('configPath', configPath)

  const spinner = ora().start('Loading...')

  try {
    let config = await import(configPath)
    if (config && config.default) config = config.default

    const [port] = await start({ ...config, ...flags })

    spinner.succeed(`Server is listening on port ${chalk.green(port.toString())}.`)
  } catch (error) {
    spinner.fail(error.message)
    process.exit(1)
  }

  if (flags.version) cli.showVersion()
  if (flags.help) cli.showHelp()
}
