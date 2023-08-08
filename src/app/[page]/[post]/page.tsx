import '@src/assets/sass/posts.scss'

import Link from 'next/link'
import parse from 'html-react-parser'
import {datetime} from '@src/helpers/common'
import {getPost, iterateCategories} from '@src/controllers/posts'
import {
  CategoryType,
  URLParamsType,
  DateTimeInterface,
}
from '@src/interface/common'


export default async function Post({params}: {params: URLParamsType}) {
  const post: any = await getPost({slug: params.post, status: 'Published'})

  const updated: DateTimeInterface = datetime(post.updated)
  const published: DateTimeInterface = datetime(post.published)

  return (
    <>
      <title>{post.title}</title>
      <meta name="description" content={post.description}/>

      <div id="post" className="inner">
        <div>
          <div className="reaction">
            <button>
              <i className="icon-heart"></i>
              <span className="hearts-count">0</span>
            </button>
            <button>
              <i className="icon-bookmark"></i>
              <span className="bookmarks-count">0</span>
            </button>
            <button>
              <i className="icon-share"></i>
              <span className="shares-count">0</span>
            </button>
          </div>
          <div className="meta">
            <h1>{post.title}</h1>
            <p>
              <span className="date">
                Published on {published.getDate()}
              </span>
              <span className="category">
                In
                {iterateCategories(post.categories).map((item: CategoryType) => (
                  <Link href={`/${item.slug}`}>{item.name}{post.categories.length > 1 ? ', ' : ''}</Link>
                ))}
              </span>
            </p>
          </div>
        </div>
        <article>
          <div className="content">{parse(post.content)}</div>
          {/**
           * 
           */}
          {post.tags.length > 0 && (
            <div className="tags">
              {post.tags.map((item: string) => (<Link href="">{item}</Link>))}
            </div>
          )}
          {/**
           * Only when there's an update to the post
           */}
          {updated.date.getTime() > published.date.getTime()  && (
            <div className="meta">
              <p className="date">Updated on {updated.getDate()}</p>
            </div>
          )}
        </article>
      </div>
    </>
  )
}
