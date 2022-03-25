import { useRouter } from 'next/router'
import { useEffect } from 'react'
import useAppState from '@hooks/useAppState'
import Sticky from 'react-sticky-el'
import { FormattedMessage } from 'react-intl'
import { useOrder, useStoreInfo, useAmendOrder } from '@graphql-sdk'
import { useBasket } from '@components/basket/BasketItem/context'
import useChangeLanguage from '@hooks/useChangeLanguage'
import BasketSkeletonloader from '@components/basket/BasketSkeletonloader'
import { toast } from 'react-toastify'
import useSlotReservation from '@hooks/useSlotReservation'
import { CheckoutContainer, AuthLayout } from '@components/common'
import useToggle from '@hooks/useToggle'
import ComponentError from '@components/common/Error/ComponentError'
import { Divider } from 'src/components/ui/index'
import Button from 'src/components/ui/Button'
import Box from '@mui/material/Box'
import OrderDeliveryView from './views/OrderDeliveryView'
import OrderPriceSummaryView from './views/OrderPriceSummaryView'
import OrderProductsView from './views/OrderProductsView'
import OrderCancelView from './views/OrderCancelView'
import messages from '../messages'
import { OrderFormView } from './views/OrderFormView'
import OrderHeaderView from './views/OrderHeaderView'
import { amendOnlineOrderPayload, orderProductsPayload, orderStatusNotEditable, canReOrder } from '../methods'
import ReorderProductView from './views/ReorderView'

const MyOrder = () => {
  const { intl } = useAppState()

  const [modalVisible, toggleModal] = useToggle(false)
  const { storeId, isSignedIn, sessionUser, guestUserId } = useAppState()
  const router = useRouter()
  const amendOrderFn = useAmendOrder()
  const {
    state: {
      ready,
      items,
      amendmentId,
      shipping: { delivery, address },
    },
    actions: { setItems, setAmendmentId, clear, removeItem, removeItemNote },
  } = useBasket()
  const { locale } = useChangeLanguage()
  const { getReservedSlot } = useSlotReservation()

  const { orderId } = router.query
  const customerId = isSignedIn ? sessionUser.id : guestUserId

  const variables = {
    storeId,
    orderId,
    locale,
  }
  const { data: { storeInfo } = {} } = useStoreInfo({ storeId })
  const { data, loading, error, refetch } = useOrder(variables)
  const { order } = data || {}

  const startAmendOrder = async () => {
    clear()
    await setAmendmentId(orderId)
    await setItems(orderProductsPayload({ order }))
  }
  const submitAmendOrder = async ({ notes, email, phone }) => {
    try {
      const reservedSlot = getReservedSlot()
      const input = amendOnlineOrderPayload({
        order,
        storeInfo,
        email,
        phone,
        notes,
        reservedSlot,
        address,
        delivery,
        items,
      })
      await amendOrderFn({
        customerId,
        orderId,
        input,
      })
      setAmendmentId(null)

      clear()
      toast.info(intl.formatMessage(messages.success_amend))
    } catch (err) {
      toast.error(<FormattedMessage {...messages.failure} />, { autoClose: 10000 })
      console.log(err)
    }
  }

  // TODO: Handle refetch with apollo defaultOptions
  useEffect(() => {
    if (order) {
      refetch()
    }
  }, [amendmentId])

  if (error) {
    return (
      <AuthLayout allowBackOption={false}>
        <ComponentError />
      </AuthLayout>
    )
  }

  if (loading) {
    return <BasketSkeletonloader />
  }

  return (
    <AuthLayout
      title={`${
        amendmentId ? intl.formatMessage(messages.orderAmendmentTitle) : intl.formatMessage(messages.orderTitle)
      } ${order.visibleId}`}
      amendMode={amendmentId}
      allowBackOption={!amendmentId}
      allowCloseOption={!amendmentId}
      color={amendmentId ? 'primary' : ''}
    >
      <OrderCancelView
        show={modalVisible}
        order={order}
        customerId={customerId}
        toggleModal={() => {
          toggleModal()
        }}
      />
      <CheckoutContainer
        headerComponent={
          <>
            <OrderHeaderView order={order} />
            <Divider />
            <OrderDeliveryView
              order={order}
              orderId={orderId}
              delivery={delivery}
              address={address}
              storeInfo={storeInfo}
              editableMode={amendmentId}
            />
            <Divider />
            <OrderPriceSummaryView order={order} amendmentId={amendmentId} />
          </>
        }
        footerComponent={
          <>
            <OrderProductsView
              order={order}
              items={items}
              amendmentId={amendmentId}
              removeItem={removeItem}
              removeItemNote={removeItemNote}
            />
            <OrderFormView
              order={order}
              amendmentId={amendmentId}
              setAmendmentId={setAmendmentId}
              submitAmendOrder={submitAmendOrder}
            >
              {!orderStatusNotEditable.includes(order.status) && !amendmentId && (
                <Sticky mode="bottom" dontUpdateHolderHeightWhenSticky>
                  <Box sx={{ backgroundColor: 'G3', pt: 3 }}>
                    <Button
                      sx={{ mb: 2 }}
                      fullWidth
                      color="inherit"
                      data-cy="cancel-order"
                      onClick={() => {
                        toggleModal()
                      }}
                    >
                      {intl.formatMessage(messages.cancelOrder)}
                    </Button>
                    <Button fullWidth data-cy="amend-order" onClick={startAmendOrder} disabled={!ready}>
                      {intl.formatMessage(messages.amendOrder)}
                    </Button>
                  </Box>
                </Sticky>
              )}

              {canReOrder.includes(order.status) && (
                <Sticky mode="bottom" dontUpdateHolderHeightWhenSticky>
                  <Box sx={{ backgroundColor: 'G3', pt: 3 }}>
                    <ReorderProductView order={order} />
                  </Box>
                </Sticky>
              )}
            </OrderFormView>
          </>
        }
      />
    </AuthLayout>
  )
}

export default MyOrder
