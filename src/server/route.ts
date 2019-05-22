import express from 'express'

import { colors, log } from '../utils'

export type Request = express.Request

export type Response = express.Response

export type RouteHandler = (request: Request, response: Response) => Object | Promise<Object> | void

export interface Routes {
  [key: string]: RouteHandler | Object
}

export function createRouter (routes: Routes, payloadKey: string, silent: boolean) {
  const router = express.Router()

  if (!silent) {
    router.use(logHandler)
  }

  for (const key in routes) {
    if (routes.hasOwnProperty(key)) {
      const [method, url] = parseRoute(key)
      const route = ensureRoute(routes[key])
      const handler = createRequestHandler(route, payloadKey)

      if (isValidMethod(method) && url) {
        router[method](url, handler)
      }
    }
  }

  return router
}

type Method = 'get' | 'post' | 'put' | 'patch' | 'delete' | 'options'

const methods = ['get', 'post', 'put', 'patch', 'delete', 'options']

function parseRoute (key: string): [string, string] {
  const [method, url] = key.split(' ')
  return [method.toLowerCase(), url]
}

function ensureRoute (route: RouteHandler | Object): RouteHandler {
  return typeof route === 'object' ? () => route : route
}

function isValidMethod (method: string): method is Method {
  return methods.includes(method)
}

function createRequestHandler (route: RouteHandler, payloadKey: string): express.RequestHandler {
  return (request, response, next) => {
    const data = route(request, response)
    if (data) response.locals[payloadKey] = data
    next()
  }
}

function logHandler (req: Request, res: Response, next: () => void) {
  const method = req.method
  const url = req.url

  log('- ', colors[method](method), url)
  next()
}
