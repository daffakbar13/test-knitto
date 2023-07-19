import Card, { CardProps } from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'
import Stack from '@mui/material/Stack'
import { styled } from '@mui/material/styles'
import { BasicCardProps } from './types'

const BasicCard = styled((props: CardProps & BasicCardProps) => {
  const { title, children } = props
  return (
    <Card {...props}>
      <CardContent>
        <Stack gap={1}>
          <Typography fontWeight="bold" sx={{ fontSize: 18 }}>
            {title}
          </Typography>
          {children}
        </Stack>
      </CardContent>
    </Card>
  )
})(() => ({
  width: '95%',
}))

export default BasicCard
