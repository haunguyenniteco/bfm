import * as shoppingList from '../common/shoppingList'

import { PARSED_SHOPPING_LIST_ITEMS, PRODUCT_SEARCH_RESPONSE } from '../__mocks__/constants'

describe('extendShoppingListItemsWithSearch', () => {
  it('The length of the items should not change', async () => {
    const populated = shoppingList.extendShoppingListItemsWithSearch(
      PARSED_SHOPPING_LIST_ITEMS,
      PRODUCT_SEARCH_RESPONSE,
    )
    expect(populated.length).toBe(PARSED_SHOPPING_LIST_ITEMS.length)
  })

  it('The length of the items should not change', async () => {
    const populated = shoppingList.extendShoppingListItemsWithSearch(
      PARSED_SHOPPING_LIST_ITEMS,
      PRODUCT_SEARCH_RESPONSE,
    )
    expect(populated.length).toBe(PARSED_SHOPPING_LIST_ITEMS.length)
  })
})
