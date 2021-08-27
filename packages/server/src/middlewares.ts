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
