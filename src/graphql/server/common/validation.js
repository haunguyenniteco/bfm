/**
 * Calculates new state, updates the items' quantities, or removes them if not available.
 *
 * @param {Array} stateItems - Items from state that was validated
 * @param {Array} invalidItems - Items that inventory service returned as invalid
 * @return {Array.<Array.<Object>>} - Returns an array of arrays:  [[updatedItems], [notAvailableItems], [notEnoughQuantityItems]]
 */
export const calculateValidatedState = (stateItems = [], invalidItems = []) => {
  if (!invalidItems.length) return [stateItems, invalidItems]
  return stateItems.reduce(
    (acc, item) => {
      const current = item
      const match = invalidItems.find(elem => elem.masterProductId === current.masterProductId)
      if (match) {
        if (!match.available) {
          // If item is not available, push to the removed items
          acc[1].push(current)
        } else {
          if (match.available < current.quantity) {
            // Push to the not enough quantity items
            acc[2].push({ ...current, available: match.available })
          }
          // Update quantity
          current.quantity = match.available
          // Push to the state items
          acc[0].push(current)
        }
      } else acc[0].push(current)
      return acc
    },
    [[], [], []],
  )
}

const runValidateFn = async ({ validateFn, items }) => {
  const payload = {
    items: items.map(({ masterProductId, quantity }) => ({
      // master_product_id: masterProductId || product.masterProductId,
      master_product_id: masterProductId,
      quantity,
    })),
  }
  const result = await validateFn(payload).catch(error => {
    throw new Error('validateFn error', error.message)
  })
  return result
}

export async function validateBasket({ validateFn, items = [], alwaysValidate }) {
  if (!alwaysValidate) {
    return {
      items,
      notAvailableItems: [],
      notEnoughQuantityItems: [],
    }
  }

  const { errors: invalid = [] } = await runValidateFn({
    validateFn,
    items,
  }).catch(() => {
    return {
      items: [],
      notAvailableItems: items, // When 404 is not returned, all items are invalid
      notEnoughQuantityItems: [],
    }
  })

  if (!invalid) {
    return {
      items,
      notAvailableItems: [],
      notEnoughQuantityItems: [],
    }
  }

  const [itemsTransformed, notAvailableItems, invalidItems] = calculateValidatedState(items, invalid)

  return {
    items: itemsTransformed,
    notAvailableItems,
    notEnoughQuantityItems: invalidItems,
  }
}

export function releaseReservedBasket({ validateFn, items = [], alwaysValidate }) {
  if (!alwaysValidate || !items.length) return
  return runValidateFn({
    validateFn,
    items: items.map(({ masterProductId }) => ({ masterProductId, quantity: 0 })),
  })
}

export default validateBasket
