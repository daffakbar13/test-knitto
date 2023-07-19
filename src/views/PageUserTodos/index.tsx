/* eslint-disable react-hooks/exhaustive-deps */
import { NextPage } from 'next'
import { PageUserTodosProps } from 'pages/users/[id]/todos'
import { useDispatch } from 'react-redux'
import { setRowCount, setTodos } from '@knitto/utils/stores/todos'
import React from 'react'
import { BackButton, BasicCard } from '@knitto/components'
import { SectionConfirmDelete, SectionTable, SectionToolbar } from './sections'

const Page: NextPage<PageUserTodosProps> = (props: PageUserTodosProps) => {
  const { rows, allRows } = props
  const dispatch = useDispatch()

  React.useEffect(() => {
    if (rows.isSuccess && allRows.isSuccess) {
      dispatch(setTodos(rows.data))
      dispatch(setRowCount(allRows.data.length))
    }
  }, [rows.data])

  return (
    <>
      <BackButton href="/users/list" />
      {rows.isSuccess && (
        <>
          <BasicCard title="Todo List">
            <SectionToolbar />
            <SectionTable {...props} />
          </BasicCard>
          <SectionConfirmDelete />
        </>
      )}
    </>
  )
}

export default Page
