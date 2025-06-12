export default function({exc}:any) {
  return (
    <div id="notfound" className="inner">
      <div className="error-404">
        <h1>{exc.statusCode}</h1>
        {exc.data ? (
          <p>{exc.data.message}</p>
        ):(
          <p>Sorry, There's nothing here. The page you're trying to access might be removed, renamed or never exist.</p>
        )}
      </div>
    </div>
  )
}