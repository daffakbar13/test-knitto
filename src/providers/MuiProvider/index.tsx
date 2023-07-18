import { ThemeProvider, CssBaseline } from '@mui/material'
import { theme } from '@knitto/styles/theme'
import React from 'react'

export default function MuiProvider(props: React.PropsWithChildren) {
  const { children } = props

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  )
}
