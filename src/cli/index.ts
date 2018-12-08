import 'ts-node/register'

import meow from 'meow'

import run from './run'

const cli = meow(`
  Usage
    $ mokia <entry-file> [options]

  Options
    --host       -H     Set host, default to "localhost".
    --port       -P     Set port, default to 8080.
    --prefix            Set route prefix.

  Example
    $ mokia index.ts
    $ mokia ./my-project --port 8080
`, {
  flags: {
    host: {
      type: 'string',
      alias: 'H'
    },
    port: {
      type: 'string',
      alias: 'P'
    },
    prefix: {
      type: 'string'
    }
  }
})

run(cli)
