import getProductTrackingData from './utils/getProductTrackingData'
import getBasketTrackingData from './utils/getBasketTrackingData'

const ProductRemovedEvent = data => {
  let trackingData = {}

  const {
    pageProps: {
      router: { asPath },
    },
    product,
    page,
    quantity,
    isBasket,
  } = data

  if (product) {
    trackingData = {
      event: data.event,
      eventAction: 'Remove from basket',
      eventCategory: 'Ecommerce',
      eventLabel: product.gtin || '',
      eventValue: product.length,
      eventPath: asPath,
      ecommerce: {
        currencyCode: data.currencyCode,
        remove: {
          actionField: {
            list: page,
            products: isBasket
              ? [...getBasketTrackingData({ products: product, position: 1, path: asPath, quantity })]
              : [getProductTrackingData({ ...product, position: 1, path: asPath, quantity })],
          },
        },
      },
    }
  }

  return trackingData
}

export default ProductRemovedEvent
