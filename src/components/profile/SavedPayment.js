import Typography from '@components/ui/Typography/index'
import Box from '@mui/material/Box'
import { CreditCardIcon, DeleteButton, DeleteIcon, Truncate } from './elements'

const SavedPayment = ({ address = 'Visa **** **** **** 1234' }) => {
  return (
    <Box display="flex" alignItems="center" sx={{ padding: '11px 0' }}>
      <CreditCardIcon />
      <Truncate fontSize={2} lineHeight={1.25} ml="15px" color="G1">
        <Typography>{address}</Typography>
      </Truncate>
      <DeleteButton variant="outline">
        <DeleteIcon />
      </DeleteButton>
    </Box>
  )
}

export default SavedPayment
