import { useAppStore } from '@knitto/utils/stores'
import LoadingButton from '@mui/lab/LoadingButton'
import Box from '@mui/material/Box'
import TextField from '@mui/material/TextField'
import { useDispatch } from 'react-redux'
import { useCreateTodoMutation } from '@knitto/services/todos'
import { Constant } from '../constant'

export default function SectionToolbar() {
  const { handleAddTodo, handleChangeNewTodo, handleKeyDownChangeNewTodo } = Constant
  const { newTodo, isLoadNewTodo } = useAppStore((s) => s.todos)
  const [createTodo] = useCreateTodoMutation()
  const dispatch = useDispatch()

  return (
    <Box display="flex" gap={1} justifyContent="end" alignItems="center">
      <TextField
        value={newTodo.title}
        onChange={handleChangeNewTodo(dispatch)}
        onKeyDown={handleKeyDownChangeNewTodo(newTodo, createTodo, dispatch)}
        size="small"
      />
      <LoadingButton
        variant="contained"
        size="large"
        onClick={handleAddTodo(newTodo, createTodo, dispatch)}
        loading={isLoadNewTodo}
        disabled={!newTodo.title}
      >
        Add
      </LoadingButton>
    </Box>
  )
}
