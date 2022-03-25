import { useEffect } from 'react'
import { Loading } from '@components/ui'
import { useBasket } from '@components/basket/BasketItem/context'
import useAuth from '@hooks/useAuth'

const OauthSignOut = () => {
  const auth = useAuth()

  const {
    actions: { reset },
  } = useBasket()

  const handleOauthSignout = async () => {
    // Clear session cookies & reset basket context
    auth.signOut(false)
    reset()
    // Do a server signout from IDP
    window.location.href = '/api/auth/federated-signout'
  }

  useEffect(() => {
    handleOauthSignout()
  }, [])

  return <Loading title="" />
}

export default OauthSignOut
