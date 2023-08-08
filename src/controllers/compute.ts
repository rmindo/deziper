import {PrismaClient}from '@prisma/client'

/**
 * Prisma instance
 */
export const prisma = new PrismaClient()

/**
 * Select query
 */
export const select = {
  user: {
    id: true,
    bio: true,
    name: true,
    role: true,
    email: true,
    avatar: true,
    created: true
  },
  page: {
    id: true,
    type: true,
    slug: true,
    title: true,
    status: true,
    author: true,
    content: true,
    created: true,
    updated: true,
    published: true,
    template: true,
    topMenu: true,
    bottomMenu: true,
    description: true,
  },
  post: {
    id: true,
    tags: true,
    slug: true,
    title: true,
    media: true,
    parent: true,
    author: true,
    status: true,
    content: true,
    created: true,
    updated: true,
    published: true,
    categories: true,
    description: true,
  }
}


/**
 * Compute
 */
export const computed = prisma.$extends({
  result: {
    users: {
      name: {
        needs: {
          lastname: true,
          firstname: true,
        },
        compute(user) {
          return `${user.firstname} ${user.lastname}`
        },
      },
    },
  },
})