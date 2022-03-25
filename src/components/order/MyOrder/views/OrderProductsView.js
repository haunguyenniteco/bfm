import useAppState from '@hooks/useAppState'
import useChangeLanguage from '@hooks/useChangeLanguage'
import BasketProductList from '@components/basket/BasketProductList'
import { FormattedMessage } from 'react-intl'
import { OrderProducts } from '@components/product'
import { toast } from 'react-toastify'
import Box from '@mui/material/Box'
import messages from '../../messages'

const OrderProductsView = ({ order, items, amendmentId, removeItem, removeItemNote }) => {
  const { intl } = useAppState()
  const { locale } = useChangeLanguage()

  const handleRemoveNote = item => {
    try {
      removeItemNote(item)
      document.activeElement.blur()
      toast(<FormattedMessage {...messages.successMessage} />)
    } catch (error) {
      toast.error(<FormattedMessage {...messages.errorMessage} />)
      console.log(error)
    }
  }

  const handleRemoveItem = item => {
    try {
      removeItem(item)
      document.activeElement.blur()
      toast(<FormattedMessage {...messages.successMessage} />)
    } catch (error) {
      toast.error(<FormattedMessage {...messages.errorMessage} />)
      console.log(error)
    }
  }

  return (
    <Box>
      {amendmentId && items ? (
        <BasketProductList
          items={items}
          locale={locale}
          showNoteOption={false}
          handleRemoveNote={handleRemoveNote}
          handleRemoveItem={handleRemoveItem}
        />
      ) : (
        <OrderProducts products={order.products} title={intl.formatMessage(messages.orderSummary)} />
      )}
    </Box>
  )
}

export default OrderProductsView
