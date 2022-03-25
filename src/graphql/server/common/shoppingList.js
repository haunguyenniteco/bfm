import { money } from './helpers'

export const merge = (a, b, prop) => {
  const reduced = a.reduce((acc, item) => {
    const current = item[prop]
    const match = acc.find(elem => elem[prop] === current)
    if (match) {
      match.quantity += item.quantity
    } else acc.push(item)
    return acc
  }, b)
  return reduced
}

export const mergeBasketAndShoppingList = (basketItems = [], shoppingListItems = []) => {
  if (!shoppingListItems.length && !basketItems.length) return []
  if (!shoppingListItems.length) return basketItems
  if (!basketItems.length) return shoppingListItems

  const mergedItems = merge(basketItems, shoppingListItems, 'sku')
  return mergedItems
}

export const parseShoppingListResponse = shoppingList => {
  function parseItem({ id, product, ...rest }) {
    // Id property here is the shoppingListItem Id, not the product id so it can be left out
    return { ...product, ...rest }
  }
  const response = {
    ...shoppingList,
    items: shoppingList.items.map(parseItem),
  }
  return response
}

export const extendShoppingListItemsWithSearch = (shoppingListItems = [], searchItems = []) => {
  const shoppingListLength = shoppingListItems.length
  const searchItemsLength = searchItems.length

  // Shopping list items array should always be the same length as the search results
  if (shoppingListLength !== searchItemsLength) {
    console.error(
      `Mismatch in shoppingList items length: ${shoppingListLength} and searchItems length: ${searchItemsLength}`,
    )
  }
  const mergedItems = shoppingListItems.reduce((acc, shoppingListItem) => {
    const productMatch = searchItems.find(product => product.gtin === shoppingListItem.sku)
    if (productMatch) {
      acc.push({ ...shoppingListItem, ...productMatch })
    }
    return acc
  }, [])
  return mergedItems
}

export const createShoppingListPayload = items => {
  const transformProduct = item => {
    if (item) {
      const {
        clicksUnitPrice,
        bricksUnitPrice,
        sku,
        quantity,
        masterProductId,
        picked = false,
        allowReplace,
        externalData,
      } = item

      return {
        product: {
          master_product_id: masterProductId,
          sku,
        },
        allow_replace: allowReplace,
        picked,
        quantity,
        clicks_unit_price: money(clicksUnitPrice),
        bricks_unit_price: money(bricksUnitPrice),
        total_bricks_price: money(parseFloat(bricksUnitPrice) * quantity),
        total_clicks_price: money(parseFloat(clicksUnitPrice) * quantity),
        external_data: externalData,
      }
    }
  }
  const payload = {
    items: items.map(transformProduct),
  }
  return payload
}
