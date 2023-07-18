import { DataGrid } from '@mui/x-data-grid/DataGrid'
import { useAppStore } from '@knitto/utils/stores'
import { useDispatch } from 'react-redux'
import { useUpdateTodoMutation } from '@knitto/services/todos'
import { useLoading } from '@knitto/utils/hooks'
import { PageUserTodosProps } from 'pages/users/[id]/todos'
import { Constant } from '../constant'

export default function SectionTable(props: PageUserTodosProps) {
  const { page, pageSize } = props
  const { columns, pageSizeOptions, onPaginationModelChange } = Constant
  const { todos, rowCount } = useAppStore((s) => s.todos)
  const isLoading = useLoading()
  const dispatch = useDispatch()
  const [updateTodo] = useUpdateTodoMutation()

  return (
    <DataGrid
      rows={todos}
      columns={columns(dispatch, updateTodo)}
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
      rowSelection={false}
    />
  )
}
