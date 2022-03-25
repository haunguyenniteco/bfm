import { FormattedMessage } from 'react-intl'
import Checkbox from '@mui/material/Checkbox'
import FormControlLabel from '@mui/material/FormControlLabel'
import Box from '@mui/material/Box'
import Link from '@mui/material/Link'
import messages from './messages'

const TermsAndCondition = ({ checked, setChecked }) => {
  return (
    <FormControlLabel
      control={
        <Checkbox name="termsAndConditions" checked={checked} onChange={e => setChecked(e.target.checked)} required />
      }
      label={
        <Box>
          <FormattedMessage {...messages.termsDescription} />
          <Link href="/terms-of-service" color="primary" variant="inherit" target="_blank">
            &nbsp;
            <FormattedMessage {...messages.termsDescriptionLink} />
          </Link>
        </Box>
      }
    />
  )
}

export default TermsAndCondition
