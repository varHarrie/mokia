import bodyParser from 'body-parser'
import cors from 'cors'
import Debug from 'debug'
import express from 'express'

import { createRouter, Routes } from './route'

const debug = Debug('mokia:server')

export const HOST = Symbol('HOST')
export const PORT = Symbol('PORT')
export const PREFIX = Symbol('PREFIX')

export interface ServerConfig extends Routes {
  [HOST]?: string
  [PORT]?: string | number
  [PREFIX]?: string
}

export function create (config: ServerConfig) {
  return new Promise<[number, Function]>((resolve, reject) => {
    const {
      [HOST]: host = 'localhost',
      [PORT]: port = 8080,
      [PREFIX]: prefix = '',
      ...routes
    } = config

    debug('host', host)
    debug('port', port)
    debug('prefix', prefix)
    debug('routes', routes)

    const app = express()
      .use(cors())
      .use(bodyParser.json())
      .use(bodyParser.urlencoded({ extended: false }))
      .use(prefix, createRouter(routes))

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
