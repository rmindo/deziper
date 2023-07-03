import {cookies} from 'next/headers'
import {decode} from '@src/controllers/auth'

/**
 * Get cookie
 * @returns {object}
 */
export function getCookie(name: string) {
  var data = {}
  var cookie = cookies().get(name)
  if(cookie) {
    data = JSON.parse(decode(cookie.value as never))
  }
  return data
}