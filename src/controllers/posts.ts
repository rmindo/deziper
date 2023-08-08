import {notFound} from 'next/navigation'

import {toPath} from '@src/helpers/common'
import {
  select,
  computed,
  prisma as prismaInstance
}
from '@src/controllers/compute'


import {
  Categories,
  PrismaPosts
}
from '@src/interface/posts'


/**
 * Reuse
 */
export const prisma = prismaInstance

/**
 * Iterate categories with new property name
 * @param categories 
 * @returns {array}
 */
export function iterateCategories(categories: {[key: string]: string}): Categories[] {
  var items = []
  for(var i in categories) {
    items.push({name: categories[i], slug: toPath(categories[i])})
  }
  return items
}


/**
 * Get Post 
 * @param params URL path parameters
 */
export async function getPost(where: any = {}) {

  const post = await computed.posts.findFirst({
    where,
    include: {
      user: {
        select: select.user
      },
    }
  })
  if(post) {
    return {
      ...post,
      author: post.author,
      tags: JSON.parse(post.tags),
      categories: JSON.parse(post.categories)
    }
  }
  notFound()
}


/**
 * Get posts by category 
 * @param where SQL query
 */
export async function getPosts(where: any = {}): Promise<PrismaPosts[]> {
  if(where.categories) {
    where.categories = {
      contains: where.categories[0]
    }
  }
  const posts = await computed.posts.findMany({
    where,
    select: {
      ...select.post,
      user: {
        select: select.user
      },
      page: {
        select: {
          slug: true
        }
      }
    },
  })
  if(posts.length > 0) {
    return posts.map((post) => {
      post.tags = JSON.parse(post.tags)
      post.categories = JSON.parse(post.categories)
      return post
    })
  }
  return []
}