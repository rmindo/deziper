import Editor from '@src/components/panel/editor/page'
import {
  getPage
}
from '@src/controllers/pages'


export const metadata = {
  title: 'Edit Page'
}

export default async function EditPage({params: {id}}: any) {
  const page = await getPage({id: Number(id)})
  return (
    <Editor data={page} action={'Edit'} resource={'Pages'}/>
  )
}
