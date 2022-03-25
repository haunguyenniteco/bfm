/**
 * AppUpdateNotice
 */

import { FormattedMessage } from 'react-intl'
import messages from './messages'

function AppUpdateNotice() {
  return (
    <div>
      <FormattedMessage {...messages.header} />
    </div>
  )
}

AppUpdateNotice.propTypes = {}

export default AppUpdateNotice
