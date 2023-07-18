import { makeStore } from '@knitto/utils/stores'
import React from 'react'
import { Provider } from 'react-redux'

export default function ReduxProvider(props: React.PropsWithChildren) {
  const { children } = props
  return <Provider store={makeStore()}>{children}</Provider>
}
