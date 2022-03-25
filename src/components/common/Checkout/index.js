import { useEffect } from 'react'
import { useRouter } from 'next/router'
import useAppState from '@hooks/useAppState'
import Box from '@mui/material/Box'
import Link from 'next/link'
import Button from '@components/ui/Button'
import { toast } from 'react-toastify'
import { useBasket } from '@components/basket/BasketItem/context'
import { useCreateOrder } from '@graphql-sdk'
import useSlotReservation from '@hooks/useSlotReservation'
import { BasketDeliveryAndSlotSelector } from '@components/basket/DeliveryAndSlot'
import Summary from '@components/basket/Summary'
import { AuthLayout, CheckoutContainer } from '@components/common'
import CheckoutSkeletonloader from './CheckoutSkeletonloader'
import CheckoutForm from './CheckoutForm'
import messages from './messages'
import { createOnlineOrderPayload } from './methods'

function Checkout() {
  const createOrder = useCreateOrder()
  const router = useRouter()
  const { intl } = useAppState()
  const {
    state: {
      orchestration,
      items,
      ready,
      shipping: { delivery, address },
    },
    actions: { setOrder },
  } = useBasket()

  const { getReservedSlot } = useSlotReservation()

  const onPlaceOrder = ({ notes, ...customer }, { setSubmitting }) => {
    const reservedSlot = getReservedSlot()
    const input = createOnlineOrderPayload({
      items,
      customer,
      address,
      delivery,
      reservedSlot,
      notes,
      orchestration,
      placeId: delivery?.store?.placeId,
    })

    createOrder({ input })
      .then(({ data: { createOrder: order } = {} }) => {
        setOrder(order)
        const { checkoutUrl } = order.payment
        if (checkoutUrl) {
          router.replace(`${checkoutUrl}`)
        }
      })
      .catch(err => {
        toast.error(intl.formatMessage(messages.errorMessage))
        console.error(JSON.stringify(err)) // make error readable
        setSubmitting(false)
      })
  }

  useEffect(() => {
    if (ready && !address?.address) {
      return router.replace('/get-address?redirectUrl=/checkout')
    }
    if (ready && !delivery?.store) {
      return router.replace('/select-store?redirectUrl=/checkout')
    }
    if (ready && !delivery?.slot) {
      return router.replace('/select-slot?redirectUrl=/checkout')
    }
  }, [address, delivery, ready, router])

  if (ready && address && delivery) {
    return (
      <AuthLayout title={intl.formatMessage(messages.pageTitle)} bg="white">
        <CheckoutContainer
          headerComponent={
            <>
              <BasketDeliveryAndSlotSelector address={address} delivery={delivery} urlPath="checkout" editableMode />
              <Summary />
            </>
          }
        >
          {ready && items?.[0] ? (
            <CheckoutForm deliveryType={delivery?.type} onPlaceOrder={onPlaceOrder} />
          ) : (
            <Box my={2}>
              <Link href="/products" passHref>
                <Button variant="outlined" fullWidth component="a">
                  {intl.formatMessage(messages.addProductBeforeCheckout)}
                </Button>
              </Link>
            </Box>
          )}
        </CheckoutContainer>
      </AuthLayout>
    )
  }

  return <CheckoutSkeletonloader />
}

Checkout.propTypes = {}

export default Checkout
