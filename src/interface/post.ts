
export interface PostInterface {
  id: number,
  title: string,
  author: string,
  status: string,
  content: string,
  description: string,
  tags: string[],
  date: {
    updated: string,
    created: string,
    published: string,
  },
  categories: {
    [key: string]: any
  },
  slug: string,
  media: string,
}