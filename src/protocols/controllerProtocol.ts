import { Response, Request } from 'express'

export interface Controller {
  handle: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>
}
