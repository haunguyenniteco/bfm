import { Alert } from '@components/ui'
import AlertTitle from '@mui/material/AlertTitle'
import Box from '@mui/material/Box'

const NotificationAlert = ({ severity, title, message }) => {
  return (
    <Box py={2}>
      <Alert severity={severity}>
        <AlertTitle>{title}</AlertTitle>
        {message}
      </Alert>
    </Box>
  )
}

NotificationAlert.defaultProps = {
  severity: 'info',
  title: '',
  message: '',
}

export default NotificationAlert
