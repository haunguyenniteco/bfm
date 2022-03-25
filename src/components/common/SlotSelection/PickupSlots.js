import { usePickupSlots } from '@graphql-sdk'
import { removePastSlots } from '@lib/helpers'
import SlotList from './SlotList'

const PickupSlots = ({ placeId, dateRange, selected, selectedDate, onSelect, store, type }) => {
  const {
    data: { pickupSlots = [] } = {},
    loading,
    error,
  } = usePickupSlots(
    {
      placeId,
      locationId: store?.id,
      ...dateRange,
    },
    { skip: !dateRange || !store?.id },
  )

  const upcomingPickupSlots = [...pickupSlots].map(slot => removePastSlots(slot))

  return (
    <SlotList
      slotData={upcomingPickupSlots}
      selectedDate={selectedDate}
      onSelect={onSelect}
      selected={selected}
      type={type}
      error={error}
      loading={loading}
    />
  )
}

PickupSlots.propTypes = {}

export default PickupSlots
