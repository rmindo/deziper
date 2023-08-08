import React from 'react'
import {decode} from '@src/controllers/auth'

import {
  Menu,
  HTTPOption,
  HTTPResponse,
  DynamicObject,
  DateTimeInterface,
}
from '@src/interface/common'


/**
 * Custom react hooks
 */
export const hooks = {
  useState(initialState: any = {}) {
    var [state, set] = React.useState(initialState)
    var mergedState = state

    return {
      ...mergedState,
      set(newState: object | Function) {
        if(typeof newState == 'function') {
          newState = newState(state)
        }
        mergedState = {
          ...mergedState,
          ...newState
        }
        set(mergedState)
        return mergedState
      },
      get(name: any = null) {
        if(name) {
          if(state[name]) {
            return state[name]
          }
        }
        else {
          return state
        }
      }
    }
  }
}


/**
 * Custom fetch
 */
export const http: any = {
  get() {},
  put() {},
  post() {},
  delete() {},
}
{
  for(let method of Object.keys(http)) {
    http[method] = (path: string, opt?: {data?: object, query?: object}): Promise<HTTPResponse> => {
      var query = ''
      var option: HTTPOption = {
        method: method.toLocaleUpperCase()
      }
      if(opt) {
        if(opt.query) {
          query = `?${setQuery(opt.query)}`
        }
        if(opt.data) {
          option.body = JSON.stringify(opt?.data)
        }
      }

      return fetch(`/api/${path}${query}`, option).then(data => data.json())
    }
  }
}


/**
 * Object utilities
 */
export const object = {
  /**
   * Check if key exist in an object
   * 
   * @param {array} array - List of required keys
   * @param {object} object - The object to check (haystack)
   * @returns {boolean}
   */
  has(array: string[], object: any) {
    var list = Object.keys(object)
    if(array.filter((v) => list.includes(v) && object[v]).length == array.length) {
      return true
    }
  },

  /**
   * Filter out unwanted data from an object
   * 
   * @param {object} object - The object you want to filter
   * @param {array} exclude - The list of key you want to filter out
   * @param {object} data - The object you want to merge or replace the value of current object
   */
  filter(object: any, exclude: string[] = [], data: any = {}) {
    for(var name in object) {
      if(!exclude.includes(name)) {
        data[name] = object[name]
      }
    }
    return data
  }
}


/**
 * Text to pathname
 * @param str
 * @returns {string}
 */
export function toPath(str: string) {
  return str.replace(/\s/g, '-').replace(/(?!-|\/)([\W])/g, '').toLowerCase()
}

/**
 * Page and post path
 * @param path The path as array
 * @returns {string}
 */
export function createPath(path: string[]) {
  return toPath([''].concat(path.filter(v => v)).join('/'))
}

/**
 * Get status from code
 * @param code Status code
 * @returns {string}
 */
export function getStatus(code: number) {
  if(code.toString().match(/^2/g)) {
    return 'success'
  }
  return 'error'
}

/**
 * Get cookie
 * @returns {object}
 */
export function getCookie(name: string, cookies: any) {
  var data = {}
  var cookie = cookies.get(name)
  if(cookie) {
    data = JSON.parse(decode(cookie.value as never))
  }
  return data
}

/**
 * Get query parameters
 * @param data 
 */
export function getQuery(data: string) {
  var p: any = {}

  if(data.match(/\?.*/g)) {
    data = data.split('?')[1]
  }

  var d = data.split('&')
  for(let i of d) {
    var c = i.split('=')
    p[c[0]] = decodeURIComponent(c[1])
  }
  return p
}


/**
 * Create query parameters
 * @param {object} data Object data
 * @param {array} exclude exclude specific items
 */
export function setQuery(data: {[key: string]: any}, exclude = []) {
  const p = []
  for(let i in data) {
    if(exclude.includes(i as never)) {
      if(typeof data[i] == 'object') {
        data[i] = encodeURIComponent(JSON.stringify(data[i]))
      }
      p.push(i + '=' + data[i])
    }
    else {
      p.push(encodeURIComponent(i) + '=' + encodeURIComponent(data[i]))
    }
  }
  return p.join('&')
}


/**
 * Limit the words
 * @param words 
 * @param limit 
 * @returns {string}
 */
export function sliceWords(words: string, limit = 20) {
  if(words) {
    return words.split(/\s/g).slice(0, limit).join(' ')
  }
  return words
}

/**
 * Format date
 * @param ts 
 */
export function datetime(ts: number): DateTimeInterface {
  var today: Date = new Date()
  var date: Date = new Date(ts)
 

  return {
    date,
    today, 
    /**
     * Get day of the week
     * @example Sat
     */
    getDay() {
      return date.toDateString().substring(0,3)
    },

    /**
     * Get date
     * @example Jul 2 2023
     */
    getDate() {
      return date.toDateString().substring(4)
    },

    /**
     * Get time without senconds
     * @example 04:20 AM
     */
    getTime() {
      return date.toLocaleTimeString().replace(/:(\d+)\s/g, ' ')
    },
    
    /**
     * Get formatted full date and time
     * @example Sat, Jul 2 2023 at 5:41 PM
     */
    getDateTime() {
      return this.getFullDateTime().slice(5)
    },
    
    /**
     * Get formatted full date
     * @example Sat, Jul 2 2023
     */
    getFullDate() {
      return date.toDateString().replace(/^(\w+)\s(\w+)(\s0){1}/g, '$1, $2 ')
    },
    
    /**
     * Get formatted full date and time
     * @example Sat, Jul 2 2023 at 5:41 PM
     */
    getFullDateTime(div = 'at') {
      return `${this.getFullDate()} ${div} ${this.getTime()}`
    },
  }
}