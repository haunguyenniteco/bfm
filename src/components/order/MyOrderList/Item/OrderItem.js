import Link from 'next/link'
import Box from '@mui/material/Box'
import PaymentIcon from '@mui/icons-material/Payment'
import AccessTimeIcon from '@mui/icons-material/AccessTime'
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined'
import ChevronRightIcon from '@mui/icons-material/ChevronRight'
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined'
import IconButton from '@mui/material/IconButton'
import { joinStrings, formatSlotTime, isPickup, isDelivery } from '@lib/helpers'
import { CurrencyPrice } from '@components/common'
import { FormattedMessage } from 'react-intl'
import useChangeLanguage from '@hooks/useChangeLanguage'
import useAppState from '@hooks/useAppState'
import Typography from '@components/ui/Typography/index'
import { Truncate } from '../../elements'
import messages from '../../messages'

const OrderItem = ({ item, storeInfo }) => {
  const { locale } = useChangeLanguage()
  const { intl } = useAppState()

  let addressLine
  if (isPickup(item?.deliveryType)) {
    addressLine = joinStrings(storeInfo?.street, storeInfo?.postcode, storeInfo?.city)
  } else {
    addressLine = item?.address
  }

  let slotLine
  if (item?.deliverySlot) {
    const { startTime, endTime, deliveryDate } = item.deliverySlot
    slotLine = formatSlotTime(
      { startsAt: startTime, endsAt: endTime, date: deliveryDate },
      intl.formatMessage(messages.today),
      locale,
    )
  }
  return (
    <Link href={`/orders/${item.id}`} passHref data-cy="order-link">
      <Box mb={2} padding="12px 15px 16px" bg="white" data-cy="order-item">
        <Typography mb="10px" fontWeight="bold" data-cy="order-number">{`#${item.visibleId}`}</Typography>
        <Box display="flex" flexWrap="wrap" justifyContent="space-between" alignItems="center">
          <Box flex="1">
            <Box display="flex" alignItems="center" sx={{ padding: '2px 0' }} data-cy="address">
              <InfoOutlinedIcon fontSize="small" />
              <Typography ml="12px" sx={{ textTransform: 'uppercase' }}>
                {item.status}
              </Typography>
            </Box>
            <Box display="flex" alignItems="center" sx={{ padding: '2px 0' }} data-cy="address">
              <LocationOnOutlinedIcon fontSize="small" />
              {isDelivery(item?.deliveryType) && (
                <Typography ml="12px">
                  <FormattedMessage {...messages.delivery} />
                  {`: `}
                  {addressLine}
                </Typography>
              )}
              {isPickup(item?.deliveryType) && (
                <Typography ml="12px">
                  <FormattedMessage {...messages.collection} />
                  {`: `}
                  {storeInfo?.name}
                </Typography>
              )}
            </Box>
            <Box display="flex" alignItems="center" sx={{ padding: '2px 0' }} data-cy="timeline">
              <AccessTimeIcon fontSize="small" />
              <Truncate fontSize={2} lineHeight={1.25} ml="15px" color="G1">
                <Typography color="black">{slotLine}</Typography>
              </Truncate>
            </Box>
            <Box display="flex" alignItems="center" sx={{ padding: '2px 0' }} data-cy="amount">
              <PaymentIcon fontSize="small" />
              <Truncate lineHeight={1.25} ml="15px" color="G0">
                <CurrencyPrice value={item.total} minimumFractionDigits={2} maximumFractionDigits={2} />
              </Truncate>
            </Box>
          </Box>
          <IconButton variant="outline" data-cy="more-button">
            <ChevronRightIcon />
          </IconButton>
        </Box>
      </Box>
    </Link>
  )
}

export default OrderItem

OrderItem.propTypes = {}
