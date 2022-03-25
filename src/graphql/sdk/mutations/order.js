import { gql } from '@apollo/client'
import { orchestrationFragment } from '../fragments/order'

export const ORCHESTRATION = gql`
  ${orchestrationFragment}
  mutation Orchestration($input: OrchestrationInput!) {
    orchestration(input: $input) {
      ...OrchestrationFields
    }
  }
`

export const CREATE_ORDER = gql`
  mutation CreateOrder($input: CreateOrderInput!) {
    createOrder(input: $input) {
      id
      placeId
      payment {
        checkoutUrl
        sessionId
      }
    }
  }
`

export const AMEND_ORDER = gql`
  mutation amendOrder($customerId: String!, $orderId: String!, $input: CreateOrderInput!) {
    amendOrder(customerId: $customerId, orderId: $orderId, input: $input) {
      id
    }
  }
`

export const CANCEL_ORDER = gql`
  mutation cancelOrder($customerId: String!, $orderId: String!) {
    cancelOrder(customerId: $customerId, orderId: $orderId)
  }
`

export const FINALIZE_ORDER = gql`
  mutation finalizeOrder($orderId: String!) {
    finalizeOrder(orderId: $orderId)
  }
`
