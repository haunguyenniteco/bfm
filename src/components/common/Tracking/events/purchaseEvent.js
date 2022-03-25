import getBasketTrackingData from './utils/getBasketTrackingData'

const PurchaseEvent = data => {
  let trackingData = {}
  const { pageProps, products, quantity, id, affiliation, revenue, tax, shipping, coupon } = data

  const { asPath } = pageProps.router ? pageProps.router : pageProps

  if (products) {
    trackingData = {
      event: data.event,
      eventAction: 'Purchase',
      eventCategory: 'Ecommerce',
      eventPath: asPath,
      ecommerce: {
        purchase: {
          actionField: {
            id,
            affiliation,
            revenue,
            tax,
            shipping,
            coupon: coupon || '',
          },
          products: [...getBasketTrackingData({ products, position: 1, path: asPath, quantity })],
        },
      },
    }
  }
  return trackingData
}

export default PurchaseEvent
