
import {getCookie} from '@src/helpers/server'
import Editor from '@src/components/panel/editor/page'


export const metadata = {
  title: 'Create Post'
}

export default async function CreatePost() {
  const user: any = getCookie('deziper')
  const initial = {
    user,
    tags: [],
    author: user.id,
    categories: []
  }
  return (
    <Editor data={initial} resource={'Posts'} action={'Create'}/>
  )
}
