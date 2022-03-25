import { gql } from '@apollo/client'

export const orchestrationFragment = gql`
  fragment OrchestrationFields on Orchestration {
    orchestrationId
    place {
      id
    }
    parts {
      orchestrationId
      dropshipperId
      deliveryMethods {
        id
        placeId
        forDropshipping
        providerId
        logoUrl
        price {
          currency
          min
          max
        }
        type
        services {
          id
          type
          name
          code
          address {
            city
            street
            postcode
          }
          price {
            currency
            min
            max
          }
          slots {
            date
            slots {
              id
              startTime
              endTime
              price
              isFull
              timezone
              fillPercentage
            }
          }
        }
      }
      products {
        masterProductId
        sku
        quantity
        unitPrice {
          currency
          price
          priceVat
          vatPercentage
        }
        rowPrice {
          currency
          price
          priceVat
          vatPercentage
        }
      }
      place {
        id
        packingOptions {
          sku
          type
          price {
            price
            currency
            priceVat
          }
        }
      }
      totalPrice {
        price
        currency
        priceVat
      }
    }
    paymentMethods {
      backend
      type
      services {
        type
        name
        code
        logoUrl
        fee {
          price
          currency
          priceVat
        }
      }
      fee {
        min
        max
        currency
      }
    }
    totalPrice {
      price
      currency
      priceVat
    }
    editable
    cancellable
  }
`
