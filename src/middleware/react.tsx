import React from 'react'
import {renderToString as __} from 'react-dom/server'
import {utility as util, exception} from '@vindo/core'

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



var data:any = {}




/**
 * 
 * @param obj 
 * @returns 
 */
function get(obj:any) {
  const data = {...obj.props}

  var meta
  var name = obj.type.name

  /**
   * If function is just default
   * without name use name attribute from props
   */
  if(name && name.match(/default/g)) {
    name = data.name
  }
  /**
   * Use id as name
   */
  if(!name) {
    name = data.id
  }
  /**
   * Use meta data if using an html tag
   */
  if(data['data-meta']) {
    meta = data['data-meta']
  }
  return Object.assign(data, {name, meta})
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
  const exclude = Object.keys(exception.statuses).concat('error')

  ctx.events.on('render', function(obj:any) {
    if(isValid(obj)) {
      data = get(obj)

      if(req.name && data.name) {
        if(req.route.back && req.name !== data.name && !exclude.includes(data.name)) {
          return
        }
      }

      const app = html({...data.meta, content: obj})
      if(data.name) {
        return {
          html: __(
            bundle(app, ctx.env)
          ),
          name: data.name
        }
      }
      return {name: data.name, html: __(app)}
    }
  })

  if(req.is(ctx.env.RSID)) {  
    res.json(data)
    data = {}
    return
  }
  next()
}
