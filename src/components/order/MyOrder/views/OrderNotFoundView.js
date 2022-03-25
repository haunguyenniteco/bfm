import { FormattedMessage } from 'react-intl'
import { AuthLayout, CheckoutContainer } from '@components/common'
import Typography from '@components/ui/Typography/index'
import messages from '../../messages'

const OrderNotFoundView = ({ orderId }) => {
  return (
    <AuthLayout>
      <CheckoutContainer
        headerComponent={
          <Typography textAlign="center" fontWeight={600}>
            <FormattedMessage {...messages.notFound} values={{ orderId }} />
          </Typography>
        }
      />
    </AuthLayout>
  )
}

OrderNotFoundView.prototype = {}
export default OrderNotFoundView
