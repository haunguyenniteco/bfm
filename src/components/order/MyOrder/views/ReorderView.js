import * as React from 'react'
import { useRouter } from 'next/router'
import Button from 'src/components/ui/Button'
import { toast } from 'react-toastify'
import useAppState from '@hooks/useAppState'
import Dialog from '@mui/material/Dialog'
import Typography from '@mui/material/Typography'
import { useBasket } from '@components/basket/BasketItem/context'
import Slide from '@mui/material/Slide'
import { FormattedMessage } from 'react-intl'
import { AuthLayout, CheckoutContainer } from '@components/common'
import { orderProductsPayload } from '../../methods'
import messages from '../../messages'

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />
})

const ReorderProductView = ({ order }) => {
  const [open, setOpen] = React.useState(false)
  const { intl } = useAppState()
  const router = useRouter()

  const {
    state: { ready },
    actions: { setItems, clear },
  } = useBasket()

  const handleClickOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }
  const handleReOrder = async () => {
    try {
      await clear()
      await setItems(orderProductsPayload({ order }))
      toast.info(<FormattedMessage {...messages.reOrderNotification} />)
      if (ready) router.replace('/basket')
    } catch (error) {
      toast.error(<FormattedMessage {...messages.errorMessage} />)
      console.log(error)
    }
  }

  return (
    <>
      <Button fullWidth data-cy="re-order" onClick={handleClickOpen}>
        <FormattedMessage {...messages.reOrderTitle} />
      </Button>
      <Dialog fullScreen open={open} onClose={handleClose} TransitionComponent={Transition}>
        <AuthLayout title={`${intl.formatMessage(messages.orderTitle)} ${order?.id}`}>
          <CheckoutContainer
            headerComponent={
              <Typography variant="h1" data-cy="header-title">
                <FormattedMessage {...messages.reOrderTitle} />
              </Typography>
            }
            footerComponent={
              <>
                <Typography variant="body1" data-cy="header-title" pb={5}>
                  <FormattedMessage {...messages.reOrderMessage} />
                </Typography>
                <Button fullWidth variant="contained" onClick={handleReOrder}>
                  <FormattedMessage {...messages.reOrderAction} />
                </Button>
              </>
            }
          />
        </AuthLayout>
      </Dialog>
    </>
  )
}

export default ReorderProductView
