import http from 'http';
import cors from 'cors';
import Debug from 'debug';
import express, { RequestHandler, ErrorRequestHandler } from 'express';
import { Socket } from 'net';
import { BodyWrapper, createRouter, RouteMethod, Routes, RouteValue } from './router';
import { delayMiddleware, logMiddleware } from './middlewares';
import { createProxyHandles, ProxyOptions, ProxyHandler } from './proxy';

const debug = Debug('mokia:server');

export type Middlewares = {
  prefix?: Array<RequestHandler | ErrorRequestHandler>;
  suffix?: Array<RequestHandler | ErrorRequestHandler>;
};

export type BaseConfig = {
  host?: string;
  port?: string | number;
  prefix?: string;
  silent?: boolean;
  delay?: number | [number, number];
  bodyWrapper?: BodyWrapper;
  middlewares?: Middlewares;
  proxy?: ProxyOptions;
};

export type RouteConfig = {
  [key: `${Uppercase<RouteMethod>} /${string}`]: RouteValue;
};

export type ServerConfig = BaseConfig & RouteConfig;

export function createServer(config: ServerConfig): Promise<[server: http.Server, destroy: () => Promise<void>]> {
  return new Promise<[http.Server, () => Promise<void>]>((resolve, reject) => {
    const { host = 'localhost', port = 8080, prefix = '', silent = false, delay, bodyWrapper, middlewares = {}, proxy, ...routes }: BaseConfig = config;

    debug('host:', host);
    debug('port:', port);
    debug('prefix:', prefix);
    debug('silent:', silent);
    debug('middlewares:', middlewares);
    debug('proxy:', proxy);

    const app = express();

    if (delay) app.use(delayMiddleware(delay));

    app.use(cors());
    app.use(logMiddleware(silent));
    app.use(express.json());
    app.use(express.urlencoded({ extended: false }));

    middlewares.prefix?.forEach((m) => app.use(m));
    app.use(prefix, createRouter(routes as Routes, bodyWrapper));
    middlewares.suffix?.forEach((m) => app.use(m));

    let proxyHandlers: ProxyHandler[] = [];

    if (proxy) {
      proxyHandlers = createProxyHandles(proxy);
      proxyHandlers.forEach((handler) => app.use(handler));
    }

    app.on('error', reject);

    const server = app.listen(Number(port), () => resolve([server, destroy]));
    const connections = new Set<Socket>();

    server.on('connection', (con) => {
      connections.add(con);
      con.on('close', () => connections.delete(con));
    });

    proxyHandlers.forEach((handler) => {
      if (handler.ws && handler.upgrade) server.on('upgrade', handler.upgrade);
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
