import http from 'http';
import cors from 'cors';
import Debug from 'debug';
import express, { Request, Response, RequestHandler, ErrorRequestHandler } from 'express';
import { Socket } from 'net';
import { BodyWrapper, createRouter, Routes, RouteValue } from './router';
import { fallbackMiddleware, logMiddleware, preferredMiddleware } from './middlewares';

const debug = Debug('mokia:server');

export type InterceptorHandler = (req: Request, res: Response, data: any) => any;

export type BaseConfig = {
  host?: string;
  port?: string | number;
  prefix?: string;
  silent?: boolean;
  preferredUrl?: string;
  fallbackUrl?: string;
  bodyWrapper?: BodyWrapper;
  prefixMiddleware?: RequestHandler | ErrorRequestHandler;
  suffixMiddleware?: RequestHandler | ErrorRequestHandler;
};

export type RouteConfig = {
  [key in string]: key extends keyof BaseConfig ? BaseConfig[key] : RouteValue;
};

export type ServerConfig = BaseConfig | RouteConfig;

export function createServer(config: ServerConfig) {
  return new Promise<[http.Server, () => Promise<void>]>((resolve, reject) => {
    const {
      host = 'localhost',
      port = 8080,
      prefix = '',
      silent = false,
      preferredUrl,
      fallbackUrl,
      bodyWrapper,
      prefixMiddleware,
      suffixMiddleware,
      ...routes
    } = config as BaseConfig;

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
