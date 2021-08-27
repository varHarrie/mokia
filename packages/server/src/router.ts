import express from 'express';
import Debug from 'debug';

const debug = Debug('mokia:router');

export type RouteHandler<T> = (this: T, request: express.Request, response: express.Response) => unknown;

export type RouteValue<T = unknown> = RouteHandler<T> | Record<string, unknown>;

export type Routes = Record<string, RouteValue>;

export type BodyWrapper = (body: unknown) => unknown;

export const defaultBodyWrapper: BodyWrapper = (body) => body;

export type RouteMethod = 'get' | 'post' | 'put' | 'patch' | 'delete' | 'options';

const methods: Array<RouteMethod> = ['get', 'post', 'put', 'patch', 'delete', 'options'];

function getMethodAndPath(raw: string) {
  const [method, path] = raw.split(' ');
  return [method.toLocaleLowerCase(), path || '/'];
}

function isValidMethod(method: string): method is RouteMethod {
  return (methods as string[]).includes(method);
}

function createRouteHandler<T>(route: RouteValue, bodyWrapper: BodyWrapper, context?: T): express.RequestHandler {
  const fn = typeof route === 'function' ? route : () => route;

  return (request, response, next) =>
    Promise.resolve(fn.call(context, request, response))
      .then((body) => response.json(bodyWrapper(body)))
      .catch(next);
}

export function createRouter<T>(routes: Routes, bodyWrapper: BodyWrapper = defaultBodyWrapper, context?: T): express.Router {
  const router = express.Router();

  Object.keys(routes).forEach((key) => {
    const [method, path] = getMethodAndPath(key);
    const handler = createRouteHandler(routes[key], bodyWrapper, context);

    if (isValidMethod(method)) {
      router[method](path, handler);
    } else {
      debug('Invalid route:', key);
    }
  });

  return router;
}
