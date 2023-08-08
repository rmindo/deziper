
import {getCookie} from '@src/helpers/server'
import Editor from '@src/components/panel/editor/page'


export const metadata = {
  title: 'Create Page'
}

export default async function CreatePage() {
  const user: any = getCookie('deziper')
  const initial = {
    user,
    type: 'Page',
    author: user.id,
  }
  return (
    <Editor data={initial} resource={'Pages'} action={'Create'}/>
  )
}
