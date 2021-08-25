import ora from 'ora';
import chalk from 'chalk';
import http from 'http';
import { AddressInfo } from 'net';
import { register } from 'ts-node';
import { addHook } from 'pirates';
import { createServer, ServerConfig } from '@mokia/server';
import { generate } from '@mokia/producer';

register({
  compilerOptions: {
    target: 'es2017',
    module: 'commonjs',
    lib: ['dom', 'es2016', 'es2017'],
    strictPropertyInitialization: false,
    noUnusedLocals: false,
    noImplicitAny: false,
    moduleResolution: 'node',
    allowSyntheticDefaultImports: true,
    esModuleInterop: true,
    experimentalDecorators: true,
    emitDecoratorMetadata: true,
  },
});

const catchError = (error: Error) => {
  spinner.fail(chalk.red('Error occurred:'));
  console.log(error);
  process.send?.({ error: true });
};

process.on('uncaughtException', catchError);
process.on('unhandledRejection', catchError);

process.on('disconnect', () => {
  if (destroy) destroy();
  process.exit(0);
});

type CliOptions = ServerConfig & {
  watch?: boolean;
};

const [entry, args] = process.argv.slice(2, 4);
const options = JSON.parse(args) as CliOptions;
const spinner = ora();

let app: http.Server;
let destroy: () => Promise<void>;

if (options.watch) watch();
start();

function watch() {
  addHook(
    (code, fileName) => {
      process.send?.({ fileName });
      return code;
    },
    { exts: ['.js', '.ts', '.json'] },
  );
}

async function start(): Promise<(() => Promise<void>) | undefined> {
  spinner.start('Loading...');

  const configModule = await import(entry);
  const config = configModule?.default ?? configModule;

  if (options.host) config.host = options.host;
  if (options.port) config.port = options.port;
  if (options.prefix) config.prefix = options.prefix;
  if (options.silent) config.silent = options.silent;
  if (options.proxy) config.proxy = options.proxy;

  config.bodyWrapper = config.bodyWrapper ?? generate;

  [app, destroy] = await createServer(config);
  const { port } = app.address() as AddressInfo;
  spinner.succeed(`Server is listening on port ${chalk.green(port.toString())}`);
  return destroy;
}
