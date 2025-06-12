

export default function({posts, params}:any) {
  return (
    <div id="blog" className="inner">
      <h1>{params.category}</h1>
      <div>
        {posts.map((item:any, key:number) => {
          return (
            <p key={key}>
              <a href={item.url}>{item.title}</a>
            </p>
          )
        })}
      </div>
    </div>
  )
}