import Box from '@mui/material/Box'
import { BasketDeliveryAndSlotSelector, OrderDeliveryAndSlotSelector } from '@components/basket/DeliveryAndSlot'

const OrderDeliveryView = ({ order, orderId, delivery, address, storeInfo, editableMode }) => {
  return (
    <Box>
      {(delivery || address) && editableMode ? (
        <BasketDeliveryAndSlotSelector
          delivery={delivery}
          address={address}
          urlPath={`orders/${orderId}`}
          editableMode={editableMode}
        />
      ) : (
        <OrderDeliveryAndSlotSelector
          order={order}
          storeInfo={storeInfo}
          urlPath={`orders/${orderId}`}
          editableMode={editableMode}
        />
      )}
    </Box>
  )
}
OrderDeliveryView.prototype = {}

export default OrderDeliveryView
