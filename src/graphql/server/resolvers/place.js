import { parseTime } from '../common/helpers'

const placeResolver = {
  Query: {
    placesForPickupAndDeliveries: async (_source, { input }, { dataSources }) => {
      try {
        const [pickups, deliveries] = await Promise.all([
          dataSources.commerceAPI.getPlacesForPickup(input),
          dataSources.commerceAPI.getPlacesForDeliveries(input),
        ])

        return {
          pickups,
          deliveries,
        }
      } catch (error) {
        throw new Error(error.message)
      }
    },

    deliverySlots: async (_source, { placeId, deliveryAreaGroupId, startsAt, endsAt }, { dataSources }) => {
      const data = await dataSources.commerceAPI.getDeliverySlots(placeId, deliveryAreaGroupId, {
        starts_at: startsAt,
        ends_at: endsAt,
        // by default it sends not available slots (even swagger says something else)
        past_slots: false,
      })

      const transformedData = []
      const findIndex = date => transformedData.findIndex(i => i.deliveryDate === date)

      data.forEach(({ date, ...rest }) => {
        const itemIndex = findIndex(date)
        if (itemIndex > -1) {
          transformedData[itemIndex].slots.push({ ...rest, date })
        } else {
          transformedData.push({ deliveryDate: date, slots: [{ ...rest, date }] })
        }
      })

      return transformedData
    },

    pickupSlots: async (_source, { placeId, locationId, startsAt, endsAt }, { dataSources }) => {
      try {
        const data = await dataSources.commerceAPI.getPickupSlots(placeId, locationId, {
          starts_at: startsAt,
          ends_at: endsAt,
          // by default it sends not available slots (even swagger says something else)
          past_slots: false,
        })
        return data
      } catch (err) {
        throw new Error(err.message)
      }
    },

    deliveryAreaGroups: async (_source, { placeId, ...params }, { dataSources }) => {
      try {
        const data = await dataSources.commerceAPI.getDeliveryAreaGroups(placeId, params)
        return data
      } catch (err) {
        throw new Error(err.message)
      }
    },
  },

  Mutation: {
    reserveDeliverySlot: async (_source, _args, { dataSources }) => {
      try {
        const data = await dataSources.commerceAPI.reserveDeliverySlot(_args)
        return data
      } catch (err) {
        throw new Error('Failed to reserve delivery slot.', err)
      }
    },
    reservePickupSlot: async (_source, _args, { dataSources }) => {
      try {
        const data = await dataSources.commerceAPI.reservePickupSlot(_args)
        return data
      } catch (err) {
        throw new Error('Failed to reserve pickup slot.', err)
      }
    },
    cancelDeliverySlotReservation: async (_source, _args, { dataSources }) => {
      try {
        await dataSources.commerceAPI.cancelDeliverySlotReservation(_args)
        return true
      } catch (err) {
        // We are return false for all failed request because backend always throws an error if request fails
        // Ref: throw new Error('Failed to cancel delivery slot reservation.', err)
        return false
      }
    },
    cancelPickupSlotReservation: async (_source, _args, { dataSources }) => {
      try {
        await dataSources.commerceAPI.cancelPickupSlotReservation(_args)
        return true
      } catch (err) {
        // We are return false for all failed request because backend always throws an error if request fails
        // Ref: throw new Error('Failed to cancel pickup slot reservation.', err)
        return false
      }
    },
    refreshDeliverySlotReservation: async (_source, _args, { dataSources }) => {
      try {
        const data = await dataSources.commerceAPI.refreshDeliverySlotReservation(_args)
        return data
      } catch (err) {
        throw new Error('Failed to refresh delivery slot reservation.', err)
      }
    },
    refreshPickupSlotReservation: async (_source, _args, { dataSources }) => {
      try {
        const data = await dataSources.commerceAPI.refreshPickupSlotReservation(_args)
        return data
      } catch (err) {
        throw new Error('Failed to refresh pickup slot reservation.', err)
      }
    },
  },
  Place: {
    placeId: ({ place = {}, masterId = '' }) => place.uuid || masterId,
    masterId: ({ masterId = '' }) => masterId,
  },
  DeliverySlotItem: {
    startsAt: ({ deliveryStartTime }) => deliveryStartTime,
    endsAt: ({ deliveryEndTime }) => deliveryEndTime,
  },
  PickupSlotItem: {
    startsAt: ({ startsAt }) => parseTime(startsAt),
    endsAt: ({ endsAt }) => parseTime(endsAt),
  },
}

export default placeResolver
