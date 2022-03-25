import { FormattedMessage } from 'react-intl'
import { joinStrings, formatSlotTime, isPickup, isDelivery, getType } from '@lib/helpers'
import { useRouter } from 'next/router'
import useAppState from '@hooks/useAppState'
import useChangeLanguage from '@hooks/useChangeLanguage'
import Box from '@mui/material/Box'
import { ArrowRight } from '../elements'
import messages from '../messages'

export const BasketDeliveryAndSlotSelector = ({ delivery, address, urlPath = '', editableMode = false }) => {
  const router = useRouter()
  const { intl } = useAppState()
  const { locale } = useChangeLanguage()

  let addressLine
  if (isPickup(delivery?.type)) {
    const { store } = delivery
    addressLine = joinStrings(store.street, store.postcode, store.city)
  } else if (isDelivery(delivery?.type)) {
    addressLine = address?.formattedAddress
  }

  let storeName = ''
  if (delivery?.store?.name) {
    storeName = `${delivery.store.name},`
  }

  let slotLine
  if (delivery?.slot) {
    slotLine = formatSlotTime(delivery.slot, intl.formatMessage(messages.today), locale)
  }
  return (
    <Box>
      {(addressLine || slotLine) && (
        <Box py={2} sx={{ borderBottom: '1px solid #f6f6f6' }}>
          {addressLine && (
            <Box display="flex" justifyContent="space-between" alignItems="center">
              <Box flex={1}>
                <Box fontSize="12px" mb="5px">
                  <FormattedMessage {...messages[`${getType(delivery?.type)}Address`]} />
                </Box>
                {isPickup(delivery?.type) && false && (
                  <Box fontSize="16px" letterSpacing={-0.25}>
                    {delivery.store.name}
                  </Box>
                )}
                <Box fontSize="16px" letterSpacing={-0.25}>
                  {`${storeName} ${addressLine}`}
                </Box>
                <Box fontSize="16px" letterSpacing={-0.25}>
                  {slotLine}
                </Box>
              </Box>

              {editableMode && (
                <Box>
                  <ArrowRight
                    onClick={() => {
                      router.replace(`/get-address?redirectUrl=/${urlPath}`)
                    }}
                  />
                </Box>
              )}
            </Box>
          )}
          {slotLine && false && (
            <Box display="flex" justifyContent="space-between" alignItems="flex-end">
              <Box flex={1} pt={3}>
                <Box fontSize="12px" mb="5px">
                  <FormattedMessage {...messages[`${getType(delivery?.type)}Time`]} />
                </Box>
                <Box fontSize="18px" letterSpacing={-0.25}>
                  {slotLine}
                </Box>
              </Box>
              {editableMode && (
                <Box>
                  <ArrowRight
                    onClick={() => {
                      router.replace(`/select-slot?redirectUrl=/${urlPath}`)
                    }}
                  />
                </Box>
              )}
            </Box>
          )}
        </Box>
      )}
    </Box>
  )
}

export const OrderDeliveryAndSlotSelector = ({ order, storeInfo, urlPath = '', editableMode = false }) => {
  const { intl } = useAppState()
  const { locale } = useChangeLanguage()
  const router = useRouter()

  let addressLine
  if (isPickup(order?.deliveryType)) {
    addressLine = joinStrings(storeInfo.street, storeInfo.postcode, storeInfo.city)
  } else {
    addressLine = order?.address
  }

  let slotLine

  if (order?.deliverySlot) {
    const { startTime, endTime, deliveryDate } = order.deliverySlot
    slotLine = formatSlotTime(
      { startsAt: startTime, endsAt: endTime, date: deliveryDate },
      intl.formatMessage(messages.today),
      locale,
    )
  }

  return (
    <div>
      {(addressLine || slotLine) && (
        <Box display="flex" flexDirection="row" py={2}>
          <Box flex={1}>
            {addressLine && (
              <Box display="flex" justifyContent="space-between" alignItems="flex-end">
                <Box flex={1}>
                  <Box fontSize="12px" mt="30px" mb="5px">
                    <FormattedMessage {...messages[`${getType(order.deliveryType)}Address`]} />
                  </Box>
                  {isPickup(order.deliveryType) && false && (
                    <Box fontSize="16px" letterSpacing={-0.25}>
                      {storeInfo.name}
                    </Box>
                  )}
                  <Box fontSize="16px" letterSpacing={-0.25}>
                    {addressLine}
                  </Box>
                  <Box fontSize="18px" letterSpacing={-0.25}>
                    {slotLine}
                  </Box>
                </Box>
              </Box>
            )}
            {slotLine && false && (
              <Box display="flex" justifyContent="space-between" alignItems="flex-end">
                <Box flex={1} pt={3}>
                  <Box fontSize="12px" mb="5px">
                    <FormattedMessage {...messages[`${getType(order?.deliveryType)}Time`]} />
                  </Box>
                  <Box fontSize="18px" letterSpacing={-0.25}>
                    {slotLine}
                  </Box>
                </Box>
              </Box>
            )}
          </Box>
          {editableMode && (
            <Box alignSelf="center">
              <ArrowRight
                onClick={() => {
                  router.replace(`/get-address?redirectUrl=/${urlPath}`)
                }}
              />
            </Box>
          )}
        </Box>
      )}
    </div>
  )
}
