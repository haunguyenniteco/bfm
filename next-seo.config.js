import getConfig from 'next/config'

const { publicRuntimeConfig = {} } = getConfig() || {}

export default {
  titleTemplate: `%s | ${publicRuntimeConfig.brand}`,
  description: 'E-commerce storefront',
  openGraph: {
    type: 'website',
    locale: 'en_IE',
    site_name: 'SiteName',
  },
  twitter: {
    handle: '@handle',
    site: '@site',
    cardType: 'summary_large_image',
  },
}
