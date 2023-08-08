import {Pages} from '@prisma/client'
import {notFound} from 'next/navigation'
import {PrismaPages} from '@src/interface/pages'
import {
  select,
  computed,
  prisma as prismaInstance
}
from '@src/controllers/compute'



/**
 * Reuse
 */
export const prisma = prismaInstance


/**
 * Get menu
 * @param where
 */
export async function getMenu(where: object): Promise<object[]> {
  const menu = await computed.pages.findMany({
    where,
    select: {
      id: true,
      slug: true,
      title: true,
    }
  })
  return menu ?? []
}

export async function getPage(query: object): Promise<Pages> {
  const data = await computed.pages.findFirst({
    where: query,
    select: {
      ...select.page,
      user: {
        select: select.user
      }
    }
  })
  if(data) {
    return data
  }
  notFound()
}


/**
 * Get pages
 * @param where
 */
export async function getPages(where: object = {}): Promise<PrismaPages[]> {
  const pages = await computed.pages.findMany({
    where,
    select: {
      ...select.page,
      user: {
        select: select.user
      }
    }
  })
  return pages ?? []
}