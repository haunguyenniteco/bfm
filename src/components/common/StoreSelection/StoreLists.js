import List from '@mui/material/List'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemText from '@mui/material/ListItemText'
import { joinStrings } from '@lib/helpers'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import { Radio } from './elements'

const StoreLists = ({ places = [], selected, onSelect }) => {
  return (
    <List component="nav" aria-label="delivery list" sx={{ bgcolor: 'G4', padding: '15px', margin: '-8px' }}>
      {places.map(place => {
        const addressLine = joinStrings(place.street, place.postcode, place.city)
        return (
          <Box key={place.id} sx={{ bgcolor: 'G5' }}>
            <ListItemButton
              divider
              selected={place.id === selected?.id}
              onClick={() => onSelect(place)}
              sx={{ padding: '10px' }}
            >
              <Radio
                checked={place.id === selected?.id}
                value={place.id}
                onChange={() => onSelect(place)}
                name="store-lists"
              />
              <ListItemText
                primary={<Typography fontWeight="600">{place.name}</Typography>}
                secondary={
                  <Typography variant="body2" component="span" color="text.primary">
                    {addressLine}
                  </Typography>
                }
              />
            </ListItemButton>
          </Box>
        )
      })}
    </List>
  )
}

export default StoreLists
