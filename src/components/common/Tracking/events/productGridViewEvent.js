import getProductGridTrackingData from './utils/getProductGridTrackingData'
import TRACKING from '../constants'

const ProductGridViewEvent = data => {
  const { eventCategory, eventAction, products, eventPath, eventLabel, eventValue } = getProductGridTrackingData(data)
  return {
    event: TRACKING.PRODUCT_LIST_VIEWED,
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

export default ProductGridViewEvent
