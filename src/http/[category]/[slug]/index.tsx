import {exception as exc} from '@vindo/core'
/**
 * Types
 */
import {
  Request,
  Response,
  ExtendedContext
}
from '@app/types/common'



import posts from '@data/posts.json'
  


export function params(req:Request, res:Response, ctx:ExtendedContext) {
  res.json({
    params: req.params
  })
}


/**
 * Article
 */
export default function(ctx:ExtendedContext) {
  const req = ctx.request

  const post = posts.filter(v => v.url == req.url)[0]
  if(!post) {
    const data = {
      data: {
        message: 'There\'s nothing here. The page you\'re trying to access might have been removed, renamed, or never existed.'
      }
    }
    throw new exc.NotFoundException(data, false)
  }

  return (
    <div id="post" className="inner">
      <p>Category: {post.category}</p>
      <p>Sub Page: <a href={`${post.url}/params`}>Parameters</a></p>

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
              Published on {/*published.getDate()*/}
            </span>
            <span className="category">
              In
              {/* {iterateCategories(post.categories).map((item: CategoryType) => (
                <Link href={`/${item.slug}`}>{item.name}{post.categories.length > 1 ? ', ' : ''}</Link>
              ))} */}
            </span>
          </p>
        </div>
      </div>
      <article>
        <div className="content">{(post.content)}</div>
        {/**
         * 
         */}
        {post.tags.length > 0 && (
          <div className="tags">
            {post.tags.map((item: string, index: number) => (<a key={index}>{item}</a>))}
          </div>
        )}
        {/**
         * Only when there's an update to the post
         */}
        {/* {updated.date.getTime() > published.date.getTime()  && (
          <div className="meta">
            <p className="date">Updated on {updated.getDate()}</p>
          </div>
        )} */}
      </article>
    </div>
  )
}