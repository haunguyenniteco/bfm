import { useState, useEffect, useMemo } from 'react'
import { useRouter } from 'next/router'
import { FormattedMessage } from 'react-intl'
import Sticky from 'react-sticky-el'
import useAppState from '@hooks/useAppState'
import { useStoreInfo } from '@graphql-sdk'
import useSlotReservation from '@hooks/useSlotReservation'
import { joinStrings, getType, isDelivery, isPickup } from '@lib/helpers'
import persist from '@lib/persist'
import { AuthLayout, CheckoutContainer } from '@components/common'
import { useBasket } from '@components/basket/BasketItem/context'
import Button from '@components/ui/Button'
import Box from '@mui/material/Box'
import handleFormErrors from '@lib/handleFormErrors'
import Typography from '@components/ui/Typography'
import SelectSlotSkeletonloader from './SelectSlotSkeletonloader'
import SlotCalender from './SlotCalender'
import PickupSlots from './PickupSlots'
import DeliverySlots from './DeliverySlots'
import SlotAddress from './SlotAddress'

import messages from './messages'

function SlotSelection() {
  const [errors, setErrors] = useState(false)
  const [selected, setSelected] = useState(null)
  const [selectedDate, setSelectedDate] = useState(null)
  const [dateRange, setDateRange] = useState(null)
  const { intl } = useAppState()
  const router = useRouter()
  const { reserveSlot } = useSlotReservation()

  const {
    state: {
      ready,
      shipping: { delivery, address },
    },
    actions: { setDelivery },
  } = useBasket()

  const { data: { storeInfo } = {}, loading } = useStoreInfo(
    { storeId: delivery?.store?.placeId },
    { skip: !ready || isDelivery(delivery?.type) },
  )

  const handleSlotSelect = slot => {
    setSelected(slot)
  }

  const handleContinue = async () => {
    try {
      persist.skipOnboarding()
      const enrichedSlotData = {
        ...delivery,
        slot: { ...selected, date: selectedDate },
      }
      setDelivery(enrichedSlotData)
      await reserveSlot(enrichedSlotData)
      const redirectUrl = router.query && router.query.redirectUrl
      const hasRedirectUrl = typeof redirectUrl === 'string'
      if (hasRedirectUrl) {
        router.replace(redirectUrl)
      } else {
        const href = '/'
        router.replace(href)
      }
    } catch ({ graphQLErrors }) {
      handleFormErrors(graphQLErrors, setErrors)
      // eslint-disable-next-line no-alert
      window.alert(intl.formatMessage(messages.unavailableSlot))
      console.debug(errors)
    }
  }

  const pickupSlots = useMemo(
    () => (
      <PickupSlots
        placeId={storeInfo?.id}
        dateRange={dateRange}
        selected={selected}
        selectedDate={selectedDate}
        onSelect={handleSlotSelect}
        store={delivery?.store}
        type={delivery?.type}
      />
    ),
    [dateRange, selected, selectedDate, delivery],
  )

  const deliverySlots = useMemo(
    () => (
      <DeliverySlots
        dateRange={dateRange}
        selected={selected}
        selectedDate={selectedDate}
        onSelect={handleSlotSelect}
        store={delivery?.store}
        type={delivery?.type}
        address={address}
      />
    ),
    [dateRange, selected, selectedDate, delivery, address],
  )

  useEffect(() => {
    if (ready && !delivery) {
      router.replace('/select-store')
    }
  }, [ready, delivery])

  if (!ready || loading) return <SelectSlotSkeletonloader />

  let addressLine
  if (isPickup(delivery?.type)) {
    const { store } = delivery
    addressLine = joinStrings(store.street, store.postcode, store.city)
  } else if (isDelivery(delivery?.type)) {
    addressLine = address?.formattedAddress
  }

  return (
    <AuthLayout seoTitle={intl.formatMessage(messages.pageTitle)}>
      <CheckoutContainer
        headerComponent={
          <>
            {delivery && addressLine && (
              <Box pt="24px">
                <Typography variant="h1">
                  <FormattedMessage {...messages[`${getType(delivery.type)}Time`]} />
                </Typography>

                <SlotAddress delivery={delivery} addressLine={addressLine} />

                <SlotCalender onDateRangeChange={setDateRange} onDateChange={setSelectedDate} />
              </Box>
            )}
          </>
        }
        footerComponent={
          <>
            {isPickup(delivery?.type) && <>{pickupSlots}</>}
            {isDelivery(delivery?.type) && <>{deliverySlots}</>}

            {selected && (
              <Sticky mode="bottom" dontUpdateHolderHeightWhenSticky>
                <Box sx={{ py: 2 }}>
                  <Button fullWidth type="button" onClick={handleContinue} data-cy="continue">
                    <FormattedMessage {...messages.continue} />
                  </Button>
                </Box>
              </Sticky>
            )}
          </>
        }
      />
    </AuthLayout>
  )
}

SlotSelection.propTypes = {}

export default SlotSelection
