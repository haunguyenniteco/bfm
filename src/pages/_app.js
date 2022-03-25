import Head from 'next/head'
import App from 'next/app'
import { useEffect } from 'react'
import getConfig from 'next/config'
import { AnalyticsManager, CookieConsent } from '@components/common/Tracking'
import { withApollo } from '@lib/apollo'
import { SessionProvider } from 'next-auth/react'
import { AppDataProvider } from '@components/common/AppDataProvider'
import { getStoreContextId, getAppUrl, getUserAgent } from '@lib/helpers'
import DefaultLayout from '@components/common/Layout'
import createCache from '@emotion/cache'
import { CacheProvider } from '@emotion/react'
import '../theming/css/styles.scss'

const { publicRuntimeConfig = {} } = getConfig() || {}
const providers = [{ name: 'google', key: publicRuntimeConfig.gtmKey, currencyCode: 'AUD' }]
const isDev = process.env.NODE_ENV !== 'production'

const Noop = ({ children }) => children

const createEmotionCache = () => {
  return createCache({ key: 'css', prepend: true })
}
const clientSideEmotionCache = createEmotionCache()

function AppRoot({ Component, emotionCache = clientSideEmotionCache, pageProps, router, ...appProps }) {
  const { hasDefaultLayout = true } = Component
  const Layout = hasDefaultLayout ? DefaultLayout : Noop

  useEffect(() => {
    AnalyticsManager.configure(providers, isDev)
  }, [])

  return (
    <>
      <Head>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
      </Head>
      {/* #TODO: Change cluster to "production" when we have a prod env */}
      {publicRuntimeConfig.clusterName === 'staging' && <CookieConsent />}
      {/* Comment out the line above when CookieConsent is not supported */}
      <CacheProvider value={emotionCache}>
        <SessionProvider session={pageProps.session} refetchInterval={0}>
          <AppDataProvider {...appProps} router={router}>
            <Layout>
              <Component {...pageProps} router={router} />
            </Layout>
          </AppDataProvider>
        </SessionProvider>
      </CacheProvider>
    </>
  )
}

AppRoot.getInitialProps = async appContext => {
  const { ctx } = appContext
  const userAgent = getUserAgent(ctx.req)
  const appHost = getAppUrl(ctx.req)
  const storeId = getStoreContextId(ctx.req)

  ctx.userAgent = userAgent
  ctx.storeContextId = storeId

  let localeData = {}

  if (!process.browser) {
    const { loadLocaleData } = await import('@lib/i18n')
    localeData = await loadLocaleData(ctx)
  } else {
    // eslint-disable-next-line no-underscore-dangle
    localeData = window.__NEXT_DATA__.props.localeData
  }
  // calls page's `getInitialProps` and fills `appProps.pageProps`
  const appProps = await App.getInitialProps(appContext)

  return { userAgent, appHost, storeId, localeData, ...appProps }
}

export default withApollo({ ssr: true })(AppRoot)
