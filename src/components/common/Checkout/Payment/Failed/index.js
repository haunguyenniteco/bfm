import { useEffect } from 'react'
import { useRouter } from 'next/router'
import useAppState from '@hooks/useAppState'
import useSlotReservation from '@hooks/useSlotReservation'
import Typography from '@mui/material/Typography'
import Grid from '@mui/material/Grid'
import Link from 'next/link'
import Button from '@components/ui/Button'
import { AuthLayout, CheckoutContainer } from '@components/common'
import ErrorIcon from '@mui/icons-material/Error'
import messages from '../../messages'

function PaymentFailed() {
  const { intl } = useAppState()
  const router = useRouter()
  const { refreshSlotReservationToken } = useSlotReservation()
  const { success } = router.query

  useEffect(() => {
    if (!success) {
      window.parent.postMessage(
        {
          message: window.location.href,
        },
        '*',
      )
    } else {
      refreshSlotReservationToken()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [success])

  return (
    <AuthLayout
      title={intl.formatMessage(messages.payment)}
      bg="white"
      allowCloseOption={false}
      allowBackOption={false}
    >
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
            <ErrorIcon color="error" sx={{ fontSize: 48 }} />
            <Typography fontWeight="600" color="error" fontSize={16} mt={1}>
              Transaction failed
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

PaymentFailed.propTypes = {}

export default PaymentFailed
