import * as shoppingList from '../common/shoppingList'

import { SKU, SKU_2, BASKET_ITEMS, PARSED_SHOPPING_LIST_ITEMS } from '../__mocks__/constants'

let basketItems
let shoppingListItems
let mergedItems
let mergedProduct
let mergedProduct2
let mergedProductTotalQuantity
let mergedProductTotalQuantity2
let combinedCollectionLength

describe('merge', () => {
  beforeEach(() => {
    basketItems = BASKET_ITEMS
    shoppingListItems = PARSED_SHOPPING_LIST_ITEMS
    combinedCollectionLength = basketItems.length + shoppingListItems.length
    mergedProductTotalQuantity =
      basketItems.find(({ sku }) => sku === SKU).quantity + shoppingListItems.find(({ sku }) => sku === SKU).quantity

    mergedProductTotalQuantity2 =
      basketItems.find(({ sku }) => sku === SKU_2).quantity +
      shoppingListItems.find(({ sku }) => sku === SKU_2).quantity

    mergedItems = shoppingList.merge(basketItems, shoppingListItems, 'sku')
    mergedProduct = mergedItems.find(({ sku }) => sku === SKU)
    mergedProduct2 = mergedItems.find(({ sku }) => sku === SKU_2)
  })

  it('Should remove duplicate property', () => {
    // 4 - 1
    expect(mergedProduct).toBeDefined()
    expect(mergedProduct2).toBeDefined()
    expect(mergedItems.length).toBe(combinedCollectionLength - 2)
  })

  it('When merging, should prefer the properties of the items in the second array', () => {
    expect(mergedProduct).toBeDefined()
    expect(mergedProduct.name.en).toContain('FROM EXTERNAL SHOPPING LIST')
  })

  it("merged item's new quantity should be the sum of quantities", () => {
    expect(mergedProduct).toBeDefined()
    expect(mergedProduct.quantity).toBe(mergedProductTotalQuantity)
    expect(mergedProduct2.quantity).toBe(mergedProductTotalQuantity2)
  })
})
