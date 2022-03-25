import Link from 'next/link'
import { joinStrings, formatSlotTime, isPickup, isDelivery } from '@lib/helpers'
import { useRouter } from 'next/router'
import { FormattedMessage } from 'react-intl'
import useChangeLanguage from '@hooks/useChangeLanguage'
import { useStoreInfo } from '@graphql-sdk'
import { useBasket } from '@components/basket/BasketItem/context'
import useAppState from '@hooks/useAppState'
import PlaceIcon from '@icons/Place'
import ArrowForwardIcon from '@mui/icons-material/ArrowForward'
import Typography from '@components/ui/Typography/index'
import Button from '@components/ui/Button'
import messages from './messages'

const ServiceCheck = props => {
  const router = useRouter()
  const { intl, storeId } = useAppState()
  const {
    state: {
      shipping: { delivery, address },
    },
  } = useBasket()

  const { data: { storeInfo } = {} } = useStoreInfo({ storeId })
  const { locale } = useChangeLanguage()

  let addressLine
  if (isPickup(delivery?.type)) {
    const { store } = delivery
    addressLine = joinStrings(store.name)
  } else if (isDelivery(delivery?.type)) {
    addressLine = address?.formattedAddress
  }

  let slotLine
  if (delivery?.slot) {
    slotLine = formatSlotTime(delivery?.slot, intl.formatMessage(messages.today), locale)
  }

  const collectionStore = addressLine || storeInfo?.name
  const addressAndSlotLine = addressLine || slotLine

  return (
    <Link
      passHref
      href={
        addressAndSlotLine
          ? `/select-slot?redirectUrl=${router.asPath || ''}`
          : `/get-address?redirectUrl=${router.asPath || ''}`
      }
    >
      <Button
        variant="text"
        color="inherit"
        startIcon={<PlaceIcon color="primary" />}
        endIcon={<ArrowForwardIcon />}
        {...props}
      >
        <div style={{ maxWidth: 'calc(100% - 48px)' }}>
          <Typography variant="body2" noWrap>
            {!addressAndSlotLine && <FormattedMessage {...messages.selectService} />}
            {addressAndSlotLine && (
              <>
                {isDelivery(delivery?.type) ? (
                  <FormattedMessage {...messages.deliveryService} values={{ addressLine }} />
                ) : (
                  <FormattedMessage {...messages.collectionService} values={{ collectionStore }} />
                )}
              </>
            )}
          </Typography>
          {/* Second line with primary color */}
          {addressAndSlotLine && (
            <Typography variant="caption" color="primary" component="p" noWrap>
              {slotLine ? (
                <FormattedMessage {...messages.slotReserved} values={{ slotLine }} />
              ) : (
                <FormattedMessage {...messages.checkSlotAvailability} />
              )}
            </Typography>
          )}
        </div>
      </Button>
    </Link>
  )
}

export default ServiceCheck
