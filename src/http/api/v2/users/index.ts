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
 * Export default
 */
export default async (ctx:ExtendedContext) => {
  
  return {
    GET: async (req:Request, res:Response) => {
      res.result({users: []})
    }
  }
}