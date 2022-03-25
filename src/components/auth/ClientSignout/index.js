import { useEffect } from 'react'
import { signOut } from 'next-auth/react'
import { Loading } from '@components/ui'
import { useBasket } from '@components/basket/BasketItem/context'
import useAuth from '@hooks/useAuth'

const ClientSignout = () => {
  const auth = useAuth()
  const {
    actions: { reset },
  } = useBasket()

  useEffect(() => {
    setTimeout(() => {
      // Clear session cookies & reset basket context
      auth.signOut(false)
      reset()

      // Do a client signout
      signOut({ callbackUrl: window.location.origin })
    }, 1000)
  }, [])

  return <Loading title="Signing out" />
}

export default ClientSignout
