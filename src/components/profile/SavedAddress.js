import Typography from '@components/ui/Typography/index'
import Box from '@mui/material/Box'
import { AddressIcon, DeleteButton, DeleteIcon, Truncate } from './elements'

const SavedAddress = ({ address = ' Hämeentie 19 A, 00500, Helsinki' }) => {
  return (
    <Box display="flex" alignItems="center" sx={{ padding: '11px 0' }}>
      <AddressIcon />
      <Truncate fontSize={2} lineHeight={1.25} ml="15px" color="G1">
        <Typography>{address}</Typography>
      </Truncate>
      <DeleteButton variant="outline">
        <DeleteIcon />
      </DeleteButton>
    </Box>
  )
}

export default SavedAddress
