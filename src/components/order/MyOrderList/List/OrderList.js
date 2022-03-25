import { FormattedMessage } from 'react-intl'
import Box from '@mui/material/Box'
import Container from '@mui/material/Container'
import Typography from '@components/ui/Typography/index'
import messages from '../../messages'
import OrderItem from '../Item/OrderItem'

const OrderList = ({ orders, storeInfo }) => {
  const filterItems = ['delivered', 'collected', 'cancelled']
  return (
    <Container width="100%" data-cy="order-list">
      <Box data-cy="current-order-list">
        {orders
          ?.filter(item => !filterItems.includes(item.status))
          .map((currentOrders, key) => (
            <OrderItem key={key} item={currentOrders} storeInfo={storeInfo} />
          ))}
      </Box>
      <Box data-cy="past-order-list" bgcolor="white" p={1}>
        <Typography data-cy="past-orders">
          <FormattedMessage {...messages.pastOrders} />
        </Typography>
        {orders
          ?.filter(item => filterItems.includes(item.status))
          .map((pastOrders, key) => (
            <OrderItem key={key} item={pastOrders} storeInfo={storeInfo} />
          ))}
      </Box>
    </Container>
  )
}

export default OrderList
