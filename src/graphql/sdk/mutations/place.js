import { gql } from '@apollo/client'

export const RESERVE_DELIVERY_SLOT = gql`
  mutation ReserveDeliverySlot($placeId: String!, $deliveryAreaGroupId: Int!, $id: Int!, $deliveryDate: String!) {
    reserveDeliverySlot(
      placeId: $placeId
      deliveryAreaGroupId: $deliveryAreaGroupId
      id: $id
      deliveryDate: $deliveryDate
    ) {
      slot {
        id
        timezone
        collectionPrice
        deliveryType
        deliveryAreaGroupId
        deliveryAreaGroupName
        deliveryPrice
        startsAt
        endsAt
      }
      expiresAt
      token
    }
  }
`

export const REFRESH_DELIVERY_SLOT_RESERVATION = gql`
  mutation RefreshDeliverySlotReservation($placeId: String!, $deliveryAreaGroupId: Int!, $id: Int!, $token: String!) {
    refreshDeliverySlotReservation(
      placeId: $placeId
      deliveryAreaGroupId: $deliveryAreaGroupId
      id: $id
      token: $token
    ) {
      slot {
        id
        timezone
        collectionPrice
        deliveryType
        deliveryAreaGroupId
        deliveryAreaGroupName
        deliveryPrice
        startsAt
        endsAt
      }
      expiresAt
      token
    }
  }
`

export const CANCEL_DELIVERY_SLOT_RESERVATION = gql`
  mutation CancelDeliverySlotReservation($placeId: String!, $deliveryAreaGroupId: Int!, $id: Int!, $token: String!) {
    cancelDeliverySlotReservation(placeId: $placeId, deliveryAreaGroupId: $deliveryAreaGroupId, id: $id, token: $token)
  }
`

export const RESERVE_PICKUP_SLOT = gql`
  mutation ReservePickupSlot($placeId: String!, $pickupLocationId: Int!, $id: Int!, $deliveryDate: String!) {
    reservePickupSlot(placeId: $placeId, pickupLocationId: $pickupLocationId, id: $id, deliveryDate: $deliveryDate) {
      slot {
        id
        timezone
        collectionPrice
        deliveryType
        pickupLocationId
        deliveryPrice
        startsAt
        endsAt
      }
      expiresAt
      token
    }
  }
`

export const REFRESH_PICKUP_SLOT_RESERVATION = gql`
  mutation RefreshPickupSlotReservation($placeId: String!, $pickupLocationId: Int!, $id: Int!, $token: String!) {
    refreshPickupSlotReservation(placeId: $placeId, pickupLocationId: $pickupLocationId, id: $id, token: $token) {
      slot {
        id
        timezone
        collectionPrice
        deliveryType
        pickupLocationId
        deliveryPrice
        startsAt
        endsAt
      }
      expiresAt
      token
    }
  }
`

export const CANCEL_PICKUP_SLOT_RESERVATION = gql`
  mutation CancelPickupSlotReservation($placeId: String!, $pickupLocationId: Int!, $id: Int!, $token: String!) {
    cancelPickupSlotReservation(placeId: $placeId, pickupLocationId: $pickupLocationId, id: $id, token: $token)
  }
`
