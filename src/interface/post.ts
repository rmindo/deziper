
export interface PostInterface {
  id: number,
  title: string,
  author: string,
  status: string,
  content: string,
  description: string,
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