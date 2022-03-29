import { gql } from '@apollo/client'
import { mediaFragment, categoryFragment, nameFragment, promotionFragment } from './products'

export const basketProductFragment = gql`
  fragment BasketProductFragment on BasketProduct {
    id
    name {
      ...NameFields
    }
    media {
      ...MediaFields
    }
    extId
    gtin
    sku
    note
    masterProductId
    quantity
    totalClicksPrice
    totalBricksPrice
    clicksUnitPrice
    bricksUnitPrice
    categories {
      ...CategoryFields
    }
    promotions {
      ...PromotionFields
    }
    inventory {
      softBuffer
      hardBuffer
      balance
    }
    externalData {
      price
      oldPrice
      isPiecePricedByWeight
    }
  }
`

export const basketFragment = gql`
  ${mediaFragment}
  ${categoryFragment}
  ${nameFragment}
  ${basketProductFragment}
  ${promotionFragment}
  fragment BasketFragment on Basket {
    id
    items {
      ...BasketProductFragment
    }
  }
`
