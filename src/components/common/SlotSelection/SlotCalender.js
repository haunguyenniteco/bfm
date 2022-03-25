import { useState, useEffect, useCallback } from 'react'
import Box from '@mui/material/Box'
import IconButton from '@mui/material/IconButton'
import ChevronRightIcon from '@mui/icons-material/ChevronRight'
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft'
import { format, add, sub, eachDayOfInterval, endOfWeek, startOfWeek, isSameDay, isBefore, isToday } from 'date-fns'
import { DayColumn, DayName, DayNumber } from './elements'

const getDaysOfWeek = date => {
  const start = startOfWeek(date, { weekStartsOn: 1 })
  const end = endOfWeek(start, { weekStartsOn: 1 })
  const result = eachDayOfInterval({ start, end })
  return result
}

const defaultFormat = 'yyyy-MM-dd'

const now = new Date()

const DaysOfWeek = ({ daysOfWeek, selected, onDayClick }) => {
  const daysOfWeekItems = daysOfWeek.map(day => {
    const active = isSameDay(selected, day)
    const disabled = isBefore(day, now) && !isToday(day)
    return (
      <DayColumn key={day} active={active} disabled={disabled} onClick={() => onDayClick(day)}>
        <DayName>{format(day, 'ccc')}</DayName>
        <DayNumber>{format(day, 'dd')}</DayNumber>
      </DayColumn>
    )
  })
  return (
    <Box display="flex" flex={1}>
      {daysOfWeekItems}
    </Box>
  )
}

function SlotCalender({ onDateRangeChange, onDateChange }) {
  const [daysOfWeek, setDaysOfWeek] = useState(() => getDaysOfWeek(now))
  const [selected, setSelected] = useState(now)

  const handlePrevOrNext = useCallback(
    type => {
      let prevOrNextDate

      if (type === 'prev') {
        prevOrNextDate = sub(daysOfWeek[0], { days: 1 })
      } else {
        prevOrNextDate = add(daysOfWeek[6], { days: 1 })
      }

      const prevOrNextDaysOfWeek = getDaysOfWeek(prevOrNextDate)
      setDaysOfWeek(prevOrNextDaysOfWeek)
    },
    [daysOfWeek],
  )

  const handleDayClick = day => {
    setSelected(day)
    onDateChange(day)
  }

  useEffect(() => {
    const initSelected = isBefore(daysOfWeek[0], now) ? now : daysOfWeek[0]
    setSelected(initSelected)
    onDateRangeChange({
      startsAt: format(initSelected, defaultFormat),
      endsAt: format(daysOfWeek[6], defaultFormat),
    })
    onDateChange(initSelected)
  }, [daysOfWeek])

  return (
    <Box display="flex" alignItems="center" mt="10px">
      {!isBefore(daysOfWeek[0], now) && (
        <IconButton onClick={() => handlePrevOrNext('prev')} data-cy="prev" edge="start" color="primary">
          <ChevronLeftIcon />
        </IconButton>
      )}
      <DaysOfWeek daysOfWeek={daysOfWeek} selected={selected} onDayClick={handleDayClick} data-cy="selected" />
      <IconButton onClick={() => handlePrevOrNext('next')} data-cy="next" edge="end" color="primary">
        <ChevronRightIcon />
      </IconButton>
    </Box>
  )
}

export default SlotCalender
