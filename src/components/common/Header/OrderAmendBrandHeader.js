import { useRouter } from 'next/router'
import { FormattedMessage } from 'react-intl'
import Button from 'components/ui/Button'
import Typography from '@components/ui/Typography'
import Box from '@mui/material/Box'
import messages from './messages'

const OrderAmendBrandHeader = ({ amendmentId }) => {
  const router = useRouter()

  return (
    <Box sx={{ display: 'flex', alignItems: 'center' }}>
      <Typography m={1} variant="body1" color="primary" fontWeight="bold" sx={{ flexGrow: 1 }}>
        <FormattedMessage {...messages.amendmentTitle} values={{ amendmentId }} />
      </Typography>

      <Button
        sx={{ width: 84, height: 32 }}
        color="primary"
        size="small"
        onClick={() => router.replace(`/orders/${amendmentId}#confirm-changes`)}
      >
        <FormattedMessage {...messages.saveAmendment} />
      </Button>
    </Box>
  )
}

export default OrderAmendBrandHeader
