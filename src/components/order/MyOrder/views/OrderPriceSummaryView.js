import Box from '@mui/material/Box'
import { PriceSummary } from '@components/basket/Summary'

const OrderPriceSummaryView = ({ order, amendmentId }) => {
  // TODO: Merge price if slot state changes
  return (
    <Box>
      <PriceSummary
        subtotal={order.total - order.deliveryCharge}
        total={order.total}
        deliveryCharge={order.deliveryCharge}
      />
    </Box>
  )
}

export default OrderPriceSummaryView
