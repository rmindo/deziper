/**
 * Types
 */
import {
  Request,
  Response,
  ExtendedContext
}
from '@app/types/common'


import About from '@pages/about'


/**
 * About
 */
export async function GET(req:Request, res:Response) {
  const meta = {
    title: 'About'
  }
  return (
    <About name="about" meta={meta} title={meta.title}/>
  )
}