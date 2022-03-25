const { gql } = require('apollo-server-micro')

export default gql`
  type ProductIdAndQuantity {
    productId: String
    quantity: Int
  }

  "Product search result"
  type ProductHit {
    # Common fields of Product & ProductHit
    # TODO: Maybe merge these
    id: ID!
    extId: String
    gtin: String
    masterProductId: String
    name: LocaleField
    prices: Price
    brandName: String
    netContent: [MeasurementUnit]
    priceByMeasureTypeName: LocaleField
    languageSpecificBrandName: LocaleField
    priceComparisonMeasurements: [MeasurementUnit]
    media: [Media]
    tradeItemMarketingMessage: LocaleField
    placeOfItemActivityInformation: PlaceInfo
    categories: [Category]
    promotions: [Promotion]

    # Not common fields
    description: LocaleField
    brand: LocaleField
    importanceWeight: Int
    # promotions: [Promotion]

    # Variable measured product
    priceByMeasureTypeCode: String
    xSellingUnitOfMeasureCode: String
    xSellingContentIncrement: Float
    xSellingContentInitial: Float
    inventory: Inventory
  }

  type AggregationBrand {
    name: String
    count: Int
  }

  type AggregationCategory {
    name: String
    level: Int
    count: Int
  }

  type FacetValues {
    value: String!
    count: Int
  }

  type Facets {
    brand: [FacetValues]
    countryOfOrigin: [FacetValues]
  }

  type Aggregation {
    categories: [AggregationCategory]
    facets: Facets
  }

  type Pagination {
    pageSize: Int
    page: Int
    nextPage: Int
    prevPage: Int
    totalPages: Int
    totalCount: Int
  }

  type Products {
    items: [ProductHit]
    pagination: Pagination
    aggregations: Aggregation
  }

  type Inventory {
    softBuffer: Int
    hardBuffer: Int
    balance: Int
  }

  type Query {
    products(input: ProductsQueryInput): Products
    similarProducts(storeId: String!, masterProductId: String!, page: Int = 1, pageSize: Int = 8): Products
  }
`
