import {Prisma} from '@prisma/client'
import {NextResponse} from 'next/server'

/**
 * Status Codes
 */
const status: {[key: number]: string} = {
  200: 'Ok',
  201: 'Created',
  204: 'No Content',
  400: 'Bad Request',
  401: 'Unauthorized',
  403: 'Forbidden',
  404: 'Not Found',
  405: 'Method Not Allowed',
  406: 'Not Acceptable',
  409: 'Conflict',
  500: 'Internal Server Error',
}


export function Response(code: number = 400, option?: {data?: object, message?: string}, headers = {}) {
  return new NextResponse(
    JSON.stringify({
      code,
      status: status[code],
      ...option
    }),
    {
      status: code,
      headers: {
        'Content-Type': 'application/json',
        ...headers
      },
  })
}

export function PrismaErrorResponse(e: any, data: any) {
  if(e instanceof Prisma.PrismaClientKnownRequestError) {
    const error = data[e.code]
    if(error) {
      return Response(error.status, {message: error.message})
    }
  }
}