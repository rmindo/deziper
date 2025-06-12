/**
 * Types
 */
import {
  ExtendedContext
}
from '@app/types/common'


import Contact from '@pages/contact'


/**
 * Contact page
 */
export default function(ctx: ExtendedContext) {
  const meta = {
    title: 'Contact',
  }
  return {
    GET() {
      return (
        <Contact name="contact" meta={meta} title={meta.title}/>
      )
    }
  }
}