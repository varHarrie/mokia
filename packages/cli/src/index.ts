import meow from 'meow';
import run from './run';

const cli = meow(
  `
	Usage
    $ mokia <entry-file> [options]

  Options
    --version       Print version
    --help          Print help
    --host, -h      Set host, default to "localhost"
    --port, -p      Set port, default to 8080
    --prefix        Set route prefix
    --proxy         Set Proxy target
    --silent, -s    Hide request logs
    --watch, -w     Watch input files
    --debug         Enable debug mode

  Example
    $ mokia index.js
    $ mokia example/index.ts --port 3000
`,
  {
    flags: {
      host: { type: 'string', alias: 'h' },
      port: { type: 'string', alias: 'p' },
      prefix: { type: 'string' },
      proxy: { type: 'string' },
      silent: { type: 'boolean', alias: 's' },
      watch: { type: 'boolean', alias: 'w' },
      debug: { type: 'boolean' },
    },
  },
);

if (cli.input[0]) {
  run(cli.input[0], cli.flags);
} else {
  cli.showHelp();
}
