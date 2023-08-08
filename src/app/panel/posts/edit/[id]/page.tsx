import Editor from '@src/components/panel/editor/page'
import {
  getPost
}
from '@src/controllers/posts'


export const metadata = {
  title: 'Edit Post'
}

export default async function EditPost({params: {id}}: any) {
  const post = await getPost({id: Number(id)})
  return (
    <Editor data={post} action={'Edit'} resource={'Posts'}/>
  )
}
