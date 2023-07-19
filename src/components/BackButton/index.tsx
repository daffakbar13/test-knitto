import Box, { BoxProps } from '@mui/material/Box'
import Button from '@mui/material/Button'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import { styled } from '@mui/material/styles'
import Link from 'next/link'
import { BackButtonProps } from './types'

const BackButton = styled((props: BoxProps & BackButtonProps) => {
  const { href } = props
  return (
    <Box {...props}>
      <Link href={href}>
        <Button variant="outlined" sx={{ gap: 1 }}>
          <ArrowBackIcon /> Back
        </Button>
      </Link>
    </Box>
  )
})(() => ({
  position: 'fixed',
  top: 20,
  left: 'calc(2.5% + 16px)',
}))

export default BackButton
