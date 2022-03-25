import Link from 'next/link'
import { useRouter } from 'next/router'
import { FormattedMessage } from 'react-intl'
import ComponentError from '@components/common/Error/ComponentError'
import useAppState from '@hooks/useAppState'
import { useOrder } from '@graphql-sdk'
import { AuthLayout, CheckoutContainer } from '@components/common'
import { Typography, Button } from '@components/ui/index'
import CheckoutSkeletonloader from './CheckoutSkeletonloader'
import messages from './messages'

const CancelledOrder = () => {
  const router = useRouter()
  const { intl, isSignedIn, storeId } = useAppState()
  const { orderId } = router.query
  const { data: { order } = {}, loading, error } = useOrder({ storeId, orderId })
  const { visibleId, status } = order || {}

  if (error || status !== 'cancelled') {
    return (
      <AuthLayout allowBackOption={false}>
        <ComponentError />
      </AuthLayout>
    )
  }

  if (loading) {
    return <CheckoutSkeletonloader />
  }

  return (
    <AuthLayout
      seoTitle={intl.formatMessage(messages.cancelledOrderTitle)}
      title={<FormattedMessage {...messages.cancelled} values={{ visibleId }} />}
      allowBackOption={false}
    >
      <CheckoutContainer
        headerComponent={
          <>
            <Typography variant="h1" sx={{ pb: 2 }}>
              <FormattedMessage {...messages.cancelledOrderTitle} />
            </Typography>
            <Typography>
              <FormattedMessage {...messages.cancelledOrderMessage} />
            </Typography>
          </>
        }
        footerComponent={
          isSignedIn && (
            <Link href="/checkout" passHref>
              <Button component="a" fullWidth>
                <FormattedMessage {...messages.cancelledOrderAction} />
              </Button>
            </Link>
          )
        }
      />
    </AuthLayout>
  )
}

CancelledOrder.propTypes = {}

export default CancelledOrder
