/**
 * Types
 */
import {
  Request,
  Response,
  ExtendedContext
}
from '@app/types/common'


export function params(req:Request, res:Response, ctx:ExtendedContext) {
  res.json({
    params: req.params
  })
}


/**
 * Home page
 */
export default function(ctx: ExtendedContext) {
  return {
    /**
     * Home
     */
    async GET(req:Request, res:Response, ctx:ExtendedContext) {
      res.json({route: ctx.request.route})
    }
  }
}