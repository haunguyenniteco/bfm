import { useEffect } from 'react'
import { useRouter } from 'next/router'
import useAppState from '@hooks/useAppState'
import { AuthLayout, CheckoutContainer } from '@components/common'
import { useBasket } from '@components/basket/BasketItem/context'
import messages from '../messages'

function Payment() {
  const { intl } = useAppState()
  const router = useRouter()
  const {
    state: { order },
  } = useBasket()
  const checkoutUrl = order?.payment?.checkoutUrl

  useEffect(() => {
    if (checkoutUrl) {
      window.addEventListener('message', ev => {
        const message = ev?.data?.message
        if (!message) return
        if (typeof message.replace === 'function') {
          const returnUrl = message.replace(window.location.origin, '')
          router.replace(`${returnUrl}&success=1`)
        }
      })
    } else {
      router.replace('/')
    }
  }, [order])

  if (checkoutUrl) {
    return (
      <AuthLayout
        title={intl.formatMessage(messages.payment)}
        bg="white"
        allowCloseOption={false}
        allowBackOption={false}
      >
        <CheckoutContainer childrenStyles={{ padding: '8px 0' }} childrenContainerStyles={{ maxWidth: '500px' }}>
          <iframe
            title="Windcave"
            allowFullScreen
            style={{ border: 'unset', width: '100%', height: 'calc(100vh - 100px)' }}
            src={order.payment.checkoutUrl}
          />
        </CheckoutContainer>
      </AuthLayout>
    )
  }

  return null
}

Payment.propTypes = {}

export default Payment
