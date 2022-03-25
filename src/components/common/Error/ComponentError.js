import { useRouter } from 'next/router'
import { Typography, Container } from '@components/ui'
import ReplayIcon from '@mui/icons-material/Replay'
import IconButton from '@mui/material/IconButton'
import Box from '@mui/material/Box'
import { FormattedMessage } from 'react-intl'
import messages from './messages'

const ComponentError = () => {
  const router = useRouter()
  return (
    <Container>
      <Box display="flex" alignItems="center" pt={4} justifyContent="center" data-testid="error">
        <Typography>
          <FormattedMessage {...messages.title} />
        </Typography>
        <IconButton aria-label="reload" color="primary" onClick={() => router.reload()}>
          <ReplayIcon />
        </IconButton>
      </Box>
    </Container>
  )
}

export default ComponentError
