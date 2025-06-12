/**
 * Types
 */
import {
  Request,
  Response,
  ExtendedContext
}
from '@app/types/common'




/**
 * Home page
 */
export default function(ctx: ExtendedContext) {
  return {
    /**
     * Home
     */
    async GET(req:Request, res:Response, ctx:ExtendedContext) {
      res.json({version: '2.0'})
    }
  }
}