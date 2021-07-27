import http from 'http';
import https from 'https';
import path from 'path';
import chalk from 'chalk';
import express from 'express';

type ChalkColor = typeof chalk['Color'];

const methodToColor: Record<string, ChalkColor> = {
  GET: 'green',
  POST: 'blue',
  PUT: 'yellow',
  PATCH: 'magenta',
  DELETE: 'red',
  OPTIONS: 'gray',
};

function logRequest(method: string, url: string, redirectUrl?: string) {
  const coloredMethod = chalk[methodToColor[method]](method);

  if (redirectUrl) {
    console.log('-', coloredMethod, url, '=>', redirectUrl);
  } else {
    console.log('-', coloredMethod, url);
  }
}

export function logMiddleware(silent: boolean): express.RequestHandler {
  return (request, _response, next) => {
    if (!silent) logRequest(request.method, request.url);
    next();
  };
}

function random(a: number, b: number): number {
  const min = Math.min(a, b);
  const max = Math.max(a, b);
  return Math.floor(Math.random() * (max - min)) + min;
}

export function delayMiddleware(ms: number | [number, number]): express.RequestHandler {
  return (_request, _response, next) => {
    const timeout = Array.isArray(ms) ? random(ms[0], ms[1]) : ms;
    setTimeout(next, timeout);
  };
}

function redirectTo(method: string, redirectUrl: string, callback: (error: Error | undefined, response?: http.IncomingMessage) => void) {
  const client = redirectUrl.startsWith('https') ? https : http;

  client
    .request(redirectUrl, { method })
    .on('response', (res) => callback(undefined, res))
    .on('error', (err) => callback(err))
    .end();
}

export function preferredMiddleware(url: string): express.RequestHandler {
  return (request, response, next) => {
    const redirectUrl = path.join(url, request.url);

    logRequest(request.method, request.url, redirectUrl);
    redirectTo(request.method, redirectUrl, (err, res) => {
      if (err || !res) return next(err || new Error());
      if (res.statusCode === 404) return next();
      res.pipe(response);
      response.statusCode = res.statusCode ?? 200;
    });
  };
}

export function fallbackMiddleware(url: string): express.RequestHandler {
  return (request, response, next) => {
    const redirectUrl = path.join(url, request.url);

    logRequest(request.method, request.url, redirectUrl);
    redirectTo(request.method, redirectUrl, (err, res) => {
      if (err || !res) return next(err || new Error());
      res.pipe(response);
      response.statusCode = res.statusCode ?? 200;
    });
  };
}
