import express from 'express'

export type Request = express.Request

export type Response = express.Response

export type RouteHandler = (request: Request, response: Response) => Object | Promise<Object> | void

export interface Routes {
  [key: string]: RouteHandler
}

export function createRouter (routes: Routes) {
  const router = express.Router()

  for (const key in routes) {
    if (routes.hasOwnProperty(key)) {
      const [method, url] = parseRoute(key)
      const handler = createRequestHandler(routes[key])

      if (method && url) {
        router[method](url, handler)
      }
    }
  }

  return router
}

type Method = 'get' | 'post' | 'put' | 'patch' | 'delete'

const methods: {[key: string]: Method} = {
  get: 'get',
  post: 'post',
  put: 'put',
  patch: 'patch',
  delete: 'delete'
}

function parseRoute (key: string): [Method, string] {
  const [method, url] = key.split(' ')
  return [methods[method.toLowerCase()], url]
}

function createRequestHandler (route: RouteHandler): express.RequestHandler {
  return (request, response) => {
    const data = route(request, response)
    if (data) response.json(data)
  }
}
