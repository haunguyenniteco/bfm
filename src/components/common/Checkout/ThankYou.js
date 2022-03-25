import { useEffect } from 'react'
import { useFinalizeOrder } from '@graphql-sdk'
import useSlotReservation from '@hooks/useSlotReservation'
import useAppState from '@hooks/useAppState'
import { useBasket } from '@components/basket/BasketItem/context'
import Typography from '@mui/material/Typography'
import Grid from '@mui/material/Grid'
import Link from 'next/link'
import Button from '@components/ui/Button'
import { AuthLayout, CheckoutContainer } from '@components/common'
import ErrorIcon from '@mui/icons-material/Error'
import messages from './messages'

function ThankYou() {
  const { intl } = useAppState()
  const finalizeOrder = useFinalizeOrder()
  const { clearSlot } = useSlotReservation()
  const {
    state: { order },
    actions: { clearBasketAndSlots },
  } = useBasket()

  const onFinalizeOrder = async () => {
    if (order?.id) {
      try {
        await finalizeOrder({ orderId: order.id })
        clearBasketAndSlots()
        clearSlot()
      } catch (err) {
        console.error(JSON.stringify(err))
      }
    }
  }

  useEffect(() => {
    onFinalizeOrder()
  }, [order])

  return (
    <AuthLayout title={intl.formatMessage(messages.payment)} bg="white">
      <CheckoutContainer>
        <Grid container spacing={3} pt={5}>
          <Grid
            item
            xs={12}
            display="flex"
            flexDirection="column"
            alignContent="center"
            flexWrap="nowrap"
            alignItems="center"
            justifyContent="center"
          >
            <ErrorIcon sx={{ color: '#4caf50', fontSize: 48 }} />
            <Typography fontWeight="600" color="#4caf50" fontSize={16} mt={1}>
              Transaction Approved
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Link href="/" passHref>
              <Button fullWidth component="a">
                Next
              </Button>
            </Link>
          </Grid>
        </Grid>
      </CheckoutContainer>
    </AuthLayout>
  )
}

ThankYou.propTypes = {}

export default ThankYou
