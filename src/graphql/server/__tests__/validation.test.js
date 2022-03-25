import commerceAPI from '../__mocks__/commerceAPI'
import * as validation from '../common/validation'

import { BASKET_ITEM_1, BASKET_ITEMS, STORE_MASTER_ID, SHOPPING_LIST_ID } from '../__mocks__/constants'

describe('validation.js', () => {
  it('Should return 1 out of 3 items invalid', async () => {
    const result = await validation.validateBasket({
      items: BASKET_ITEMS,
      validateFn: payload => commerceAPI.validateBasketItems(STORE_MASTER_ID, SHOPPING_LIST_ID, payload),
      alwaysValidate: true,
    })

    expect(result.notEnoughQuantityItems.length).toBe(1)
  })
  it('Should return 2 of 3 items valid', async () => {
    const result = await validation.validateBasket({
      items: BASKET_ITEMS,
      validateFn: payload => commerceAPI.validateBasketItems(STORE_MASTER_ID, SHOPPING_LIST_ID, payload),
      alwaysValidate: true,
    })

    expect(result.items.length).toBe(2)
  })

  it('Should return 1 of 3 items deleted', async () => {
    const result = await validation.validateBasket({
      items: BASKET_ITEMS,
      validateFn: payload => commerceAPI.validateBasketItems(STORE_MASTER_ID, SHOPPING_LIST_ID, payload),
      alwaysValidate: true,
    })

    expect(result.notAvailableItems.length).toBe(1)
  })

  it(' Should update the quantity', async () => {
    const invalidMasteProductId = BASKET_ITEM_1.masterProductId
    const availableAmount = 4
    const invalidItems = [{ masterProductId: invalidMasteProductId, available: availableAmount }]
    const expectedResultLength = BASKET_ITEMS.length

    const [items, notAvailableItems, notEnoughQuantityItems] = validation.calculateValidatedState(
      BASKET_ITEMS,
      invalidItems,
    )

    const updatedItem = items.find(({ masterProductId }) => masterProductId === invalidMasteProductId)

    // Should add item notEnoughQuantityItems
    expect(notEnoughQuantityItems.length).toBe(invalidItems.length)

    // But total length should not change
    expect(notAvailableItems.length).toBe(0)
    expect(items.length).toBe(expectedResultLength)

    // BASKET_ITEM_1 Quantity should be updated
    expect(updatedItem.quantity).toBe(availableAmount)
  })

  it(' Should remove not available items', async () => {
    const invalidMasteProductId = BASKET_ITEM_1.masterProductId
    const availableAmount = 0
    const invalidItems = [{ masterProductId: invalidMasteProductId, available: availableAmount }]
    const expectedResultLength = BASKET_ITEMS.length - invalidItems.length

    const [items, notAvailableItems] = validation.calculateValidatedState(BASKET_ITEMS, invalidItems)
    expect(items.length).toBe(expectedResultLength)
    expect(notAvailableItems.length).toBe(invalidItems.length)

    // BASKET_ITEM_1 Should be notAvailableItems
    expect(items).not.toContainEqual(BASKET_ITEM_1)
    expect(notAvailableItems).toContainEqual(BASKET_ITEM_1)
  })
})
