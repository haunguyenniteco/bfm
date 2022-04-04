import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import { FormattedMessage } from 'react-intl'
import Sticky from 'react-sticky-el'
import { usePlacesForPickupAndDeliveries } from '@graphql-sdk'
import { AuthLayout, CheckoutContainer } from '@components/common'
import { useBasket } from '@components/basket/BasketItem/context'
import Box from '@mui/material/Box'
import useAppState from '@hooks/useAppState'
import persist from '@lib/persist'
import Button from '@components/ui/Button'
import Typography from '@components/ui/Typography'
import StoreLists from './StoreLists'
import NoServiceFound from './NoServiceFound'
import ConfirmationDialog from './ConfirmationDialog'
import SelectStoreSkeletonloader from './SelectStoreSkeletonloader'
import messages from './messages'

const StoreSelection = () => {
  const [selectedType, setSelectedType] = useState(0)
  const [selected, setSelected] = useState(null)
  const [confirmOpen, setConfirmOpen] = useState(false)

  const { intl } = useAppState()
  const router = useRouter()
  const {
    state: {
      ready,
      requireAgeConfirmation,
      shipping: { address, delivery },
    },
    actions: { setDelivery, clear },
  } = useBasket()

  const { data: { placesForPickupAndDeliveries: { pickups = [], deliveries = [] } = {} } = {}, loading } =
    usePlacesForPickupAndDeliveries(
      {
        input: { latitude: address?.lat, longitude: address?.lon },
      },
      { skip: !ready || !address },
    )

  const handleSelected = place => setSelected(place)
  // const handleTabSelect = (event, newValue) => setSelectedType(newValue)

  const handleContinue = async event => {
    setDelivery({ store: selected, type: selectedType === 0 ? 'delivery' : 'pickup' })
    persist.setStoreId(selected?.placeId)
    persist.skipOnboarding()
    const redirectUrl = router.query && router.query.redirectUrl
    const hasRedirectUrl = typeof redirectUrl === 'string'
    const sameStore = selected.id === delivery?.store.id
    // clear basket item if store is selected and change
    if (delivery?.store?.id && !sameStore) {
      clear()
    }
    // Skip slot selection and continue to initial page
    if (event.target.id === 'continue') {
      return router.push(`${hasRedirectUrl ? `${redirectUrl}` : '/'}`)
    }
    // Continue to slot selection
    router.push(`/select-slot${hasRedirectUrl ? `?redirectUrl=${redirectUrl}` : ''}`)
  }

  const handleContinueFlow = event => {
    if (requireAgeConfirmation) {
      setConfirmOpen(true)
    } else {
      handleContinue(event)
    }
  }

  const hasDeliveryOrPickup = deliveries?.[0] || pickups?.[0]

  useEffect(() => {
    if (ready && !address) {
      router.replace('/get-address')
    }
  }, [ready])

  useEffect(() => {
    if (ready && hasDeliveryOrPickup) {
      if (delivery) {
        setSelected(delivery.store)
      }
      setSelectedType(deliveries?.[0] ? 0 : 1)
    }
  }, [deliveries, delivery, hasDeliveryOrPickup, pickups, ready])

  if (!ready || loading) return <SelectStoreSkeletonloader />

  if (ready && !hasDeliveryOrPickup) return <NoServiceFound hasDeliveryOrPickup={hasDeliveryOrPickup} />

  return (
    <AuthLayout
      seoTitle={intl.formatMessage(messages.pageTitle)}
      allowBackOption={!!hasDeliveryOrPickup}
      allowCloseOption={false}
    >
      <ConfirmationDialog open={confirmOpen} setOpen={setConfirmOpen} onConfirm={handleContinue} />
      <CheckoutContainer
        footerStyles={{ paddingTop: 0 }}
        footerComponent={
          <Sticky mode="bottom" dontUpdateHolderHeightWhenSticky>
            <Box sx={{ backgroundColor: '#ffffff', pb: 1 }}>
              <Button
                id="continue"
                variant="contained"
                fullWidth
                onClick={handleContinueFlow}
                data-cy="continue"
                disabled={!selected}
              >
                <FormattedMessage {...messages.continue} />
              </Button>
            </Box>
          </Sticky>
        }
      >
        <Typography variant="h1" pb="40px">
          {intl.formatMessage(messages.pageTitle)}
        </Typography>
        <StoreLists places={pickups} onSelect={handleSelected} selected={selected} />
      </CheckoutContainer>
    </AuthLayout>
  )
}

StoreSelection.propTypes = {}

export default StoreSelection
