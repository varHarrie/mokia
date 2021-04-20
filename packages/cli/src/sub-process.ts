import ora from 'ora';
import chalk from 'chalk';
import http from 'http';
import { AddressInfo } from 'net';
import { addHook } from 'pirates';
import { createServer, ServerConfig } from '@mokia/server';
import { generate } from '@mokia/producer';

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

process.on('uncaughtException', (error) => {
  spinner.fail(chalk.red('Error occurred:'));
  console.log(' ', error);
  process.send?.({ error: true });
});

process.on('disconnect', () => {
  if (destroy) destroy();
  process.exit(0);
});

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

  let config: ServerConfig;

  try {
    const configModule = await import(entry);
    config = configModule?.default ?? configModule;
  } catch (error) {
    spinner.fail(`Failed to load: ${entry}: ${error.message}`);
    return undefined;
  }

  if (options.host) config.host = options.host;
  if (options.port) config.port = options.port;
  if (options.prefix) config.prefix = options.prefix;
  if (options.preferredUrl) config.preferredUrl = options.preferredUrl;
  if (options.fallbackUrl) config.fallbackUrl = options.fallbackUrl;
  if (options.silent) config.silent = options.silent;

  config.bodyWrapper = options.bodyWrapper || generate;

  try {
    [app, destroy] = await createServer(config);
    const { port } = app.address() as AddressInfo;
    spinner.succeed(`Server is listening on port ${chalk.green(port.toString())}`);
    return destroy;
  } catch (error) {
    spinner.fail(`Failed to create server: ${error.message}`);
  }

  return undefined;
}
