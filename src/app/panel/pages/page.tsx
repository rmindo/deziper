
import ContentTable from '@src/components/panel/table'

export const metadata = {
  title: 'Pages'
}

export default async function Pages() {
  return (
    <ContentTable
      columns={[
        'ID',
        'Title',
        'Type',
        'Status',
        'Updated',
      ]}
      resource={'Pages'}
    />
  )
}
