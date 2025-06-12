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
  //@ts-ignore
  console.log(req.name)
  return (
    <About name="about" meta={meta} title={meta.title}/>
  )
}