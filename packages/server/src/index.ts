import http from 'http';
import cors from 'cors';
import Debug from 'debug';
import express, { RequestHandler, ErrorRequestHandler } from 'express';
import { Socket } from 'net';
import { BodyWrapper, createRouter, RouteMethod, Routes, RouteValue } from './router';
import { delayMiddleware, fallbackMiddleware, logMiddleware, preferredMiddleware } from './middlewares';

const debug = Debug('mokia:server');

export type BaseConfig = {
  host?: string;
  port?: string | number;
  prefix?: string;
  silent?: boolean;
  delay?: number | [number, number];
  preferredUrl?: string;
  fallbackUrl?: string;
  bodyWrapper?: BodyWrapper;
  prefixMiddleware?: RequestHandler | ErrorRequestHandler;
  suffixMiddleware?: RequestHandler | ErrorRequestHandler;
};

export type RouteConfig = {
  [key: `${Uppercase<RouteMethod>} /${string}`]: RouteValue;
};

export type ServerConfig = BaseConfig | RouteConfig;

export function createServer(config: ServerConfig): Promise<[server: http.Server, destroy: () => Promise<void>]> {
  return new Promise<[http.Server, () => Promise<void>]>((resolve, reject) => {
    const {
      host = 'localhost',
      port = 8080,
      prefix = '',
      silent = false,
      delay,
      preferredUrl,
      fallbackUrl,
      bodyWrapper,
      prefixMiddleware,
      suffixMiddleware,
      ...routes
    }: BaseConfig = config;

    debug('host:', host);
    debug('port:', port);
    debug('prefix:', prefix);
    debug('silent:', silent);
    debug('preferredUrl:', preferredUrl);
    debug('fallbackUrl:', fallbackUrl);
    debug('prefixMiddleware:', prefixMiddleware);
    debug('suffixMiddleware:', suffixMiddleware);

    const app = express()
      .use(cors())
      .use(express.json())
      .use(express.urlencoded({ extended: false }))
      .use(logMiddleware(silent));

    if (delay) app.use(delayMiddleware(delay));

    if (prefixMiddleware) app.use(prefixMiddleware);
    if (preferredUrl) app.use(preferredMiddleware(preferredUrl));

    app.use(prefix, createRouter(routes as Routes, bodyWrapper));

    if (fallbackUrl) app.use(fallbackMiddleware(fallbackUrl));
    if (suffixMiddleware) app.use(suffixMiddleware);

    app.on('error', reject);

    const server = app.listen(Number(port), () => resolve([server, destroy]));
    const connections = new Set<Socket>();

    server.on('connection', (con) => {
      connections.add(con);
      con.on('close', () => connections.delete(con));
    });

    function destroy() {
      return new Promise<void>((_resolve) => {
        if (!server) return _resolve();
        connections.forEach((con) => con.destroy());
        server.close(() => _resolve());
      });
    }
  });
}
