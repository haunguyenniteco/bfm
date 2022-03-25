import Grid from '@mui/material/Grid'
import Box from '@mui/material/Box'
import { FormattedMessage } from 'react-intl'
import { CurrencyPrice } from '@components/common'
import messages from './messages'

const DepositPrice = ({ prices }) => {
  return (
    <Grid item>
      <Box fontWeight="bold" fontSize={10}>
        <FormattedMessage {...messages.deposit} />
        &nbsp;
        <CurrencyPrice value={prices.depositPrice} />
      </Box>
    </Grid>
  )
}

export default DepositPrice
