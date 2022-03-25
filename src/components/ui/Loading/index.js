import useAppState from '@hooks/useAppState'
import CircularProgress from '@mui/material/CircularProgress'
import Box from '@mui/material/Box'
import Typography from '../Typography/index'
import messages from './messages'

const Loading = ({ title }) => {
  const { intl } = useAppState()

  return (
    <Box
      sx={{ display: 'flex', height: '100vh', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}
    >
      <CircularProgress size={80} color="inherit" data-cy="loading" />

      <Typography py={5} variant="h2" data-cy="loading-title">
        {title ?? intl.formatMessage(messages.pageTitle)}
      </Typography>
    </Box>
  )
}

export default Loading
