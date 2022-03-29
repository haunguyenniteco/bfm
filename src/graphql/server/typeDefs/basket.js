const { gql } = require('apollo-server-micro')

export default gql`
  type ExternalData {
    price: Float
    oldPrice: Float
    isPiecePricedByWeight: Boolean
  }
  type BasketProduct {
    id: ID
    name: LocaleField
    media: [Media]
    extId: String
    gtin: String
    sku: String
    note: String
    masterProductId: String
    quantity: Float
    totalClicksPrice: Float
    totalBricksPrice: Float
    clicksUnitPrice: Float
    bricksUnitPrice: Float
    categories: [Category]
    promotions: [Promotion]
    inventory: Inventory
    externalData: ExternalData
  }

  type Inventory {
    softBuffer: Int
    hardBuffer: Int
    balance: Int
  }

  type InvalidItem {
    id: ID
    name: LocaleField
    media: [Media]
    extId: String
    gtin: String
    sku: String
    masterProductId: String
    quantity: Float
    totalClicksPrice: Float
    totalBricksPrice: Float
    clicksUnitPrice: Float
    bricksUnitPrice: Float
    available: Int
  }

  type Basket {
    id: ID
    items: [BasketProduct]
    notAvailableItems: [BasketProduct]
    notEnoughQuantityItems: [InvalidItem]
  }

  input LocaleFieldInput {
    en: String
    fi: String
    es: String
    pt: String
  }

  input MediaInput {
    mediaSequence: Int
    mediaMimeType: String
    mediaTypeCode: String
    mediaStorageKey: String
    mediaDimensionWidth: Int
    mediaDimensionHeight: Int
  }

  input CategoryInput {
    level: Int
    extId: String
    name: LocaleFieldInput
    parentName: LocaleFieldInput
    parentExtId: String
    path: String
  }

  input PromotionInput {
    id: ID
    clicksPromotionPrice: Float
    clicksRebate: Float
    quantity: Int
  }

  input InventoryInput {
    softBuffer: Int
    hardBuffer: Int
    balance: Int
  }

  input ExternalDataInput {
    price: Float
    oldPrice: Float
    isPiecePricedByWeight: Boolean
  }

  input BasketProductInput {
    masterProductId: ID!
    basketItemId: String
    quantity: Int!
    id: ID
    name: LocaleFieldInput
    media: [MediaInput]
    extId: String
    gtin: String
    sku: String
    allowReplace: Boolean = false
    note: String
    picked: Boolean = false
    unit_price: Float
    totalClicksPrice: Float
    totalBricksPrice: Float
    clicksUnitPrice: Float
    bricksUnitPrice: Float
    categories: [CategoryInput]
    promotions: [PromotionInput]
    inventory: InventoryInput
    externalData: ExternalDataInput
  }

  input BasketInput {
    "Shopping List ID"
    id: ID
    items: [BasketProductInput]
    storeId: String!
    alwaysValidate: Boolean = false
  }

  input ClearBasketInput {
    "Shopping List ID"
    id: ID
    storeId: String!
    alwaysValidate: Boolean = false
  }

  type Mutation {
    validateInventory(input: BasketInput!): Basket
    clearBasket(input: ClearBasketInput!): Boolean
  }

  type Query {
    initializeBasket(input: BasketInput!): Basket
  }

  type Subscription {
    notAvailableItems: [BasketProduct]
    notEnoughQuantityItems: [InvalidItem]
  }
`
