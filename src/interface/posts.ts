import type {Posts} from '@prisma/client'


export type PrismaPosts = Posts
export type Categories = {
  slug: string,
  name: string,
}

export interface PostInterface extends Omit<Posts, 'tags' | 'categories'> {
  tags: string[],
  categories: Categories[],
}