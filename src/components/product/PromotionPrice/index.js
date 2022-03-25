/**
 * CurrencyPrice
 */

import PropTypes from 'prop-types'
import { FormattedNumber } from 'react-intl'
import { OldPrice, NewPrice } from './elements.js'

function PromotionPrice({ oldPrice, newPrice, minDigits, maxDigits, currency, style, currencyDisplay }) {
  return (
    <>
      <NewPrice>
        <FormattedNumber
          value={newPrice}
          style={style}
          currency={currency}
          currencyDisplay={currencyDisplay}
          useGrouping
          minimumFractionDigits={minDigits}
          maximumFractionDigits={maxDigits}
        />
      </NewPrice>
      <OldPrice>
        <FormattedNumber
          value={oldPrice}
          style={style}
          currency={currency}
          currencyDisplay={currencyDisplay}
          useGrouping
          minimumFractionDigits={minDigits}
          maximumFractionDigits={maxDigits}
        />
      </OldPrice>
    </>
  )
}

PromotionPrice.defaultProps = {
  minDigits: 2,
  maxDigits: 2,
  currency: 'AUD',
  style: 'currency',
  currencyDisplay: 'symbol',
}

PromotionPrice.propTypes = {
  oldPrice: PropTypes.number.isRequired,
  newPrice: PropTypes.number.isRequired,
  minDigits: PropTypes.number,
  maxDigits: PropTypes.number,
  currency: PropTypes.string,
  style: PropTypes.string,
  currencyDisplay: PropTypes.string,
}

export default PromotionPrice
