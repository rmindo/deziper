/**
 * Types
 */
import {
  Request,
  Response,
  ExtendedContext
}
from '@app/types/common'


import Home from '@pages/home'
import Services from '@pages/services'


/**
 * Home page
 */
export default async function(ctx: ExtendedContext) {
  const meta = {
    title: 'Home'
  }
  
  return (
    <Home meta={meta}/>
  )
}


/**
 * Services
 */
export function services(req:Request, res:Response) {
  const meta = {
    title: 'Services'
  }
  return (
    <Services meta={meta} title={meta.title}/>
  )
}