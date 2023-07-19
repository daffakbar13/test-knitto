import { Todo, TodoList } from '@knitto/services/todos/types'
import Checkbox from '@mui/material/Checkbox'
import { GridActionsCellItem, GridColDef, GridPaginationModel } from '@mui/x-data-grid'
import Router from 'next/router'
import EditIcon from '@mui/icons-material/Edit'
import DeleteIcon from '@mui/icons-material/DeleteOutlined'
import { useCreateTodoMutation, useUpdateTodoMutation } from '@knitto/services/todos'
import { AnyAction, Dispatch } from '@reduxjs/toolkit'
import { addTodo, changeNewTodo, loadNewTodo, openConfirmDelete } from '@knitto/utils/stores/todos'
import Button from '@mui/material/Button'
import Link from 'next/link'

export namespace Constant {
  export const columns = (
    dispatch: Dispatch<AnyAction>,
    updateTodo: ReturnType<typeof useUpdateTodoMutation>[0],
  ): GridColDef<Todo>[] => [
    {
      headerName: '',
      field: 'completed',
      disableColumnMenu: true,
      sortable: false,
      width: 52,
      renderCell({ value, row }) {
        return (
          <Checkbox
            defaultChecked={value}
            onChange={(e) => updateTodo({ ...row, completed: e.target.checked })}
          />
        )
      },
    },
    {
      headerName: 'Todo',
      field: 'title',
      disableColumnMenu: true,
      sortable: false,
      editable: true,
      minWidth: 600,
      flex: 1,
      renderCell({ value, row: { id } }) {
        return (
          <>
            <GridActionsCellItem
              icon={<DeleteIcon />}
              label="Delete"
              color="inherit"
              onClick={() => {
                dispatch(openConfirmDelete(id))
              }}
            />
            <GridActionsCellItem icon={<EditIcon />} label="Edit" color="inherit" />
            {value}
          </>
        )
      },
      preProcessEditCellProps({ hasChanged, row, props: { value } }) {
        if (hasChanged) {
          updateTodo({ ...row, title: value })
        }
        return value
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
          <Link
            href={{
              pathname: `${Router.pathname}/[todoId]`,
              query: { id: Router.query.id, todoId: id },
            }}
          >
            <Button variant="outlined">View Detail</Button>
          </Link>
        )
      },
    },
  ]

  export const pageSizeOptions = [5, 10]

  export const onPaginationModelChange = (p: GridPaginationModel) =>
    Router.push({ query: { ...Router.query, ...p } })

  export function handleAddTodo(
    payload: Parameters<ReturnType<typeof useCreateTodoMutation>[0]>[0],
    createTodo: ReturnType<typeof useCreateTodoMutation>[0],
    dispatch: Dispatch<AnyAction>,
  ) {
    return () => {
      dispatch(loadNewTodo())
      createTodo(payload)
        .unwrap()
        .then((todo) => dispatch(addTodo(todo)))
    }
  }

  export function handleChangeNewTodo(
    dispatch: Dispatch<AnyAction>,
  ): React.ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement> {
    return (e) => {
      dispatch(
        changeNewTodo({
          title: e.target.value,
          completed: false,
          userId: Number(Router.query.id),
        }),
      )
    }
  }

  export function handleKeyDownChangeNewTodo(
    ...params: Parameters<typeof handleAddTodo>
  ): React.KeyboardEventHandler<HTMLDivElement> {
    return (e) => {
      if (e.key === 'Enter') {
        handleAddTodo(...params)()
      }
    }
  }

  export const getTodoTitleById = (todos: TodoList, id: number) =>
    todos.find((e) => e.id === id)?.title
}
