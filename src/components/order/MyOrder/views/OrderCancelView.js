import { useRouter } from 'next/router'
import useAppState from '@hooks/useAppState'
import { useCancelOrder } from '@graphql-sdk'
import { FormattedMessage } from 'react-intl'
import { Modal } from '@components/ui'
import { toast } from 'react-toastify'
import Button from '@components/ui/Button'
import Typography from '@components/ui/Typography/index'
import Box from '@mui/material/Box'
import Stack from '@mui/material/Stack'
import messages from '../../messages'

const ModalStyles = {
  content: {
    maxWidth: '425px',
    width: '100%',
    margin: '0',
    padding: '0',
    borderRadius: 15,
  },
}

const OrderCancelView = ({ order, show, toggleModal, customerId }) => {
  const { intl } = useAppState()
  const router = useRouter()
  const { query } = router
  const { orderId } = query
  const variables = {
    customerId,
    orderId,
  }

  const cancelOrderFn = useCancelOrder()

  const handleCancelOrder = async () => {
    try {
      await cancelOrderFn(variables)
      toggleModal()
      toast.info(intl.formatMessage(messages.success_cancel))
      await router.replace(`/orders/${orderId}`, undefined, { scroll: true })
      router.reload()
    } catch (err) {
      toggleModal()
      toast.error(<FormattedMessage {...messages.failure} />, { autoClose: 10000 })
      console.log(err)
    }
  }

  return (
    <Modal isOpen={show} hasClose={false} style={ModalStyles}>
      <Box m={10} data-cy="modal">
        <Typography variant="h2" data-cy="modal-title" sx={{ p: 4, textAlign: 'center' }}>
          {intl.formatMessage(messages.cancelOrder)}&nbsp; #{order.visibleId}
        </Typography>

        <Stack direction="row" spacing={2}>
          <Button variant="outlined" onClick={toggleModal} data-cy="modal-exit-action" fullWidth>
            {intl.formatMessage(messages.exitAction)}
          </Button>
          <Button onClick={handleCancelOrder} data-cy="modal-confirm-action" fullWidth>
            {intl.formatMessage(messages.confirmAction)}
          </Button>
        </Stack>
      </Box>
    </Modal>
  )
}

OrderCancelView.prototype = {}

export default OrderCancelView
