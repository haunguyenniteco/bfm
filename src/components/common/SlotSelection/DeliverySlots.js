import { useDeliverySlots, useDeliveryAreaGroups } from '@graphql-sdk'
import { removePastSlots } from '@lib/helpers'
import SlotList from './SlotList'

const DeliverySlots = ({ dateRange, selected, selectedDate, onSelect, store, address, type }) => {
  const { masterId } = store

  const { data: { deliveryAreaGroups } = {} } = useDeliveryAreaGroups(
    { placeId: masterId, latitude: address?.lat, longitude: address?.lon },
    { skip: !dateRange || !address },
  )

  const {
    data: { deliverySlots = [] } = {},
    loading,
    error,
  } = useDeliverySlots(
    {
      placeId: masterId,
      deliveryAreaGroupId: String(deliveryAreaGroups?.[0]?.id),
      ...dateRange,
    },
    { skip: !dateRange || !deliveryAreaGroups?.[0]?.id },
  )

  const upcomingDeliverySlots = [...deliverySlots].map(slot => removePastSlots(slot))

  return (
    <SlotList
      slotData={upcomingDeliverySlots}
      selectedDate={selectedDate}
      onSelect={onSelect}
      selected={selected}
      type={type}
      error={error}
      loading={loading}
    />
  )
}

DeliverySlots.propTypes = {}

export default DeliverySlots
