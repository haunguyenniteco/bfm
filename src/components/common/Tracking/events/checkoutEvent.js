import getBasketTrackingData from './utils/getBasketTrackingData'

const CheckoutEvent = data => {
  let trackingData = {}
  const { pageProps, products, quantity, step, option } = data

  const { asPath } = pageProps.router ? pageProps.router : pageProps

  if (products) {
    trackingData = {
      event: data.event,
      eventAction: 'Checkout',
      eventCategory: 'Ecommerce',
      eventPath: asPath,
      ecommerce: {
        checkout: {
          actionField: {
            step,
            option,
          },
          products: [...getBasketTrackingData({ products, position: 1, path: asPath, quantity })],
        },
      },
    }
  }
  return trackingData
}

export default CheckoutEvent
