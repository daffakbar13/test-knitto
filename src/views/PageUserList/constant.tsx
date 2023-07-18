import { User } from '@knitto/services/users/types'
import { Link } from '@mui/material'
import Button from '@mui/material/Button'
import { GridColDef, GridPaginationModel } from '@mui/x-data-grid'
import Router from 'next/router'

export namespace Constant {
  export const columns: GridColDef<User>[] = [
    { headerName: 'ID', field: 'id' },
    { headerName: 'Name', field: 'name', flex: 2 },
    {
      headerName: 'Email',
      field: 'email',
      flex: 1,
      renderCell({ value }) {
        return (
          <Link href={`mailto:${value}`} target="_blank">
            {value}
          </Link>
        )
      },
    },
    {
      headerName: 'Website',
      field: 'website',
      flex: 1,
      renderCell({ value }) {
        return (
          <Link href={`https://${value}`} target="_blank">
            {value}
          </Link>
        )
      },
    },
    {
      headerName: 'Action',
      field: 'action',
      disableColumnMenu: true,
      sortable: false,
      renderCell({ row: { id } }) {
        return (
          <Button
            variant="text"
            size="small"
            onClick={() =>
              Router.push({
                pathname: '/users/[id]/todos',
                query: { id },
              })
            }
          >
            View Todos
          </Button>
        )
      },
    },
  ]

  export const pageSizeOptions = [5, 10]

  export const onPaginationModelChange = (p: GridPaginationModel) =>
    Router.push({ query: { ...p } })
}
