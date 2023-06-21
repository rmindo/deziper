import '@src/assets/sass/posts.scss'


import {getDate} from '@src/lib/common'
import {getPost} from '@src/controllers/posts'
import {
  CategoryType,
  PostInterface,
  URLParamsType,
  DateInterface,
}
from '@src/interface/common'


export default function Post({params}: {params: URLParamsType}) {
  const post: PostInterface = getPost(params)
  const date: DateInterface = getDate(post.date)

  return (
    <div id="panel">
      <section className="row-1">
        <article id="post" className="inner">
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
                Published on {post.date.published}
              </span>
              {/**
               * Only when there's an update to the post
               */}
              {date.isUpdated() && (
                <span className="date">
                  and Updated on {post.date.published}
                </span>
              )}
              <span className="category">
                In
                {post.categories.map((item: CategoryType) => (
                  <a href={`/${item.slug}`}>{item.name}{post.categories.length > 1 ? ', ' : ''}</a>
                ))}
              </span>
            </p>
          </div>
          <div className="content">
            {post.content}
          </div>
          <div className="tags">
            {post.tags.map((item: string) => (<a href="">{item}</a>))}
          </div>
        </article>
      </section>
    </div>
  )
}
