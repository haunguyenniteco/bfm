import { gql } from '@apollo/client'
import { basketFragment } from '../fragments/basket'
import { nameFragment } from '../fragments/products'

export const validateInventory = gql`
  ${basketFragment}
  ${nameFragment}
  mutation ValidateInventory($input: BasketInput!) {
    validateInventory(input: $input) {
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

export const clearBasket = gql`
  mutation ClearBasket($input: ClearBasketInput!) {
    clearBasket(input: $input)
  }
`
