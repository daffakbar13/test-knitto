import { getRunningQueriesThunk, getTodoById, getTodoList } from '@knitto/services/todos'
import { makeStore, wrapper } from '@knitto/utils/stores'
import { PageTodoDetail } from '@knitto/views'
import { GetStaticPathsResult, InferGetServerSidePropsType } from 'next'

export async function getStaticPaths(): Promise<GetStaticPathsResult> {
  const store = makeStore()
  const { data } = await store.dispatch(getTodoList.initiate())
  const paths = (data || []).map((t) => ['/users/', t.userId, '/todos/', t.id].join(''))

  return {
    paths,
    fallback: false,
  }
}

export const getStaticProps = wrapper.getStaticProps((store) => async (context) => {
  const id = context.params?.todoId as string
  const todo = await store.dispatch(getTodoById.initiate(id))

  await Promise.all(store.dispatch(getRunningQueriesThunk()))

  return {
    props: { todo },
    revalidate: 10,
  }
})

export type PageTodoDetailProps = InferGetServerSidePropsType<typeof getStaticProps>

export default PageTodoDetail
