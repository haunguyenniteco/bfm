```jsx
import MenuItem from '@mui/material/MenuItem';
import InputAdornment from '@mui/material/InputAdornment';
import CreditCardIcon from '@mui/icons-material/CreditCard';
const options = [
  {
    value: '1',
    label: 'Value 1',
  },
  {
    value: '2',
    label: 'Value 2',
  },
  {
    value: '3',
    label: 'Value 3',
  },
];
<>
  <TextField label="Label / Placeholder" />
  <TextField label="Label" value="Active Input" />
  <TextField label="Label" value="Value" />
  <TextField label="Label" value="Input Text" error helperText="Error Description goes here…" />
  <TextField label="Label / Placeholder" select>
    {options.map(option => (
      <MenuItem key={option.value} value={option.value}>
        {option.label}
      </MenuItem>
    ))}
  </TextField>
  <TextField label="Label / Placeholder" select value="3">
    {options.map(option => (
      <MenuItem key={option.value} value={option.value}>
        {option.label}
      </MenuItem>
    ))}
  </TextField>
  <TextField
    label="Card Number"
    InputProps={{
      startAdornment: (
        <InputAdornment position="start">
          <CreditCardIcon />
        </InputAdornment>
      ),
    }}
    value="4242 4242 4242 4242"
  />
</>