import { SxProps } from '@mui/material'

export const globalStyles: SxProps = {
  '& *': { boxSizing: 'border-box' },
  '& html, body': {
    margin: 0,
    padding: 0,
  },
  '& body': {
    height: '100vh',
    width: '100vw',
    background: 'linear-gradient(180deg, #FFFFFF 0%, #D4D5E2 100%)',
  },
  '::-webkit-scrollbar': {
    display: 'none',
    width: 0,
    height: 0,
    background: 'transparent',
  },
}
