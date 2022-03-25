import { useEffect } from 'react'
import { DefaultSeo } from 'next-seo'
import dynamic from 'next/dynamic'
import { Toast, NProgress } from '@components/ui'
import { InjectBasket, LanguageProvider, QueryProvider } from '@components/common'
import { BasketProvider } from '@components/basket/BasketItem/context'
import { useIntl } from 'react-intl'
import { useIsSignedIn, useUserDetails, useStoreInfo, useSigninGuest } from '@graphql-sdk'
import { AnalyticsProvider } from '@components/common/Tracking'
import useAuthSync from '@hooks/useAuthSync'
import useAuth from '@hooks/useAuth'
import { useSession, signIn } from 'next-auth/react'
import { AppContextProvider } from '@components/common/AppContext'
import { createId } from '@lib/helpers'
import persist from '@lib/persist'
import MaterialProvider from '@theming/Provider'
import SEO from '../../../../next-seo.config'

const ConnectivityListener = dynamic(() => import('@components/common/ConnectivityListener'), { ssr: false })

const AuthIntlWorkerSyncProvider = ({ children }) => {
  useAuthSync()
  const intl = useIntl()
  return children(intl)
}

export const AppDataProvider = ({ children, ...pageProps }) => {
  const { storeId, appHost, userAgent, router, localeData } = pageProps
  const guestToken = persist.getGuestAccessToken()
  const shopperToken = persist.getAccessToken()

  const signinGuest = useSigninGuest()
  const auth = useAuth()

  const { data: session } = useSession()

  const { data: { isSignedIn } = {}, loading: isSignedInLoading } = useIsSignedIn()
  const { data: { currentCustomer = {} } = {}, loading, error } = useUserDetails({ skip: !isSignedIn || !!guestToken })
  const { data: { storeInfo } = {} } = useStoreInfo({ storeId })

  const sessionUser = { ...currentCustomer, loading, error }
  const { q: queryString, categoryId: selectedCategoryId } = router.query
  const { customerId: guestUserId } = (!isSignedIn && guestToken && JSON.parse(guestToken)) || {}

  const basketOptions = {
    storeInfo,
    sessionUser,
    freeShippingMinimumPurchaseAmount: 60,
    deliveryTypeToApplyFreeShipping: 'standard',
    alwaysValidate: true, // Set to false to disable inventory service validation
    isSignedIn,
    guestUserId,
  }

  const doGuestSignin = async () => {
    const {
      data: { signinGuest: authData },
    } = await signinGuest({ customerId: createId() }, { skip: isSignedInLoading || isSignedIn })

    if (authData) {
      auth.signInGuest(authData)
    }
  }

  useEffect(() => {
    if (!isSignedIn && !shopperToken && !guestToken) {
      doGuestSignin()
    }
    // Ensures no guestToken when userSession is active
    if ((isSignedIn || shopperToken) && guestToken) {
      persist.deleteGuestAccessToken()
    }
  }, [isSignedIn, shopperToken, guestToken])

  // In the scenario that refresh token should fail
  useEffect(() => {
    if (shopperToken && session?.error === 'RefreshAccessTokenError') {
      persist.deleteAccessToken()
      // Force sign out // Force sign in to hopefully resolve error
      signIn('azure-ad-b2c', { callbackUrl: `${process.env.NEXTAUTH_URL}/auth/signin` })
    }
  }, [session, shopperToken])

  return (
    <LanguageProvider localeData={localeData}>
      <MaterialProvider>
        <QueryProvider>
          <AnalyticsProvider userAgent={userAgent}>
            <AuthIntlWorkerSyncProvider>
              {intl => (
                <AppContextProvider
                  value={{
                    intl,
                    router,
                    appHost,
                    storeId,
                    userAgent,
                    sessionUser,
                    isSignedIn,
                    storeInfo,
                    queryString,
                    guestUserId,
                    selectedCategoryId,
                  }}
                >
                  <InjectBasket>
                    {({ initializeBasket, validateBasket, clearBasket }) => (
                      <BasketProvider
                        onClearBasket={clearBasket}
                        onInit={initializeBasket}
                        onValidate={validateBasket}
                        {...basketOptions}
                      >
                        <DefaultSeo {...SEO} />
                        <NProgress />
                        <ConnectivityListener />
                        {children}
                      </BasketProvider>
                    )}
                  </InjectBasket>
                </AppContextProvider>
              )}
            </AuthIntlWorkerSyncProvider>
          </AnalyticsProvider>
          <Toast />
        </QueryProvider>
      </MaterialProvider>
    </LanguageProvider>
  )
}

export default AppDataProvider
