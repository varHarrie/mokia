import meow from 'meow';
import run from './run';

const cli = meow(
  `
	Usage
    $ mokia-cli <entry-file> [options]

  Options
    --host, -h      Set host, default to "localhost"
    --port, -p      Set port, default to 8080
    --prefix        Set route prefix
    --preferredUrl  Set preferred url
    --fallbackUrl   Set fallback url
    --silent, -s    Hide request logs
    --watch, -w     Watch input files
    --debug         Enable debug mode

  Example
    $ mokia-cli index.ts
    $ mokia-cli ./my-project --port 3000
`,
  {
    flags: {
      host: { type: 'string', alias: 'h' },
      port: { type: 'string', alias: 'p' },
      prefix: { type: 'string' },
      preferredUrl: { type: 'string' },
      fallbackUrl: { type: 'string' },
      silent: { type: 'boolean', alias: 's' },
      watch: { type: 'boolean', alias: 'w' },
      debug: { type: 'boolean' },
    },
  },
);

run(cli.input[0], cli.flags);
