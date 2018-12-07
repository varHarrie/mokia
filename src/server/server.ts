import bodyParser from 'body-parser'
import cors from 'cors'
import express from 'express'

import { createRouter, Routes } from './route'

export const PORT = Symbol('PORT')
export const PREFIX = Symbol('PREFIX')

export interface Config extends Routes {
  [PORT]?: number
  [PREFIX]?: string
}

export function start (config: Config) {
  return new Promise((resolve, reject) => {
    const {
      [PORT]: port = '8080',
      [PREFIX]: prefix = '',
      ...routes } = config

    const app = express()
      .use(cors())
      .use(bodyParser.json())
      .use(bodyParser.urlencoded({ extended: false }))
      .use(prefix, createRouter(routes))

    app.on('error', reject)

    const server = app.listen(port, () => resolve(destroy))

    function destroy () {
      if (!server) return
      server.close()
    }
  })
}
