import path from 'path';
import childProcess from 'child_process';
import Debug from 'debug';
import kill from 'tree-kill';
import chokidar from 'chokidar';
import { register } from 'ts-node';
import { ServerConfig } from '@mokia/server';

const log = Debug('mokia:cli');

register({
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
    emitDecoratorMetadata: true,
  },
});

type CliOptions = ServerConfig & {
  watch?: boolean;
  debug?: boolean;
};

type MessageData = { fileName?: string; error?: boolean };

export default async function run(entry: string | undefined, options: CliOptions) {
  entry = path.join(process.cwd(), entry || 'index.js');

  const { debug, ...config } = options;
  if (debug) Debug.enable('mokia:*');

  log('debug', debug);
  log('config', config);

  let watcher: chokidar.FSWatcher | undefined;
  let sub: childProcess.ChildProcess | undefined;
  let subStopping = false;
  let subRestarting = false;

  process.on('SIGTERM', () => {
    log('Process got SIGTERM');
    stop(true);
    process.exit(0);
  });

  function start() {
    subRestarting = false;

    log('Starting sub process');
    const modulePath = path.join(__dirname, 'sub-process.js');
    const args = [entry!, JSON.stringify(config)];

    if (config.watch) {
      watcher = chokidar.watch([]);

      watcher.on('change', restart);
      watcher.on('unlink', restart);
    }

    sub = childProcess.fork(modulePath, args);

    sub.on('message', (data: MessageData) => {
      if (data.fileName) {
        watcher?.add(data.fileName);
      } else if (data.error) {
        if (config.watch) {
          console.log('  Waiting for changes to restart...');
        } else {
          process.exit(0);
        }
      }
    });

    sub.on('exit', (code) => {
      log('Sub process exited');
      if (!sub) return;
      if (!subRestarting) process.exit(code || 0);
      sub = undefined;
      subStopping = false;
    });
  }

  function stop(force?: boolean) {
    if (!sub || subStopping) return;
    log(`Stopping sub process...`, { force });
    subStopping = true;
    watcher?.close();
    watcher = undefined;

    if (force) {
      kill(sub.pid, 'SIGTERM');
    } else {
      sub.disconnect();
    }
  }

  function restart() {
    log(`Restarting sub process`);
    subRestarting = true;

    if (sub) {
      sub.on('exit', start);
      stop();
    } else {
      start();
    }
  }

  start();
}
