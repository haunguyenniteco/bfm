import getProductTrackingData from './utils/getProductTrackingData'

const ProductClickEvent = data => {
  let trackingData = {}
  const {
    pageProps: {
      router: { asPath },
    },
    product,
    page,
  } = data

  if (product) {
    trackingData = {
      event: data.event,
      eventAction: 'Product Click',
      eventCategory: 'Ecommerce',
      eventLabel: product.gtin,
      eventValue: product.prices.clicksUnitPrice,
      eventPath: asPath,
      ecommerce: {
        currencyCode: data.currencyCode,
        click: {
          actionField: {
            list: page,
            products: [getProductTrackingData({ ...product, position: 1, path: asPath })],
          },
        },
      },
    }
  }

  return trackingData
}

export default ProductClickEvent
