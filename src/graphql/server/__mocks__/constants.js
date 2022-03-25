/* eslint-disable */
export const SKU = '129929'
export const SKU_2 = '654321'
export const SKU_3 = '27315'

export const CUSTOMER_ID = 'fake-customer-uuid-123'
export const STORE_MASTER_ID = 'store-master-uuid'
export const SHOPPING_LIST_ID = 'fbbb4a60-ea3c-4f7f-b45a-28ee72e236a9'

export const BASKET_ITEM_1 = {
  basketItemId: SKU,
  unit_price: 5.99,
  clicksUnitPrice: 5.99,
  bricksUnitPrice: 5.99,
  sku: SKU,
  quantity: 6,
  id: '1c244b65-a9de-49aa-8dcd-ee5425691be8',
  gtin: SKU,
  masterProductId: '3d67022f-24d8-4780-94e7-e2647f769a7c',
  name: {
    en: 'Cimarosa Argentinian Malbec, 75cl (FROM CACHED LOCAL BASKET)',
    __typename: 'LocaleField',
  },
  media: [
    {
      mediaStorageKey: 'https://s3-eu-west-1.amazonaws.com/dg-general/phoenix/129929_1.jpg',
      mediaDimensionWidth: 3000,
      mediaDimensionHeight: 2250,
      mediaSequence: 1,
      mediaTypeCode: 'PICTURE',
      __typename: 'Media',
    },
  ],
  prices: {
    clicksUnitPrice: 5.99,
    bricksUnitPrice: 5.99,
    __typename: 'Price',
  },
}
export const BASKET_ITEM_2 = {
  basketItemId: SKU_2,
  unit_price: 5.99,
  clicksUnitPrice: 5.99,
  bricksUnitPrice: 5.99,
  sku: SKU_2,
  quantity: 4,
  id: 'product-uuid',
  gtin: SKU_2,
  masterProductId: 'some-wine-master_product_id',
  name: {
    en: 'SKU_2, 75cl (FROM CACHED LOCAL BASKET)',
    __typename: 'LocaleField',
  },
  media: [
    {
      mediaStorageKey: 'https://s3-eu-west-1.amazonaws.com/dg-general/phoenix/129929_1.jpg',
      mediaDimensionWidth: 3000,
      mediaDimensionHeight: 2250,
      mediaSequence: 1,
      mediaTypeCode: 'PICTURE',
      __typename: 'Media',
    },
  ],
  prices: {
    clicksUnitPrice: 5.99,
    bricksUnitPrice: 5.99,
    __typename: 'Price',
  },
}
export const BASKET_ITEM_3 = {
  basketItemId: 'basket-item-sku',
  bricksUnitPrice: 4.99,
  clicksUnitPrice: 4.99,
  description: { en: 'Attractive fruity red', __typename: 'LocaleField' },
  extId: 'basket-item-sku',
  gtin: 'basket-item-sku',
  id: 'c9964e76-2f81-49db-a88e-220a94de7294',
  masterProductId: '453f54bd-18fe-4e36-8e6f-ea0ee4d634e8',
  media: [],
  name: { en: 'Giulio Pasotti Bardolino Classico, 75cl (FROM CACHED LOCAL BASKET)', __typename: 'LocaleField' },
  prices: { clicksUnitPrice: 4.99, bricksUnitPrice: 4.99, __typename: 'Price' },
  quantity: 1,
  sku: 'basket-item-sku',
  unit_price: 4.99,
}

export const BASKET_ITEMS = [BASKET_ITEM_1, BASKET_ITEM_2, BASKET_ITEM_3]

export const BASKET_FROM_LOCAL_STORAGE = JSON.stringify({
  id: '09072550-be5d-11e9-a89f-ebf95f413db1',
  items: BASKET_ITEMS,
  shipping: { customer: null, address: null, notes: null, delivery: null, charge: 0 },
  metadata: null,
  coupon: null,
  voucher: null,
  discount: null,
})

export const SHOPPING_LIST_ITEM_1 = {
  id: 'e8236b4c-51c2-428b-b77b-8e25f316131b',
  note: {},
  picked: false,
  product: {
    sku: SKU,
    masterProductId: 'fd028b11-be25-4c94-9ed6-611829011cad',
  },
  quantity: 2,
  allow_replace: false,
  external_data: {},
  bricks_unit_price: 4.49,
  clicks_unit_price: 4.49,
  total_bricks_price: 8.98,
  total_clicks_price: 8.98,
  total_bricks_price_savings: 0,
  total_clicks_price_savings: 0,
}
export const SHOPPING_LIST_ITEM_2 = {
  id: '32ab5745-dc72-497b-9df1-93beabf8c83a',
  note: {},
  picked: false,
  product: {
    sku: SKU_3,
    masterProductId: '00057c63-c998-4985-8bd3-61235b45907b',
  },
  quantity: 1,
  allow_replace: false,
  external_data: {},
  bricksUnitPrice: 5.99,
  clicksUnitPrice: 5.99,
  totalBricksPrice: 5.99,
  totalClicksPrice: 5.99,
  total_bricks_price_savings: 0,
  total_clicks_price_savings: 0,
}

export const SHOPPING_LIST_ITEMS = [SHOPPING_LIST_ITEM_1, SHOPPING_LIST_ITEM_2]

