import Router from 'next/router'
import React from 'react'

export default function Page() {
  React.useEffect(() => {
    Router.push('/users/list')
  })
}
