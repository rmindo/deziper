import React from 'react'
import {renderToString as __} from 'react-dom/server'
import {utility as util, Context} from '@vindo/core'


/**
 * Types
 */
import {
  Request,
  Response,
  ExtendedContext,
}
from '@app/types/common'


import html from '../react'


/**
 * Shorthand
 */
const set = util.url.setQuery
const tag = React.createElement
const clone = React.cloneElement
const isValid = React.isValidElement



var map:any = {}




/**
 * 
 * @param data 
 * @returns 
 */
function get(data:any) {
  const props = data.props
  if(props) {
    var name = data.type.name

    if(!name) {
      name = props.id
    }
    if(name && name.match(/default/g)) {
      name = props.name
    }
    return Object.assign({}, props, {name})
  }
}


/**
 * 
 * @param child
 * @param env 
 * @returns 
 */
function script(child:any, env:any) {
  const query:any = {
    id: env.RSID
  }

  if(env.NODE_ENV == 'development') {
    query.port = env.DEV_SERVER_PORT
  }

  return clone(child, {
    children: child.props.children.concat(
      tag('script', {
        key: 0,
        id: 'bundle',
        type: 'module',
        src: `/bundle.js`.concat('?', set(query))
      })
    )
  })
}


/**
 * Add bundle to the head
 */
function bundle(html:any, env:any) {

  return React.Children.map(html, ({props}:any) => {
    const children = props.children

    if(children.length == 0) {
      return
    }
    return React.Children.map(children, (child:any) => {
      /**
       * Add script to head
       */
      if(child.type == 'head') {
        return script(child, env)
      }  
      return child
    })
  })
}


/**
 * Middleware
 */
export default function(req: Request, res: Response, next: Function, ctx:ExtendedContext) {

  ctx.events.on('render', function(data:any) {
    if(isValid(data)) {
      map = get(data)

      const app = html({...map.meta, content: data})
      if(map.name) {
        return {
          html: __(
            bundle(app, ctx.env)
          ),
          name: map.name
        }
      }
      return {name: map.name, html: __(app)}
    }
  })

  if(req.is(ctx.env.RSID)) {
    res.json(map)
    map = {}
    return
  }
  next()
}
