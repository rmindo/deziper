import {notFound} from "next/navigation"

const categories = [
  'code',
  'others',
  'network',
  'security',
]

export default function Category({params}: any) {

  if(!categories.includes(params.slug)) {
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
