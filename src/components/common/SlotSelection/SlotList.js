import { FormattedMessage } from 'react-intl'
import isSameDay from 'date-fns/isSameDay'
import Skeleton from '@mui/material/Skeleton'
import { CurrencyPrice } from '@components/common'
import { isDelivery } from '@lib/helpers'
import Box from '@mui/material/Box'
import Typography from '@components/ui/Typography'
import List from '@mui/material/List'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemText from '@mui/material/ListItemText'
import messages from './messages'
import { Radio } from './elements'

const sortData = (a, b) => {
  const piece1 = a.startsAt.split(':')
  const piece2 = b.startsAt.split(':')
  return parseInt(piece1[0], 10) - parseInt(piece2[0], 10)
}

const SlotList = ({ slotData = [], selected, selectedDate, onSelect, type, error, loading }) => {
  const slotsForDate = slotData.find(s => isSameDay(new Date(s.deliveryDate), selectedDate))?.slots
  const slots = slotsForDate ? [...slotsForDate].sort(sortData) : []

  if (loading) {
    return (
      <Box>
        <Skeleton height={50} />
        <Skeleton height={50} />
        <Skeleton height={50} />
      </Box>
    )
  }

  if (!slots?.[0] || error) {
    return (
      <Typography fontSize="28px" lineHeight={1.5} py="24px">
        <FormattedMessage {...messages.noSlot} />
      </Typography>
    )
  }
  const handleSlotSelection = slot => {
    if (!slot?.isFull) {
      onSelect(slot)
    }
  }

  return (
    <List component="nav" aria-label="slot list" sx={{ bgcolor: 'G4', padding: '15px' }}>
      {slots.map(slot => {
        return (
          <Box key={slot.id} sx={{ bgcolor: 'G5' }}>
            <ListItemButton
              divider
              selected={slot.id === selected?.id}
              onClick={() => handleSlotSelection(slot)}
              sx={{ boxShadow: 0, padding: '5px 10px 5px 0', bgcolor: 'G5', opacity: slot?.isFull ? 0.5 : 1 }}
            >
              <Radio
                checked={slot.id === selected?.id}
                value={slot.id}
                onChange={() => onSelect(slot)}
                name="slot-radio"
              />
              <ListItemText
                primary={
                  <Box display="flex" fontSize="16px" flex="1" justifyContent="space-between" alignItems="center">
                    <Typography>{`${slot.startsAt} - ${slot.endsAt}`}</Typography>
                    <Typography fontWeight="bold">
                      <CurrencyPrice value={(isDelivery(type) ? slot.deliveryPrice : slot.collectionPrice) || 0} />
                    </Typography>
                  </Box>
                }
              />
            </ListItemButton>
          </Box>
        )
      })}
    </List>
  )
}

export default SlotList
