import PropTypes from 'prop-types'
import { FormattedNumber } from 'react-intl'

function CurrencyPrice({ about, value, minDigits, maxDigits, currency, style, currencyDisplay }) {
  return (
    <>
      {about && '~'}
      <FormattedNumber
        value={value}
        style={style}
        currency={currency}
        currencyDisplay={currencyDisplay}
        useGrouping
        minimumFractionDigits={minDigits}
        maximumFractionDigits={maxDigits}
      />
    </>
  )
}

CurrencyPrice.defaultProps = {
  minDigits: 2,
  maxDigits: 2,
  currency: 'AUD',
  style: 'currency',
  currencyDisplay: 'symbol',
}

CurrencyPrice.propTypes = {
  value: PropTypes.number.isRequired,
  minDigits: PropTypes.number,
  maxDigits: PropTypes.number,
  currency: PropTypes.string,
  style: PropTypes.string,
  currencyDisplay: PropTypes.string,
}

export default CurrencyPrice
