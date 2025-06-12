

export default function({title}) {

    return (
      <div id="category" className="inner">
        <h1>{title}</h1>
        
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
