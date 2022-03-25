import * as React from 'react'
import getConfig from 'next/config'
import Document, { Html, Head, Main, NextScript } from 'next/document'
import { tabsResetIdCounter } from '@components/ui/Tabs/elements'
import createCache from '@emotion/cache'
import createEmotionServer from '@emotion/server/create-instance'

const { serverRuntimeConfig } = getConfig()

const createEmotionCache = () => {
  return createCache({ key: 'css', prepend: true })
}

export default class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const originalRenderPage = ctx.renderPage
    const { locale } = ctx

    // You can consider sharing the same emotion cache between all the SSR requests to speed up performance.
    // However, be aware that it can have global side effects.
    const cache = createEmotionCache()
    const { extractCriticalToChunks } = createEmotionServer(cache)

    ctx.renderPage = () =>
      originalRenderPage({
        enhanceApp: App => props => {
          tabsResetIdCounter()
          return <App emotionCache={cache} {...props} />
        },
      })

    const initialProps = await Document.getInitialProps(ctx)
    // This is important. It prevents emotion to render invalid HTML.
    // See https://github.com/mui-org/material-ui/issues/26561#issuecomment-855286153
    const emotionStyles = extractCriticalToChunks(initialProps.html)
    const emotionStyleTags = emotionStyles.styles.map(style => (
      <style
        data-emotion={`${style.key} ${style.ids.join(' ')}`}
        key={style.key}
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{ __html: style.css }}
      />
    ))

    return {
      ...initialProps,
      locale,
      // Styles fragment is rendered after the app and page rendering finish.
      styles: [...React.Children.toArray(initialProps.styles), ...emotionStyleTags],
    }
  }

  render() {
    const { locale } = this.props

    return (
      <Html lang={locale}>
        <Head>
          <meta charSet="utf-8" />
          <meta name="apple-mobile-web-app-capable" content="yes" />
          {serverRuntimeConfig.facebookDomainVerification && (
            <meta name="facebook-domain-verification" content={serverRuntimeConfig.facebookDomainVerification} />
          )}
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}
