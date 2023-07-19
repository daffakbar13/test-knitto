import Box from '@mui/material/Box'
import Chip from '@mui/material/Chip'
import Typography from '@mui/material/Typography'
import { PageTodoDetailProps } from 'pages/users/[id]/todos/[todoId]'

export default function SectionDataTodo(props: PageTodoDetailProps) {
  const { todo } = props
  const isComplete = Boolean(todo.data?.completed)
  const getTodoLabel = isComplete ? 'Completed' : 'Not Completed'
  const getTodoColor = isComplete ? 'success' : 'error'

  return (
    <>
      {todo.isSuccess && (
        <>
          <Typography variant="body1" fontWeight="bold">
            Todo:
          </Typography>
          <Typography variant="body1">{todo.data.title}</Typography>
          <Typography variant="body1" fontWeight="bold">
            Status:
          </Typography>
          <Box>
            <Chip label={getTodoLabel} color={getTodoColor} />
          </Box>
        </>
      )}
    </>
  )
}
