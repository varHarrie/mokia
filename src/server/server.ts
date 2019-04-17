import bodyParser from 'body-parser'
import cors from 'cors'
import Debug from 'debug'
import express from 'express'

import { createRouter, Routes } from './route'
import { priorityHandler } from './middlewares'

const debug = Debug('mokia:server')

export const HOST = Symbol('HOST')
export const PORT = Symbol('PORT')
export const PREFIX = Symbol('PREFIX')
export const SILENT = Symbol('SILENT')
export const PRIORITY = Symbol('PRIORITY')

export interface ServerConfig extends Routes {
  [HOST]?: string
  [PORT]?: string | number
  [PREFIX]?: string
  [SILENT]?: boolean
  [PRIORITY]?: string
}

export function create (config: ServerConfig) {
  return new Promise<[number, Function]>((resolve, reject) => {
    const {
      [HOST]: host = 'localhost',
      [PORT]: port = 8080,
      [PREFIX]: prefix = '',
      [SILENT]: silent = false,
      [PRIORITY]: priority = '',
      ...routes
    } = config

    debug('host', host)
    debug('port', port)
    debug('prefix', prefix)
    debug('silent', silent)
    debug('routes', routes)

    const app = express()
      .use(cors())
      .use(bodyParser.json())
      .use(bodyParser.urlencoded({ extended: false }))

    if (priority) app.use(priorityHandler(priority))

    app.use(prefix, createRouter(routes, silent))
    app.on('error', reject)

    const intPort = typeof port === 'string' ? parseInt(port, 10) : port
    const server = app.listen(intPort, host, () => resolve([intPort, destroy]))

    function destroy () {
      return new Promise((res, rej) => {
        if (!server) return res()
        server.close(() => res())
      })
    }
  })
}
