import {
  notFound as notFound404
}
from 'next/navigation'


const categories = [
  'code',
  'network',
  'security',
  'technology',
]

export const isPage = function(page: string) {
  if(categories.includes(page)) {
    return true
  }
  notFound404()
}

export const notFound = notFound404
