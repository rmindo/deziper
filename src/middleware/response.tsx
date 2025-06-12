/**
 * Types
 */
import {
  Request,
  Response,
}
from '@app/types/common'



/**
 * Status Code
 */
const status: {[key:string]:string} = {
  '200': 'Ok',
  '201': 'Created',
  '204': 'No Content',
  '400': 'Bad Request',
  '401': 'Unauthorized',
  '403': 'Forbidden',
  '404': 'Not Found',
  '405': 'Method Not Allowed',
  '406': 'Not Acceptable',
  '409': 'Conflict',
  '500': 'Internal Server Error',
}

/**
 * Middleware
 */
export default async function(req: Request, res: Response, next: Function) {

  /**
   * Custom json response
   */
  res.result = (data:any = {}, code:number = 200) => {
    var obj = {
      status: code,
      result: undefined,
      message: status[code],
    }

    if(data && Object.keys(data).length > 0) {
      obj.result = data
    }
    return res.json(obj, code)
  }
  next()
}