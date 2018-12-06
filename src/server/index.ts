import { Request } from './request'
import { Response } from './response'

export type RequestHandler = (request: Request, response: Response) => Object | Promise<Object> | void

export interface Routes {
  [key: string]: RequestHandler
}
