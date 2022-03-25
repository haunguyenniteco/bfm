import getProductListTrackingData from './utils/getProductListTrackingData'

const ProductListViewEvent = data => {
  const { eventCategory, eventAction, products, eventPath, eventLabel, eventValue } = getProductListTrackingData(data)
  return {
    event: data.event,
    eventCategory,
    eventAction,
    eventLabel,
    eventValue, // number of products in a user’s viewport
    eventPath,
    ecommerce: {
      currencyCode: data.currencyCode, // Local currency is optional.
      impressions: [...products],
    },
  }
}

export default ProductListViewEvent
