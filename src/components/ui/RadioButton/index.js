/**
 * Radio
 */

import PropsTypes from 'prop-types'
import { RadioWrapper, RadioOuter, RadioInner } from './elements'

const RadioButton = ({ checked = false, ...other }) => (
  <RadioWrapper {...other}>
    <RadioOuter>
      <RadioInner className={checked ? 'checked' : ''} />
    </RadioOuter>
  </RadioWrapper>
)

RadioButton.propTypes = {
  checked: PropsTypes.bool,
}

export default RadioButton
