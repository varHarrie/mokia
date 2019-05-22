import bodyParser from 'body-parser'
import cors from 'cors'
import Debug from 'debug'
import express, { RequestHandler } from 'express'
import { Socket } from 'net'

import { createRouter, Routes } from './route'
import { priorityHandler, interceptor, InterceptorHandler } from './middlewares'

const debug = Debug('mokia:server')

export const HOST = Symbol('HOST')
export const PORT = Symbol('PORT')
export const PREFIX = Symbol('PREFIX')
export const SILENT = Symbol('SILENT')
export const PRIORITY = Symbol('PRIORITY')
export const INTERCEPTORS = Symbol('INTERCEPTORS')

// Why not Symbol: https://github.com/microsoft/TypeScript/issues/1863
export const PAYLOAD_KEY = 'PAYLOAD_KEY'

export interface ServerConfig extends Routes {
  [HOST]?: string
  [PORT]?: string | number
  [PREFIX]?: string
  [SILENT]?: boolean
  [PRIORITY]?: string
  [INTERCEPTORS]?: {
    request?: InterceptorHandler
    response?: InterceptorHandler
  }
}

export function create (config: ServerConfig) {
  return new Promise<[number, Function]>((resolve, reject) => {
    const {
      [HOST]: host = 'localhost',
      [PORT]: port = 8080,
      [PREFIX]: prefix = '',
      [SILENT]: silent = false,
      [PRIORITY]: priority = '',
      [INTERCEPTORS]: interceptors = {},
      ...routes
    } = config

    debug('host', host)
    debug('port', port)
    debug('prefix', prefix)
    debug('silent', silent)
    debug('routes', routes)
    debug('interceptors', interceptors)

    const app = express()
      .use(cors())
      .use(bodyParser.json())
      .use(bodyParser.urlencoded({ extended: false }))

    if (interceptors.request) app.use(interceptor(interceptors.request, PAYLOAD_KEY))
    if (priority) app.use(priorityHandler(priority))

    app.use(prefix, createRouter(routes, PAYLOAD_KEY, silent))

    if (interceptors.response) app.use(interceptor(interceptors.response, PAYLOAD_KEY))

    app.use((req, res) => res.json(res.locals[PAYLOAD_KEY]))
    app.on('error', reject)

    const intPort = typeof port === 'string' ? parseInt(port, 10) : port
    const server = app.listen(intPort, host, () => resolve([intPort, destroy]))
    const connections = new Set<Socket>()

    server.on('connection', (conn) => {
      connections.add(conn)
      conn.on('close', () => connections.delete(conn))
    })

    function destroy () {
      return new Promise((res, rej) => {
        if (!server) return res()
        connections.forEach((conn) => conn.destroy())
        server.close(() => res())
      })
    }
  })
}
