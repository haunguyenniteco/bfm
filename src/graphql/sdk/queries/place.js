import { gql } from '@apollo/client'

const placeFragment = gql`
  fragment PlaceFields on Place {
    id
    placeId
    masterId
    name
    street
    building
    postcode
    city
    latitude
    longitude
    distance
    chain {
      name
      type
      logoUrl
    }
  }
`

export const getStoreInfo = gql`
  query storeDetails($storeId: String!) {
    storeInfo: store(id: $storeId) {
      id
      extId
      name
      masterId
      street
      building
      postcode
      postalArea
      town
      city
      state
    }
  }
`

export const getPlacesForPickupAndDeliveries = gql`
  ${placeFragment}
  query placesForPickupAndDeliveries($input: PlacesForPickupAndDeliveriesQueryInput!) {
    placesForPickupAndDeliveries(input: $input) {
      pickups {
        ...PlaceFields
      }
      deliveries {
        ...PlaceFields
      }
    }
  }
`

export const getDeliverySlots = gql`
  query deliverySlots($placeId: String!, $deliveryAreaGroupId: String!, $startsAt: String!, $endsAt: String!) {
    deliverySlots(placeId: $placeId, deliveryAreaGroupId: $deliveryAreaGroupId, startsAt: $startsAt, endsAt: $endsAt) {
      deliveryDate
      slots {
        startsAt
        endsAt
        graceDays
        graceHours
        collectionPrice
        deliveryPrice
        deliveryType
        discountedSlot
        orderQuota
        id
        isFull
        timezone
        deliveryAreaGroupId
        deliveryAreaGroupName
        organizationId
        date
      }
    }
  }
`

export const getPickupSlots = gql`
  query pickupSlots($placeId: String!, $locationId: String!, $startsAt: String!, $endsAt: String!) {
    pickupSlots(placeId: $placeId, locationId: $locationId, startsAt: $startsAt, endsAt: $endsAt) {
      deliveryDate
      slots {
        id
        type
        date
        startsAt
        endsAt
        graceDays
        graceHours
        deliveryPrice
        collectionPrice
        deliveryType
        active
        pickupLocationId
      }
    }
  }
`

export const getDeliveryAreaGroups = gql`
  query deliveryAreaGroups($placeId: String!, $latitude: Float, $longitude: Float) {
    deliveryAreaGroups(placeId: $placeId, latitude: $latitude, longitude: $longitude) {
      id
      storeId
      name
    }
  }
`
