import {notFound} from "next/navigation"


export default function Category({params}: any) {
  if(!['code','security','blockchain','network'].includes(params.slug)) {
    notFound()
  }
  return (
    <div id="panel">
      <section className="row-1">
        <div className="inner">
          <h1>Category</h1>
        </div>
      </section>
    </div>
  )
}
