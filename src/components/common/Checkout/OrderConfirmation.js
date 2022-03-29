import Link from 'next/link'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import { FormattedMessage } from 'react-intl'
import useAppState from '@hooks/useAppState'
import ComponentError from '@components/common/Error/ComponentError'
import { useOrder, useStoreInfo } from '@graphql-sdk'
import { AuthLayout, CheckoutContainer } from '@components/common'
import { useBasket } from '@components/basket/BasketItem/context'
import { OrderDeliveryAndSlotSelector } from '@components/basket/DeliveryAndSlot'
import { PriceSummary } from '@components/basket/Summary'
import { Divider, Typography, Button } from '@components/ui'
import CheckoutSkeletonloader from './CheckoutSkeletonloader'
import messages from './messages'

const OrderConfirmation = () => {
  const router = useRouter()
  const {
    state: {
      items,
      ready,
      shipping: { delivery },
    },
    actions: { setDelivery, clear },
  } = useBasket()
  const { intl, isSignedIn, storeId } = useAppState()
  const { orderId } = router.query

  const { data: { order } = {}, loading, error } = useOrder({ storeId, orderId })
  const { data: { storeInfo } = {} } = useStoreInfo({ storeId: order?.deliverySlot?.storeGuid })
  const { total, deliveryCharge, visibleId, status } = order || {}

  useEffect(() => {
    if (status === 'cancelled') {
      router.push(`/orders/${order.id}/cancelled`)
    }

    if (ready && items?.[0] && status !== 'cancelled') {
      clear()
      setDelivery({ ...delivery, slot: null })
    }
  }, [ready, items, status])

  if (error) {
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
      seoTitle={intl.formatMessage(messages.thankYouForYourOrder)}
      title={<FormattedMessage {...messages.confirmation} values={{ visibleId }} />}
      allowBackOption={false}
    >
      <CheckoutContainer
        headerComponent={
          <>
            <Typography variant="h1" sx={{ pb: 2 }}>
              <FormattedMessage {...messages.thankYouForYourOrder} />
            </Typography>
            <Divider />
            <OrderDeliveryAndSlotSelector order={order} storeInfo={storeInfo} />
            <Divider />
            <PriceSummary subtotal={total - deliveryCharge} total={total} deliveryCharge={deliveryCharge} />
          </>
        }
        footerComponent={
          isSignedIn && (
            <Link href="/products" passHref>
              <Button component="a" fullWidth>
                {intl.formatMessage(messages.continue)}
              </Button>
            </Link>
          )
        }
      />
    </AuthLayout>
  )
}

OrderConfirmation.propTypes = {}

export default OrderConfirmation
