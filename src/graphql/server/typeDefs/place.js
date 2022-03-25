const { gql } = require('apollo-server-micro')

export default gql`
  type PickupSlotItem {
    id: ID!
    pickupLocationId: String
    deliveryAreaGroupId: String
    type: String
    date: String
    startsAt: String
    endsAt: String
    graceDays: Int
    graceHours: Float
    deliveryPrice: Float
    collectionPrice: Float
    deliveryType: Int
    active: Boolean
  }

  type DeliverySlotItem {
    startsAt: String!
    endsAt: String!
    graceDays: Int
    graceHours: Float
    collectionPrice: Float
    deliveryPrice: Float
    deliveryType: Int
    discountedSlot: Boolean
    orderQuota: Int
    id: Int!
    isFull: Boolean
    timezone: String
    deliveryAreaGroupId: Int
    deliveryAreaGroupName: String
    organizationId: String
    date: String
  }

  type DeliveryAreaGroup {
    id: Int!
    storeId: String!
    name: String!
  }

  type PickupSlot {
    deliveryDate: String!
    slots: [PickupSlotItem]
  }

  type DeliverySlot {
    deliveryDate: String!
    slots: [DeliverySlotItem]
  }

  type Chain {
    name: String
    type: String
    logoUrl: String
  }

  type Place {
    id: ID!
    name: String!
    street: String
    building: String
    postcode: String
    city: String
    latitude: String
    longitude: String
    distance: Float
    placeId: String
    masterId: String
    chain: Chain
  }

  type PlacesForPickupAndDeliveries {
    pickups: [Place]
    deliveries: [Place]
  }

  type Query {
    placesForPickupAndDeliveries(input: PlacesForPickupAndDeliveriesQueryInput): PlacesForPickupAndDeliveries
    deliverySlots(placeId: String!, deliveryAreaGroupId: String!, startsAt: String!, endsAt: String!): [DeliverySlot]
    pickupSlots(placeId: String!, locationId: String!, startsAt: String!, endsAt: String!): [PickupSlot]
    deliveryAreaGroups(placeId: String!, latitude: Float, longitude: Float): [DeliveryAreaGroup]
  }

  type Slot {
    id: Int
    timezone: String
    collectionPrice: Float
    deliveryType: Int
    deliveryAreaGroupId: Int
    deliveryAreaGroupName: String
    deliveryPrice: Float
    pickupLocationId: Int
    startsAt: String
    endsAt: String
  }

  type SlotReservationDetails {
    slot: Slot
    expiresAt: String
    token: String!
  }

  type Mutation {
    reserveDeliverySlot(
      placeId: String!
      deliveryAreaGroupId: Int!
      id: Int!
      deliveryDate: String!
    ): SlotReservationDetails
    refreshDeliverySlotReservation(
      placeId: String!
      deliveryAreaGroupId: Int!
      id: Int!
      token: String!
    ): SlotReservationDetails
    cancelDeliverySlotReservation(placeId: String!, deliveryAreaGroupId: Int!, id: Int!, token: String!): Boolean
    reservePickupSlot(placeId: String!, pickupLocationId: Int!, id: Int!, deliveryDate: String!): SlotReservationDetails
    refreshPickupSlotReservation(
      placeId: String!
      pickupLocationId: Int!
      id: Int!
      token: String!
    ): SlotReservationDetails
    cancelPickupSlotReservation(placeId: String!, pickupLocationId: Int!, id: Int!, token: String!): Boolean
  }
`
