import React from 'react'
import { MuiProvider } from '@knitto/providers'
import ReduxProvider from '@knitto/providers/ReduxProvider'
import Stack from '@mui/material/Stack'
import Header from './Header'

export default function MainLayout(props: React.PropsWithChildren) {
  const { children } = props
  return (
    <>
      <Header />
      <ReduxProvider>
        <MuiProvider>
          <Stack
            component="main"
            height="100vh"
            padding={2}
            justifyContent="center"
            alignItems="center"
          >
            {children}
          </Stack>
        </MuiProvider>
      </ReduxProvider>
    </>
  )
}
