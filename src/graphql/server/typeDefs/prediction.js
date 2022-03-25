const { gql } = require('apollo-server-micro')

export default gql`
  union Result = PredictionCategory | PredictionProduct | SearchPhrase

  input PredictionQueryInput {
    store_id: String!
    lang: String!
    term: String!
    tree: String
  }

  type PredictionCategory {
    parentName: LocaleField
    extId: String!
    name: LocaleField
    level: Int
    type: String!
  }

  type PredictionProduct {
    id: String!
    name: LocaleField
    price: Price
    image: Media
    netContent: MeasurementUnit
    type: String!
    masterProductId: String!
  }

  type SearchPhrase {
    count: String
    searchPhrase: String
    lang: String
    updated: String
    score: String
    type: String!
  }

  # type Predictions {
  #   categories: [Category!]
  #   products: [PredictionProduct!]
  #   searchPhrases: [SearchPhrase!]
  # }

  type Query {
    predictions(input: PredictionQueryInput): [Result]
  }
`
