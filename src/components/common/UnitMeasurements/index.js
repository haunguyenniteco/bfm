/**
 * UnitMeasurements
 */

import { FormattedMessage } from 'react-intl'
import PropTypes from 'prop-types'
import messages from './messages'

function UnitMeasurements(props) {
  const { unit } = props
  if (!unit) return null
  if (!messages[unit]) return unit
  return <FormattedMessage {...messages[unit]} />
}

UnitMeasurements.propTypes = {
  unit: PropTypes.string,
}

export default UnitMeasurements
