import { getRunningQueriesThunk } from '@knitto/services/todos'
import { getUserTodos } from '@knitto/services/users'
import { paginationObject } from '@knitto/utils/helpers'
import { wrapper } from '@knitto/utils/stores'
import { PageUserTodos } from '@knitto/views'
import { InferGetServerSidePropsType } from 'next'

export const getServerSideProps = wrapper.getServerSideProps((store) => async (context) => {
  const id = context.params?.id as string
  const { page, start, limit } = paginationObject(context.query)
  const rows = await store.dispatch(getUserTodos.initiate({ id, start, limit }))
  const allRows = await store.dispatch(getUserTodos.initiate({ id }))

  await Promise.all(store.dispatch(getRunningQueriesThunk()))

  return {
    props: { rows, allRows, page, pageSize: limit },
    notFound: rows.isError || (allRows.data || []).length === 0,
  }
})

export type PageUserTodosProps = InferGetServerSidePropsType<typeof getServerSideProps>

export default PageUserTodos
