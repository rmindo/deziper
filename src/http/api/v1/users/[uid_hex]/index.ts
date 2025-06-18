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
 * Services
 */
export function test(req:Request, res:Response) {
  res.json({test: true})
}


/**
 * Export default
 */
export default async (ctx:ExtendedContext) => {
  
  return {
    GET: async (req:Request, res:Response) => {
      res.result({read: true})
    },
    
    PUT: async (req:Request, res:Response) => {
      res.result({updated: true})
    },
    
    POST: async (req:Request, res:Response) => {
      res.result({created: true})
    },

    DELETE: async (req:Request, res:Response) => {
      res.result({deleted: true})
    }
  }
}