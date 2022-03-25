import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import persist from '@lib/persist'
import { Loading } from '@components/ui'

const withAuth = Component => {
  const AuthenticatedComponent = () => {
    const router = useRouter()
    const { asPath } = router
    const [state, setState] = useState()

    useEffect(() => {
      const getShopperSession = async () => {
        const session = await persist.getAccessToken()

        if (!session) {
          router.push(`/auth/signin?redirectUrl=${asPath}` || `/auth/signin`)
        } else {
          setState(session)
        }
      }
      getShopperSession()
    }, [])

    // eslint-disable-next-line no-extra-boolean-cast
    return !!state ? <Component data={state} /> : <Loading />
  }

  return AuthenticatedComponent
}

export default withAuth
