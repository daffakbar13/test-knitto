import { NextPage } from 'next'
import { PageUserListProps } from 'pages/users/list'
import React from 'react'
import { BasicCard } from '@knitto/components'
import { SectionTable } from './sections'

const Page: NextPage<PageUserListProps> = (props) => {
  const { users } = props
  const { isSuccess } = users

  return (
    <>
      {isSuccess && (
        <BasicCard title="User List">
          <SectionTable {...props} />
        </BasicCard>
      )}
    </>
  )
}

export default Page
