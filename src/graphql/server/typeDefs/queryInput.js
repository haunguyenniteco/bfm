const { gql } = require('apollo-server-micro')

export default gql`
  input MatchPhrase {
    phrase: String
  }
  input PaginationInput {
    page: Int!
    page_size: Int!
  }

  input MetaInput {
    pagination: PaginationInput!
  }

  input PriceLimit {
    gte: String
    lte: String
  }

  input ProductFilter {
    category_path_ids: [String]
    facets: FacetQueryInput
    price_limit: PriceLimit
  }

  input ProductSort {
    language: String
    type: String
    direction: String
  }

  input FacetQueryInput {
    group_by_type: Boolean
    brand: [String]
    country_of_origin: [String]
  }

  input AggregationsFilterInput {
    facets: FacetFilterInput
  }

  input FacetFilterInput {
    size: Int
    category_levels: [Int]
    whitelist: [String]
  }

  input ProductsQueryInput {
    store_id: String
    language: String
    gtin: [String]
    match_phrase: MatchPhrase
    filters: ProductFilter
    sorting: [ProductSort]
    meta: MetaInput
    aggregations: AggregationsFilterInput
  }

  input PlacesForPickupAndDeliveriesQueryInput {
    latitude: Float!
    longitude: Float!
    postcode: String
  }
`
