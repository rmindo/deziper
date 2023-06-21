import {PostInterface as Post} from '@src/interface/post'
import {
  DateInterface as DateInt,
  DateTimeInterface as DateTimeInt,
  PostDateInterface as PostDateInt,
}
from '@src/interface/date'


export type CategoryType = {
  slug: string,
  name: string
}

export type URLParamsType = {
  page: string,
  post: string,
}

export interface HelpersInterface {
  date: (date: {updated: string, published: string}) => DateInt
}

export type PostInterface = Post
export type DateInterface = DateInt
export type PostDateInterface = PostDateInt
export type DateTimeInterface = DateTimeInt
export interface PostInstance {
  post: Post,
  help: DateInt
}