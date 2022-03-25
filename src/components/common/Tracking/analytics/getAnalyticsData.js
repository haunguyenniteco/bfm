import TRACKING from '../constants'
import {
  productListViewEvent,
  productGridViewEvent,
  productViewEvent,
  productClickEvent,
  pageViewEvent,
  productAddedEvent,
  productRemovedEvent,
  checkoutEvent,
  checkoutOption,
  purchaseEvent,
} from '../events'

const {
  PAGE_VIEW,
  PRODUCT_LIST_VIEWED,
  PRODUCT_GRID_VIEWED,
  PRODUCT_VIEWED,
  PRODUCT_CLICK,
  PRODUCT_ADDED,
  PRODUCT_REMOVED,
  CHECKOUT,
  CHECKOUT_OPTION,
  PAYMENT_INFO_ENTERED,
} = TRACKING

export default function getAnalyticsData(data) {
  const { event, action, isGrid = false } = data
  let eventAction = event || action
  if (isGrid) eventAction = PRODUCT_GRID_VIEWED

  switch (eventAction) {
    case PAGE_VIEW: {
      return pageViewEvent(data)
    }

    case PRODUCT_LIST_VIEWED:
      return productListViewEvent(data)

    case PRODUCT_GRID_VIEWED:
      return productGridViewEvent(data)

    case PRODUCT_VIEWED:
      return productViewEvent(data)

    case PRODUCT_CLICK:
      return productClickEvent(data)

    case PRODUCT_ADDED:
      return productAddedEvent(data)

    case PRODUCT_REMOVED:
      return productRemovedEvent(data)

    case CHECKOUT:
      return checkoutEvent(data)

    case CHECKOUT_OPTION:
      return checkoutOption(data)

    case PAYMENT_INFO_ENTERED:
      return purchaseEvent(data)

    default:
      return data
  }
}
