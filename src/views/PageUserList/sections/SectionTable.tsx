import { DataGrid } from '@mui/x-data-grid/DataGrid'
import { PageUserListProps } from 'pages/users/list'
import { useLoading } from '@knitto/utils/hooks'
import { Constant } from '../constant'

export default function SectionTable(props: PageUserListProps) {
  const { users, rowCount, page, pageSize } = props
  const { columns, pageSizeOptions, onPaginationModelChange } = Constant
  const { data } = users
  const isLoading = useLoading()

  return (
    <DataGrid
      rows={data || []}
      columns={columns}
      initialState={{
        pagination: {
          paginationModel: { page, pageSize },
        },
      }}
      paginationMode="server"
      onPaginationModelChange={onPaginationModelChange}
      pageSizeOptions={pageSizeOptions}
      loading={isLoading}
      rowCount={rowCount}
    />
  )
}
