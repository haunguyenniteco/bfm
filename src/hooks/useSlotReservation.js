import { useState } from 'react'
import { useMutation } from '@apollo/client'
import { parseISO, add, isBefore, isAfter, format } from 'date-fns'
import { isDelivery, isPickup } from '@lib/helpers'

import {
  RESERVE_DELIVERY_SLOT,
  REFRESH_DELIVERY_SLOT_RESERVATION,
  CANCEL_DELIVERY_SLOT_RESERVATION,
  RESERVE_PICKUP_SLOT,
  REFRESH_PICKUP_SLOT_RESERVATION,
  CANCEL_PICKUP_SLOT_RESERVATION,
} from '@graphql-sdk/mutations/place'
import useInterval from '@hooks/useInterval'

const LOCAL_STORAGE_KEY = 'reservedSlot'
const ONE_MINUTE = 60000
const EXPIRATION_BUFFER = { minutes: 10 }

const useSlotReservation = () => {
  const [userActivity, setUserActivity] = useState(true)
  const [reserveDeliverySlot] = useMutation(RESERVE_DELIVERY_SLOT)
  const [refreshDeliverySlotReservation] = useMutation(REFRESH_DELIVERY_SLOT_RESERVATION)
  const [cancelDeliverySlotReservation] = useMutation(CANCEL_DELIVERY_SLOT_RESERVATION)
  const [reservePickupSlot] = useMutation(RESERVE_PICKUP_SLOT)
  const [cancelPickupSlotReservation] = useMutation(CANCEL_PICKUP_SLOT_RESERVATION)
  const [refreshPickupSlotReservation] = useMutation(REFRESH_PICKUP_SLOT_RESERVATION)

  const parseSlot = slot => {
    return {
      ...slot,
      id: parseInt(slot.id, 10),
      deliveryAreaGroupId: parseInt(slot.deliveryAreaGroupId, 10) || null,
      pickupLocationId: parseInt(slot.pickupLocationId, 10) || null,
    }
  }

  const parseReservation = reservation => {
    return {
      ...reservation,
      slot: {
        ...parseSlot(reservation.slot),
      },
    }
  }

  const getReservedSlot = () => {
    const reserved = JSON.parse(window.localStorage.getItem(LOCAL_STORAGE_KEY))
    return reserved ? parseReservation(reserved) : null
  }

  const setReservedSlot = reservation => {
    if (reservation) {
      window.localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(reservation))
    } else {
      window.localStorage.removeItem(LOCAL_STORAGE_KEY)
    }
  }

  const cancelPreviousReservation = async previous => {
    const {
      store: { placeId },
      slot: { deliveryType, id, deliveryAreaGroupId, pickupLocationId },
      token,
    } = previous

    if (deliveryType === 0) {
      await cancelDeliverySlotReservation({
        variables: {
          placeId,
          deliveryAreaGroupId,
          id,
          token,
        },
      })
    } else {
      await cancelPickupSlotReservation({
        variables: {
          placeId,
          pickupLocationId,
          id,
          token,
        },
      })
    }
  }

  const isSameSlot = (type, slot, previous) => {
    if (isDelivery(type)) {
      return slot.id === previous.slot.id && slot.deliveryAreaGroupId === previous.slot.deliveryAreaGroupId
    }
    if (isPickup(type)) {
      return slot.id === previous.slot.id && slot.pickupLocationId === previous.slot.pickupLocationId
    }
    return false
  }

  const reserveSlot = async delivery => {
    const defaultFormat = 'yyyy-MM-dd'

    const {
      type,
      store: { placeId },
    } = delivery

    const slot = parseSlot(delivery.slot)

    const previousReservation = getReservedSlot()

    if (previousReservation) {
      if (!isSameSlot(type, slot, previousReservation)) {
        await cancelPreviousReservation(previousReservation)
      } else {
        return
      }
    }

    let reservedSlot
    const { date, id, deliveryAreaGroupId, pickupLocationId } = slot

    if (isDelivery(type)) {
      const { data } = await reserveDeliverySlot({
        variables: {
          placeId,
          deliveryAreaGroupId,
          id,
          deliveryDate: format(date, defaultFormat),
        },
      })
      reservedSlot = data.reserveDeliverySlot
    }

    if (isPickup(type)) {
      const { data } = await reservePickupSlot({
        variables: {
          placeId,
          pickupLocationId,
          id,
          deliveryDate: format(date, defaultFormat),
        },
      })
      reservedSlot = data.reservePickupSlot
    }

    const newReservation = { ...reservedSlot, store: delivery.store }

    setReservedSlot(newReservation)
  }

  const reservationExpiring = current => {
    const now = new Date()
    const nowPlusBuffer = add(now, EXPIRATION_BUFFER)
    const expiration = parseISO(current.expiresAt)
    return isBefore(now, expiration) && isAfter(nowPlusBuffer, expiration)
  }

  const refreshSlotReservation = async current => {
    const {
      store,
      slot: { deliveryType, id, deliveryAreaGroupId, pickupLocationId },
      token,
    } = current

    let refreshedReservation

    if (deliveryType === 0) {
      const { data } = await refreshDeliverySlotReservation({
        variables: {
          placeId: store.placeId,
          deliveryAreaGroupId,
          id,
          token,
        },
      })
      refreshedReservation = data.refreshDeliverySlotReservation
    }

    if (deliveryType === 1) {
      const { data } = await refreshPickupSlotReservation({
        variables: {
          placeId: store.placeId,
          pickupLocationId,
          id,
          token,
        },
      })
      refreshedReservation = data.refreshPickupSlotReservation
    }

    const slotReservation = { ...refreshedReservation, store }

    setReservedSlot(slotReservation)
  }

  useInterval(async () => {
    const currentReservation = getReservedSlot()
    if (currentReservation) {
      if (userActivity && reservationExpiring(currentReservation)) {
        return refreshSlotReservation(currentReservation)
      }

      const now = new Date()
      const expiration = parseISO(currentReservation.expiresAt)
      const reservationExpired = isAfter(now, expiration)
      if (reservationExpired) {
        setReservedSlot(null)
        await cancelPreviousReservation(currentReservation)
      }
    }
    setUserActivity(false)
  }, ONE_MINUTE)

  const userActivityObserved = () => {
    setUserActivity(true)
  }

  const clearSlot = () => setReservedSlot(null)

  const refreshSlotReservationToken = () => {
    const currentReservation = getReservedSlot()
    if (currentReservation) {
      refreshSlotReservation(currentReservation)
    }
  }

  return {
    getReservedSlot,
    reserveSlot,
    userActivityObserved,
    clearSlot,
    refreshSlotReservationToken,
  }
}

export default useSlotReservation
