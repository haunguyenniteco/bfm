import { useCallback } from 'react'
import persist from '@lib/persist'
import { FormattedMessage } from 'react-intl'
import { useRouter } from 'next/router'
import useAppState from '@hooks/useAppState'
import { useBasket } from '@components/basket/BasketItem/context'
import { AuthLayout, CheckoutContainer } from '@components/common'
import Typography from '@mui/material/Typography'
import messages from './messages'
import AddressSearch from './AddressSearch'

function AddressValidation() {
  const { intl } = useAppState()
  const router = useRouter()
  const {
    actions: { setAddress },
  } = useBasket()

  const handleOnClose = () => {
    persist.skipOnboarding()
  }

  const handleAddressSelect = useCallback(addressData => {
    setAddress(addressData)
    const redirectUrl = router.query && router.query.redirectUrl
    const hasRedirectUrl = typeof redirectUrl === 'string'
    router.push(`/select-store${hasRedirectUrl ? `?redirectUrl=${redirectUrl}` : ''}`)
  }, [])

  return (
    <AuthLayout onClose={handleOnClose} seoTitle={intl.formatMessage(messages.pageTitle)} allowBackOption={false}>
      <CheckoutContainer
        headerComponent={
          <Typography variant="h1" data-cy="header-title">
            <FormattedMessage {...messages.headerTitle} />
          </Typography>
        }
        footerComponent={
          <>
            <AddressSearch onSelect={handleAddressSelect} />
          </>
        }
      >
        <Typography variant="body1">
          <FormattedMessage {...messages.enterAddress} />
        </Typography>
      </CheckoutContainer>
    </AuthLayout>
  )
}

AddressValidation.propTypes = {}

export default AddressValidation
