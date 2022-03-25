import { useEffect } from 'react'
import Link from 'next/link'
import Box from '@mui/material/Box'
import { AuthLayout, CheckoutContainer } from '@components/common'
import useAppState from '@hooks/useAppState'
import BlockIcon from '@mui/icons-material/Block'
import Typography from '@components/ui/Typography'
import persist from '@lib/persist'
import Button from '@components/ui/Button'
import { useBasket } from '@components/basket/BasketItem/context'
import { FormattedMessage } from 'react-intl'
import messages from './messages'

const NoServiceFound = ({ hasDeliveryOrPickup }) => {
  const {
    actions: { reset, clear },
  } = useBasket()

  const { intl } = useAppState()

  // reset() to reset the whole basket context if a wrong or unavailable location is captured
  // clear() to remove shopping-list after reset
  // persist.deleteStoreId() is to ensure that a new store is explicitly selected on retry
  // persist.deleteSkipOnboarding() ensure that a user forced to enter a new address is previous one is not found
  // TODO: Improve and combine reset condition

  useEffect(() => {
    if (!hasDeliveryOrPickup) {
      reset()
      clear()
      persist.deleteStoreId()
      persist.deleteSkipOnboarding()
    }
  }, [hasDeliveryOrPickup])

  return (
    <AuthLayout seoTitle={intl.formatMessage(messages.noService)} allowBackOption={false}>
      <CheckoutContainer
        headerComponent={
          <>
            <Typography variant="h1" py="24px" align="center">
              <FormattedMessage {...messages.noService} />
            </Typography>
            <Typography variant="body1" py="24px" align="left">
              <FormattedMessage {...messages.noServiceDetails} />
            </Typography>
            <Box textAlign="center">
              <BlockIcon sx={{ fontSize: 100 }} />
            </Box>
          </>
        }
        footerComponent={
          <Box display="flex" flexDirection="column" alignItems="center">
            <Link href="/get-address" passHref>
              <Button variant="text">
                <FormattedMessage {...messages.noServiceAction} />
              </Button>
            </Link>
          </Box>
        }
      />
    </AuthLayout>
  )
}

export default NoServiceFound
