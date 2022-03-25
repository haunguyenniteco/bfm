import { gql } from '@apollo/client'
import { basketFragment } from '../fragments/basket'
import { nameFragment } from '../fragments/products'

export const intializeBasket = gql`
  ${basketFragment}
  ${nameFragment}
  query InitializeBasket($input: BasketInput!) {
    initializeBasket(input: $input) {
      ...BasketFragment
      notEnoughQuantityItems {
        id
        available
        name {
          ...NameFields
        }
      }
      notAvailableItems {
        id
        name {
          ...NameFields
        }
      }
    }
  }
`
