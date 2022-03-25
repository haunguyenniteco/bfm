import { FormattedMessage } from 'react-intl'
import { isDelivery } from '@lib/helpers'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import messages from '../../messages'

const OrderHeaderView = ({ order }) => {
  return (
    <Box py={3}>
      <Box justifyContent="space-between" alignItems="flex-end" display="flex">
        <Box flex={1}>
          <Typography fontSize="12px" mb="5px">
            <FormattedMessage {...messages.orderType} />
          </Typography>
          <Typography fontSize="18px" letterSpacing={-0.25} fontWeight="bold">
            {isDelivery(order?.deliveryType) ? (
              <FormattedMessage {...messages.delivery} />
            ) : (
              <FormattedMessage {...messages.collection} />
            )}
          </Typography>
        </Box>
        <Box>
          <Typography fontSize="12px" mb="5px">
            <FormattedMessage {...messages.orderStatus} />
          </Typography>
          <Box fontSize="18px" letterSpacing={-0.25} fontWeight="bold">
            {order.status}
          </Box>
        </Box>
      </Box>
    </Box>
  )
}

export default OrderHeaderView
