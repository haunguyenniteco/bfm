import { gql } from '@apollo/client'
import { nameFragment } from '../fragments/products'

export const getSearchPredictions = gql`
  ${nameFragment}
  query SearchPredictions($input: PredictionQueryInput) {
    predictions(input: $input) {
      ... on PredictionCategory {
        extId
        name {
          ...NameFields
        }
        parentName {
          ...NameFields
        }
        level
        type
      }
      ... on PredictionProduct {
        id
        name {
          ...NameFields
        }
        price {
          clicksUnitPrice
        }
        image {
          mediaStorageKey
        }
        type
        masterProductId
      }
      ... on SearchPhrase {
        searchPhrase
        type
      }
    }
  }
`
