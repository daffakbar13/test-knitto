import { useAppStore } from '@knitto/utils/stores'
import LoadingButton from '@mui/lab/LoadingButton'
import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'
import DialogTitle from '@mui/material/DialogTitle'
import { useDeleteTodoMutation } from '@knitto/services/todos'
import { closeConfirmDelete, loadDeleteTodo } from '@knitto/utils/stores/todos'
import { useDispatch } from 'react-redux'
import Router from 'next/router'
import { Constant } from '../constant'

export default function SectionConfirmDelete() {
  const { getTodoTitleById } = Constant
  const { todos, isOpenConfirmDelete, selectedDeleteTodoId, isLoadDeleteTodo } = useAppStore(
    (s) => s.todos,
  )
  const dispatch = useDispatch()
  const [deleteTodo] = useDeleteTodoMutation()
  return (
    <Dialog
      open={isOpenConfirmDelete}
      keepMounted
      onClose={() => dispatch(closeConfirmDelete())}
      aria-describedby="alert-dialog-confirm-delete-todo"
    >
      <DialogTitle>Confirm Delete Todo</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-confirm-delete-todo">
          Are you sure you want to delete {getTodoTitleById(todos, selectedDeleteTodoId)}? This Todo
          will be deleted permanently.
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button variant="outlined" onClick={() => dispatch(closeConfirmDelete())}>
          Cancel
        </Button>
        <LoadingButton
          variant="contained"
          loading={isLoadDeleteTodo}
          onClick={() => {
            dispatch(loadDeleteTodo())
            deleteTodo(selectedDeleteTodoId)
              .unwrap()
              .then(() => {
                dispatch(closeConfirmDelete())
                Router.push(Router.asPath)
              })
          }}
        >
          Confirm
        </LoadingButton>
      </DialogActions>
    </Dialog>
  )
}
