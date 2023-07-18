import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'
import Stack from '@mui/material/Stack'
import { BasicCardProps } from './types'

export default function BasicCard(props: BasicCardProps) {
  const { children, title } = props
  return (
    <Card sx={{ width: '80%', overflow: 'scroll' }}>
      <CardContent>
        <Stack gap={1}>
          <Typography sx={{ fontSize: 18 }}>{title}</Typography>
          {children}
        </Stack>
      </CardContent>
    </Card>
  )
}
