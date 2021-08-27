import { Options, RequestHandler, createProxyMiddleware, fixRequestBody } from 'http-proxy-middleware';
import Debug from 'debug';
import { Request } from 'express';

const debug = Debug('mokia:proxy');

const defaultOptions: Options = {
  logLevel: 'silent',
  secure: false,
  changeOrigin: true,
  ws: true,
  xfwd: true,
};

type ProxyRecord = Record<string, Options | string>;

type ProxyEntry = Options & { context: string };

export type ProxyOptions = string | ProxyRecord | ProxyEntry[];

export type ProxyHandler = RequestHandler & { ws?: boolean };

function createProxyEntry(context: string, options: Options | string): ProxyEntry {
  if (typeof options === 'string') options = { target: options };
  const { target = '127.0.0.1', onProxyReq, onError } = options;

  return {
    ...defaultOptions,
    ...options,
    context: context.replace(/^\*$/, '**').replace(/\/\*$/, ''),
    onProxyReq(proxyReq, req: Request, res, opt) {
      // @see https://github.com/chimurai/http-proxy-middleware/issues/40
      fixRequestBody(proxyReq, req);

      onProxyReq?.(proxyReq, req, res, opt);

      if (!('agent' in proxyReq) && proxyReq.getHeader('origin')) {
        proxyReq.setHeader('origin', target as string);
      }
    },
    onError(err, req, res) {
      onError?.(err, req, res);

      if (!res.headersSent) {
        res.writeHead(500);
      }

      const host = req.headers?.host;
      const error = `Proxy error: Could not proxy request ${req.url} from ${host} to ${target}`;

      console.warn(error);
      res.end(error);
    },
  };
}

export function createProxyHandles(targetOrOptions: ProxyOptions): ProxyHandler[] {
  let entries: ProxyEntry[];

  if (Array.isArray(targetOrOptions)) {
    entries = targetOrOptions;
  } else if (typeof targetOrOptions === 'string') {
    entries = [createProxyEntry('**', { target: targetOrOptions })];
  } else {
    entries = Object.entries(targetOrOptions).map(([context, options]) => createProxyEntry(context, options));
  }

  debug('Proxy entries:', entries);

  return entries.map((entry) => {
    const handler: ProxyHandler = createProxyMiddleware(entry.context, entry);
    handler.ws = entry.ws;
    return handler;
  });
}
