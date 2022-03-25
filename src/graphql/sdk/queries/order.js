import { gql } from '@apollo/client'
import { orchestrationFragment } from '../fragments/order'
import { basicProductFragment } from '../fragments/products'

export const getOrchestration = gql`
  ${orchestrationFragment}
  query GetOrchestration($id: String!) {
    getOrchestration(id: $id) {
      ...OrchestrationFields
    }
  }
`

export const getOrder = gql`
  ${basicProductFragment}
  query GetOrder($orderId: String!) {
    order(orderId: $orderId) {
      id
      visibleId
      address
      name
      email
      notes
      phone
      partId
      placeId
      deliveryCharge
      deliveryType
      total
      status
      createdAt
      deliverySlot {
        id
        startTime
        endTime
        deliveryPrice
        pickupLocationGuid
        storeGuid
        deliveryType
        deliveryDate
        deliveryToken
      }
      deliveryAddress {
        name
        firstName
        lastName
        email
        phone
        street
        building
        apartment
        postcode
        postalArea
        city
        state
        countryCode
        locality
        country
        formattedAddress
      }
      products {
        id
        sku
        quantity
        price
        allowReplace
        notes
        externalData {
          price
          oldPrice
          isPiecePricedByWeight
        }
        product {
          ...BasicProductFields
        }
        externalData {
          price
          oldPrice
          isPiecePricedByWeight
        }
      }
    }
  }
`

export const getOrderList = gql`
  query GetOrderList($page: Int, $pageSize: Int) {
    orders(page: $page, pageSize: $pageSize) {
      items {
        id
        visibleId
        name
        address
        status
        deliveryType
        createdAt
        partId
        total
        deliverySlot {
          id
          startTime
          endTime
          deliveryPrice
          pickupLocationGuid
          storeGuid
          deliveryType
          deliveryDate
          deliveryToken
        }
        deliveryAddress {
          name
          firstName
          lastName
          email
          phone
          street
          building
          apartment
          postcode
          postalArea
          city
          state
          countryCode
          locality
          country
          formattedAddress
        }
      }
    }
  }
`
