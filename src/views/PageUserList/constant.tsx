import { User } from '@knitto/services/users/types'
import Button from '@mui/material/Button'
import Link from '@mui/material/Link'
import { GridColDef, GridPaginationModel } from '@mui/x-data-grid'
import NextLink from 'next/link'
import Router from 'next/router'

export namespace Constant {
  export const columns: GridColDef<User>[] = [
    { headerName: 'ID', field: 'id', disableColumnMenu: true, sortable: false, width: 52 },
    {
      headerName: 'Name',
      field: 'name',
      disableColumnMenu: true,
      sortable: false,
      flex: 1,
      minWidth: 200,
    },
    {
      headerName: 'Email',
      field: 'email',
      disableColumnMenu: true,
      sortable: false,
      minWidth: 200,
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
      disableColumnMenu: true,
      sortable: false,
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
      minWidth: 120,
      renderCell({ row: { id } }) {
        return (
          <NextLink
            href={{
              pathname: '/users/[id]/todos',
              query: { id },
            }}
          >
            <Button variant="outlined">View Todos</Button>
          </NextLink>
        )
      },
    },
  ]

  export const pageSizeOptions = [5, 10]

  export const onPaginationModelChange = (p: GridPaginationModel) =>
    Router.push({ query: { ...p } })
}
