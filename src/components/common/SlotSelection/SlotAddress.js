import { FormattedMessage } from 'react-intl'
import Paper from '@mui/material/Paper'
import { useRouter } from 'next/router'
import Button from '@components/ui/Button'
import { isDelivery } from '@lib/helpers'
import LocationOnIcon from '@mui/icons-material/LocationOn'
import CardHeader from '@mui/material/CardHeader'
import Typography from '@components/ui/Typography/index'
import Box from '@mui/material/Box'
import messages from './messages'

const SlotAddress = ({ delivery, addressLine }) => {
  const router = useRouter()

  return (
    <Box py={5}>
      <Paper>
        <CardHeader
          avatar={<LocationOnIcon />}
          action={
            <Button
              aria-label="settings"
              variant="text"
              onClick={() => router.push(`/get-address?redirectUrl=${router.query.redirectUrl || ''}`)}
            >
              <FormattedMessage {...messages.changeAddress} />
            </Button>
          }
          title={<Typography variant="body1"> {addressLine} </Typography>}
          subheader={isDelivery(delivery.type) ? delivery.store.name : ''}
        />
      </Paper>
    </Box>
  )
}

export default SlotAddress
