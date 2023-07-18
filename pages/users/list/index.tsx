import { getRunningQueriesThunk } from '@knitto/services/todos'
import { getUserList } from '@knitto/services/users'
import { paginationObject } from '@knitto/utils/helpers'
import { wrapper } from '@knitto/utils/stores'
import { PageUserList } from '@knitto/views'
import { InferGetServerSidePropsType } from 'next'

export const getServerSideProps = wrapper.getServerSideProps((store) => async (context) => {
  const { start, limit, page } = paginationObject(context.query)
  const users = await store.dispatch(getUserList.initiate({ start, limit }))
  const allRows = await store.dispatch(getUserList.initiate({}))
  const rowCount = (allRows.data || []).length

  await Promise.all(store.dispatch(getRunningQueriesThunk()))

  return {
    props: {
      users,
      page,
      pageSize: limit,
      rowCount,
    },
  }
})

export type PageUserListProps = InferGetServerSidePropsType<typeof getServerSideProps>

export default PageUserList
