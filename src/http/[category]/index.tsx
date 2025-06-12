/**
 * Types
 */
import {
  ExtendedContext
}
from '@app/types/common'



import posts from '@data/posts.json'

/**
 * Category page
 */
export default function(ctx:ExtendedContext) {
  const req = ctx.request
  const meta = {
    title: req.params.category
  }
  const items = posts.filter((v:any) => v.category == req.params.category)

  return (
    <div id="category" className="inner">
      <h1>{req.params.category}</h1>
      
      {items.length > 0 ? (
        <div id="items">
          {items.map((post: any, index: number) => {
            const published = new Date()
            return (
              <article className="meta" key={index}>
                <h3>{post.title}</h3>

                <p className="date">Published on {published.getDate()}</p>
                <p className="desc">{post.description}</p>
                
                <a className="more" href={post.url}>
                  <span>Read More</span>
                  <i className="icon-arrow-right"></i>
                </a>
              </article>
            )
          })}
          <article/>
        </div>
      ):(
        <div>
          All posts related to this category will be here.
        </div>
      )}
    </div>
  )
}