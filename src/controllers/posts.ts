import {getDate} from '@src/lib/common'
import {isPage, notFound} from '@src/controllers/pages'
import {
  URLParamsType,
  DateInterface,
  PostInterface,
}
from '@src/interface/common'


import posts from '@src/controllers/posts.json'


/**
 * Iterate categories with new property name
 * @param categories 
 * @returns {array}
 */
function iterateCategories(categories: {[key: string]: string}) {
  var items = []
  for(var slug in categories) {
    items.push({slug, name: categories[slug]})
  }
  return items
}

/**
 * Get Post 
 * @param params URL path parameters
 * @returns {PostInterface}
 */
export function getPost({page, post: slug}: URLParamsType): PostInterface {
  const items = posts.filter((post: any) => slug == post.slug)

  if(!isPage(page) || items.length == 0) {
    notFound()
  }

  const post: PostInterface = items[0]
  const date: DateInterface = getDate(post.date)

  return {
    ...post,
    date: {
      created: post.date.created,
      updated: date.updated.getDateAndDay(),
      published: date.published.getDateAndDay()
    },
    categories: iterateCategories(post.categories)
  }
}


/**
 * Get posts by category 
 * @param category Category name
 * @returns {object}
 */
export function getPosts(category: string) {
  const items: PostInterface[] = posts.filter((post: PostInterface) => {
    if(post.categories[category]) {
      const date: DateInterface = getDate(post.date)
      return post
    }
  })
  return {
    posts: items,
    category: items[0].categories[category]
  }
}