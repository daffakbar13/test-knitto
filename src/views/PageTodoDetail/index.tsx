import { BackButton, BasicCard } from '@knitto/components'
import { NextPage } from 'next'
import { PageTodoDetailProps } from 'pages/users/[id]/todos/[todoId]'
import { useRouter } from 'next/router'
import { SectionDataTodo } from './sections'

const Page: NextPage<PageTodoDetailProps> = (props) => {
  const { todo } = props
  const router = useRouter()

  return (
    <>
      <BackButton href={{ pathname: '/users/[id]/todos', query: { id: router.query.id } }} />
      {todo.isSuccess && (
        <BasicCard title="Todo Detail" sx={{ width: '70%' }}>
          <SectionDataTodo {...props} />
        </BasicCard>
      )}
    </>
  )
}

export default Page
