import getProductTrackingData from './utils/getProductTrackingData'

const ProductAddedEvent = data => {
  let trackingData = {}
  const { pageProps, product, page, quantity } = data

  const { asPath } = pageProps.router ? pageProps.router : pageProps

  if (product) {
    trackingData = {
      event: data.event,
      eventAction: 'Add to basket',
      eventCategory: 'Ecommerce',
      eventLabel: product.gtin,
      eventValue: product.prices?.clicksUnitPrice || product.clicksUnitPrice,
      eventPath: asPath,
      ecommerce: {
        currencyCode: data.currencyCode,
        add: {
          actionField: {
            list: page,
            products: [getProductTrackingData({ ...product, position: 1, path: asPath, quantity })],
          },
        },
      },
    }
  }

  return trackingData
}

export default ProductAddedEvent
