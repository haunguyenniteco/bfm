import { FormattedMessage } from 'react-intl'
import { CurrencyPrice } from '@components/common'
import { useBasket } from '@components/basket/BasketItem/context'
import { PriceRow, PriceTitle, Price } from '../elements'
import messages from '../messages'

export const PriceSummary = ({ subtotal, total, deliveryCharge, isShowOnlyTotal }) => (
  <PriceRow data-cy="price-summary">
    {!isShowOnlyTotal && (
      <>
        <PriceTitle>
          <FormattedMessage {...messages.subtotal} />
        </PriceTitle>
        <Price>
          <CurrencyPrice value={parseFloat(subtotal)} />
        </Price>
        <PriceTitle>
          <FormattedMessage {...messages.deliveryCharge} />
        </PriceTitle>
        <Price>
          <CurrencyPrice value={deliveryCharge} />
        </Price>
      </>
    )}
    <PriceTitle>
      <strong>
        <FormattedMessage {...messages.total} />
      </strong>
    </PriceTitle>
    <Price>
      <strong>
        <CurrencyPrice value={total} />
      </strong>
    </Price>
  </PriceRow>
)

const Summary = props => {
  const {
    state: { totalPrice, totalToPay, deliveryCharge },
  } = useBasket()
  return <PriceSummary subtotal={totalPrice} total={totalToPay} deliveryCharge={deliveryCharge} {...props} />
}

export default Summary
