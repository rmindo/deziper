/**
 * Types
 */
import {
  Request,
  Response,
  ExtendedContext
}
from '@app/types/common'





export async function GET(req:Request, res:Response, ctx:ExtendedContext) {
  res.result({code: 423245})
}


export async function check(req:Request, res:Response, ctx:ExtendedContext) {
  return {
    GET() {
      res.result({checked: true})
    },
    DELETE() {
    }
  }
}


export default function(ctx:ExtendedContext) {
  return {
    POST(req:Request, res:Response) {

    },

    sign(req:Request, res:Response) {
      return {
        GET() {
          res.result({signed: true})
        }
      }
    },


    verify(req:Request, res:Response) {
      res.result({verified: true})
    }
  }
}