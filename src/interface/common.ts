import {PrismaPages as Pages, PageInterface as PageInt} from '@src/interface/pages'
import {PrismaPosts as Posts, PostInterface as PostInt} from '@src/interface/posts'

import {
  HTTPOption as Option,
  HTTPResponse as Response,
}
from '@src/interface/http'


export type Menu = {
  name?: string | undefined,
  icon?: string,
  root?: string,
  label?: string,
  auth?: string[]
  group?: Menu[]
}

export type DynamicObject = {
  [key: string]: any
}

export type CategoryType = {
  slug: string,
  name: string
}

export type URLParamsType = {
  page: string,
  post: string,
}

export type PageProps = {
  page: PageInterface,
  params: DynamicObject,
  searchParams: URLParamsType
}


export type HTTPOption = Option
export type HTTPResponse = Response


export type PrismaPosts = Posts
export type PrismaPages = Pages
export type PageInterface = PageInt
export type PostInterface = PostInt

export interface DateTimeInterface {
  date: Date,
  today: Date,
  getDay(): string
  getTime(): string
  getDate(): string
  getFullDate(): string,
  getFullDateTime(div?: string): string,
}