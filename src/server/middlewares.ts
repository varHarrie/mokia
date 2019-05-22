import http from 'http'
import { Request, Response } from 'express'

import { colors, log, concatUrls } from '../utils'

export function priorityHandler (url: string) {
  return (req: Request, res: Response, next: () => void) => {
    const method = req.method
    const redirectUrl = concatUrls(url, req.url)

    const request = http
      .request(redirectUrl, { method: req.method })
      .on('response', (response) => {
        log(`- [${response.statusCode}] `, colors[method](method), redirectUrl)

        if (response.statusCode === 404) {
          next()
        } else {
          response.pipe(res)
        }
      })
      .on('error', () => {
        next()
      })

    request.end()
  }
}

export type InterceptorHandler = (req: Request, res: Response, data: any) => any

export function interceptor (handler: InterceptorHandler, payloadKey: string) {
  return (req: Request, res: Response, next: () => void) => {
    const payload = res.locals[payloadKey]
    res.locals[payloadKey] = handler(req, res, payload)

    next()
  }
}
