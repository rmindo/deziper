import Link from 'next/link'


import {datetime} from '@src/helpers/common'
import {getPage} from '@src/controllers/pages'
import {getPosts} from '@src/controllers/posts'
import {PageProps} from '@src/interface/common'


export default async function Category({page: {slug}}: PageProps) {

  const page = await getPage({slug, status: 'Published'})
  const posts = await getPosts({categories: [slug], status: 'Published'})
  
    return (
      <div id="category">
        <h1>{page.title}</h1>
        
        {posts.length > 0 ? (
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
        ):(
          <div>
            All posts related to this category will be here.
          </div>
        )}
      </div>
    )
}
