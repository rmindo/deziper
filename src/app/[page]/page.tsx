import '@src/assets/sass/posts.scss'


import parse from 'html-react-parser'
import {
  URLParamsType
}
from '@src/interface/common'


import {getPage} from '@src/controllers/pages'

/**
 * Dynamic page
 */
export default async function Page(props: {params: URLParamsType}) {
  const page: any = await getPage({slug: props.params.page, status: 'Published'})

  if(page) {
    if(page.template) {
      const Template = await import(`@src/template/${page.template}`)
      return (
        <Template.default page={page} {...props}/>
      )
    }
    else {
      return (
        <div id={page.slug} className={'inner'}>
          <h1>{page.title}</h1>
          <article>
            {parse(page.content)}
          </article>
        </div>
      )
    }
  }
  return null
}
