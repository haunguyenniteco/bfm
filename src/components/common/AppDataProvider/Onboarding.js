import { useEffect } from 'react'
import { useRouter } from 'next/router'
import persist from '@lib/persist'
import { useIsSignedIn } from '@graphql-sdk/react/queries'
import { CUSTOMER_CACHE_KEY, GUEST_CACHE_KEY, retrieveBasketFromCache } from '@components/basket/BasketItem/cache'

const SKIP_ONBOARDING_URLS = ['/orders', '/auth', '/get-address', '/select-store', '/profile']

const Onboarding = () => {
  const { pathname, replace } = useRouter()
  const skipOnboarding = persist.getSkipOnboarding()
  const { data: { isSignedIn } = {} } = useIsSignedIn()

  useEffect(() => {
    // as we need to wait after basket context will update local storage we need to wait one full cycle
    // if not we will be redirected twice
    setTimeout(async () => {
      const basket = await retrieveBasketFromCache(isSignedIn ? CUSTOMER_CACHE_KEY : GUEST_CACHE_KEY)
      const delivery = basket?.shipping?.delivery
      if (delivery || skipOnboarding) {
        return
      }
      if (SKIP_ONBOARDING_URLS.some(url => pathname.includes(url))) {
        return
      }
      replace('/get-address')
    })
  }, [isSignedIn, pathname, replace, skipOnboarding])
  return null
}

export default Onboarding
