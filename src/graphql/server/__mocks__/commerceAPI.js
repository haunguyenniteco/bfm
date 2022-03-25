import { SHOPPING_LIST_ITEMS, BASKET_ITEM_1, BASKET_ITEM_2 } from './constants'

const getBasketsResponse = customerId => ({
  data: [
    {
      customer_id: customerId,
      ext_id: null,
      name: 'untitled',
      active: false,
      created_at: '2019-08-01 11:02:17 UTC',
      updated_at: '2019-08-01 11:02:17 UTC',
      id: '96d5382e-bd1d-49a1-8fb8-82feaebd797e',
      last_active: null,
      unique_items_count: 0,
      items_count: 1,
      cart_value: 0,
    },
    {
      customer_id: customerId,
      ext_id: null,
      name: 'untitled',
      active: true,
      created_at: '2019-08-08 11:49:49 UTC',
      updated_at: '2019-08-14 07:53:20 UTC',
      id: 'fbbb4a60-ea3c-4f7f-b45a-28ee72e236a9',
      last_active: '2019-08-08T11:49:49Z',
      unique_items_count: 0,
      items_count: 2,
      cart_value: 0,
    },
    {
      customer_id: customerId,
      ext_id: null,
      name: 'untitled',
      active: false,
      created_at: '2019-08-01 17:14:13 UTC',
      updated_at: '2019-08-01 17:14:13 UTC',
      id: 'ec5d50a5-636f-4c82-9a9a-8844fb49b47f',
      last_active: null,
      unique_items_count: 0,
      items_count: 0,
      cart_value: 0,
    },
  ],
  meta: {
    pagination: {
      page_size: 20,
      page: 1,
      next_page: null,
      prev_page: null,
      total_pages: 1,
      total_count: 3,
    },
  },
})

const getBasketResponse = customerId => ({
  data: {
    organization_id: '291554540967166978',
    items: SHOPPING_LIST_ITEMS,
    own_items: [],
    external_data: {},
    customer_id: customerId,
    ext_id: null,
    name: 'untitled',
    active: true,
    created_at: '2019-08-08 11:49:49 UTC',
    updated_at: '2019-08-14 07:53:20 UTC',
    id: 'fbbb4a60-ea3c-4f7f-b45a-28ee72e236a9',
    last_active: '2019-08-08T11:49:49Z',
    unique_items_count: 0,
    items_count: 2,
    cart_value: 0,
  },
})

const validateBasketItemsResponse = () => {
  return {
    errors: [
      {
        masterProductId: BASKET_ITEM_1.masterProductId,
        message: 'inventory_not_found',
      },
      {
        masterProductId: BASKET_ITEM_2.masterProductId,
        message: 'product_not_orderable',
        available: 2,
      },
    ],
  }
}

const commerceAPI = {
  getBaskets(customerId) {
    return new Promise((resolve, reject) => {
      process.nextTick(() =>
        customerId ? resolve(getBasketsResponse(customerId)) : reject(new Error(`customerId was: ${customerId}`)),
      )
    })
  },
  getBasket(customerId) {
    return new Promise((resolve, reject) => {
      process.nextTick(() =>
        customerId ? resolve(getBasketResponse(customerId)) : reject(new Error(`customerId was: ${customerId}`)),
      )
    })
  },
  validateBasketItems(storeMasterId, shoppingListId, payload) {
    return new Promise((resolve, reject) => {
      process.nextTick(() =>
        shoppingListId
          ? resolve(validateBasketItemsResponse(payload))
          : reject(new Error(`shoppingListId was: ${shoppingListId}`)),
      )
    })
  },
}

export default commerceAPI
