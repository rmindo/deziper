import Error from '@pages/error'


export default function(this:any) {
  const exc = this.exception

  this.response.status(exc.statusCode)
  const meta = {
    title: `${exc.statusCode} ${exc.status}`
  }
  return (
    <Error meta={meta} exc={exc}/>
  )
}