export const PARSED_SHOPPING_LIST_ITEMS = [
  {
    gtin: SKU,
    sku: SKU,
    name: {
      en: 'Cimarosa Californian Merlot, 75cl (FROM EXTERNAL SHOPPING LIST)',
      Typename: 'LocaleField',
    },
    masterProductId: 'fd028b11-be25-4c94-9ed6-611829011cad',
    note: {},
    picked: false,
    quantity: 2,
    allowReplace: false,
    externalData: {},
    bricksUnitPrice: 4.49,
    clicksUnitPrice: 4.49,
    totalBricksPrice: 8.98,
    totalClicksPrice: 8.98,
    totalBricksPriceSavings: 0,
    totalClicksPriceSavings: 0,
  },
  {
    id: '71630a51-a984-49c9-b43f-77a649c0ee95',
    gtin: SKU_3,
    sku: SKU_3,
    name: {
      en: "Winemaker's Selection Coonawarra Cabernet Sauvignon, 75cl (FROM EXTERNAL SHOPPING LIST)",
      _Typename: 'LocaleField',
    },
    media: [
      {
        _Typename: 'Media',
        mediaStorageKey: 'https://s3-eu-west-1.amazonaws.com/dg-general/phoenixSKU_31.jpg',
        mediaDimensionWidth: 3000,
        mediaDimensionHeight: 2250,
      },
    ],
    masterProductId: '00057c63-c998-4985-8bd3-61235b45907b',
    note: {},
    picked: false,
    quantity: 1,
    allowReplace: false,
    externalData: {},
    bricksUnitPrice: 5.99,
    clicksUnitPrice: 5.99,
    totalBricksPrice: 5.99,
    totalClicksPrice: 5.99,
    totalBricksPriceSavings: 0,
    totalClicksPriceSavings: 0,
  },
  {
    gtin: SKU_2,
    sku: SKU_2,
    name: {
      en: 'SKU_2, 75cl (FROM EXTERNAL SHOPPING LIST)',
      Typename: 'LocaleField',
    },
    masterProductId: 'fd028b11-be25-4c94-9ed6-611829011cad',
    note: {},
    picked: false,
    quantity: 200,
    allowReplace: false,
    externalData: {},
    bricksUnitPrice: 449.49,
    clicksUnitPrice: 449.49,
    totalBricksPrice: 898.98,
    totalClicksPrice: 898.98,
    totalBricksPriceSavings: 0,
    totalClicksPriceSavings: 0,
  },
]

export const PARSED_SHOPPING_LIST_RESPONSE = {
  organizationId: '291554540967166978',
  items: PARSED_SHOPPING_LIST_ITEMS,
  ownItems: [],
  externalData: {},
  customerId: 'e5638bae-6d0b-44f9-8f35-e98a97952dd5',
  extId: null,
  name: 'untitled',
  active: true,
  createdAt: '2019-08-08 11:49:49 UTC',
  updatedAt: '2019-08-09 09:58:53 UTC',
  id: SHOPPING_LIST_ID,
  lastActive: '2019-08-08T11:49:49Z',
  uniqueItemsCount: 0,
  itemsCount: 2,
  cartValue: 0,
}

export const PRODUCT_SEARCH_RESPONSE = [
  {
    id: '1c244b65-a9de-49aa-8dcd-ee5425691be8',
    gtin: SKU,
    masterProductId: '3d67022f-24d8-4780-94e7-e2647f769a7c',
    name: {
      en: 'Cimarosa Argentinian Malbec, 75cl (FROM SEARCH RESULTS)',
      __typename: 'LocaleField',
    },
    media: [
      {
        mediaStorageKey: 'https://s3-eu-west-1.amazonaws.com/dg-general/phoenix/129929_1.jpg',
        mediaDimensionWidth: 3000,
        mediaDimensionHeight: 2250,
        mediaSequence: 1,
        mediaTypeCode: 'PICTURE',
        __typename: 'Media',
      },
    ],
    prices: {
      __typename: 'Price',
    },
  },
  {
    id: 'product-uuid',
    gtin: SKU_2,
    masterProductId: '3d67022f-24d8-4780-94e7-e2647f769a7c',
    name: {
      en: 'SKU_2, 75cl (FROM SEARCH RESULTS)',
      __typename: 'LocaleField',
    },
    media: [
      {
        mediaStorageKey: 'https://s3-eu-west-1.amazonaws.com/dg-general/phoenix/129929_1.jpg',
        mediaDimensionWidth: 3000,
        mediaDimensionHeight: 2250,
        mediaSequence: 1,
        mediaTypeCode: 'PICTURE',
        __typename: 'Media',
      },
    ],
    prices: {
      clicksUnitPrice: 5.99,
      bricksUnitPrice: 5.99,
      __typename: 'Price',
    },
  },
  {
    id: 'some-product-uuid',
    gtin: SKU_3,
    masterProductId: 'master-uuid',
    name: {
      en: 'gtin-id, 75cl (FROM SEARCH RESULTS)',
      __typename: 'LocaleField',
    },
    media: [
      {
        mediaStorageKey: 'https://s3-eu-west-1.amazonaws.com/dg-general/phoenix/129929_1.jpg',
        mediaDimensionWidth: 3000,
        mediaDimensionHeight: 2250,
        mediaSequence: 1,
        mediaTypeCode: 'PICTURE',
        __typename: 'Media',
      },
    ],
    prices: {
      clicksUnitPrice: 5.99,
      bricksUnitPrice: 5.99,
      __typename: 'Price',
    },
  },
]
