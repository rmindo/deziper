
import ContentTable from '@src/components/panel/table'

export const metadata = {
  title: 'Posts'
}

export default function Posts() {
  return (
    <ContentTable
      columns={[
        'ID',
        'Title',
        'Category',
        'Status',
        'Updated',
      ]}
      resource={'Posts'}
    />
  )
}
