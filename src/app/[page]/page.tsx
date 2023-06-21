import '@src/assets/sass/posts.scss'
import {
  PostInterface,
  URLParamsType
}
from '@src/interface/common'


import {getDate} from '@src/lib/common'
import {isPage} from '@src/controllers/pages'
import {getPosts} from '@src/controllers/posts'


export default async function Category({params}: {params: URLParamsType}) {
  isPage(params.page)
  
  const {posts, category} = getPosts(params.page)
  return (
    <div id="panel">
      <section id="posts" className="row-1">
        <div className="inner">
          <h1>{category}</h1>
          <div id="items">
            {posts.map((post: PostInterface, index: number) => {
              const date = getDate(post.date)
              return (
                <article className="meta" key={index}>
                  <h3>{post.title}</h3>

                  <p className="date">Published on {date.published.getDate()}</p>
                  <p className="desc">{post.description}</p>
                  
                  <a className="more" href={`/${params.page}/${post.slug}`}>
                    <span>Read More</span>
                    <i className="icon-arrow-right"></i>
                  </a>
                </article>
              )
            })}
            <article/>
          </div>
        </div>
      </section>
    </div>
  )
}
