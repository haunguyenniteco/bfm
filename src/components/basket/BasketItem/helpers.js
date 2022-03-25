import { getPriceForViews } from '@lib/helpers'

export const animationSpeedMs = 300

export const errorHandling = err => {
  console.error(err.message)
}

export function getSupportedOptionsFromProps(props) {
  const {
    deliveryTypeToApplyFreeShipping = 'standard',
    freeShippingMinimumPurchaseAmount = -1,
    validateEndpoint = '/api/basket/validate',
    onEmpty,
    onAddToBasket,
    onRemoveFromBasket,
    onInit,
    onValidate,
    onClearBasket,
    alwaysValidate,
    storeInfo,
    sessionUser,
    isSignedIn,
    guestUserId,
  } = props

  return {
    freeShippingMinimumPurchaseAmount: parseFloat(freeShippingMinimumPurchaseAmount),
    deliveryTypeToApplyFreeShipping,
    validateEndpoint,
    onEmpty,
    onAddToBasket,
    onRemoveFromBasket,
    onInit,
    onValidate,
    onClearBasket,
    alwaysValidate,
    storeInfo,
    sessionUser,
    isSignedIn,
    guestUserId,
  }
}

export const calculateTotalAmount = items =>
  items.reduce((accumulator, item) => accumulator + item.unit_price * item.quantity, 0)

export const parseBasketItem = product => {
  const {
    masterProductId,
    quantity,
    id,
    name,
    media,
    extId,
    gtin,
    sku,
    totalClicksPrice,
    totalBricksPrice,
    clicksUnitPrice,
    bricksUnitPrice,
    prices,
    categories,
    promotions,
    unit_price, // eslint-disable-line camelcase
    allowReplace,
    note,
    inventory,
    externalData,
  } = product
  return {
    get basketItemId() {
      return gtin
    },
    // TODO: If basket is always synced to backend shopping list, prices.clicksUnitPrice can be removed
    unit_price: unit_price || clicksUnitPrice || prices?.clicksUnitPrice || 0, // eslint-disable-line camelcase
    clicksUnitPrice: clicksUnitPrice || clicksUnitPrice || prices?.clicksUnitPrice || 0,
    bricksUnitPrice: bricksUnitPrice || bricksUnitPrice || prices?.bricksUnitPrice || 0,
    sku: sku || gtin,
    masterProductId,
    quantity,
    id,
    name,
    media,
    extId,
    gtin,
    totalClicksPrice,
    totalBricksPrice,
    categories,
    promotions,
    allowReplace,
    note,
    inventory,
    externalData: externalData || getPriceForViews(product),
  }
}

export const getDisabledBuffer = (inventory, inBasket) => {
  if (!inventory) {
    return false
  }
  const quantity = inBasket?.quantity || 0
  const { softBuffer, hardBuffer, balance } = inventory
  const buffer = quantity ? hardBuffer : softBuffer
  return balance - quantity <= buffer
}
