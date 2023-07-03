// import '@src/assets/sass/posts.scss'

import Link from 'next/link'


import {datetime} from '@src/helpers/common'
import {getPosts} from '@src/controllers/posts'
import {PageProps} from '@src/interface/common'


export default async function Category({page}: PageProps) {
  const posts = await getPosts({categories: [page.slug], status: 'Published'})
  
  if(posts.length > 0) {
    return (
      <div id="category">
        <h1>{posts[0].parent}</h1>
        
        <div id="items">
          {posts.map((post: any, index: number) => {
            const published = datetime(post.published)
            return (
              <article className="meta" key={index}>
                <h3>{post.title}</h3>

                <p className="date">Published on {published.getDate()}</p>
                <p className="desc">{post.description}</p>
                
                <Link className="more" href={`/${page.slug}/${post.slug}`}>
                  <span>Read More</span>
                  <i className="icon-arrow-right"></i>
                </Link>
              </article>
            )
          })}
          <article/>
        </div>
      </div>
    )
  }
  return null
}
