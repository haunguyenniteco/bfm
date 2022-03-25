```jsx padded
import Stack from '@mui/material/Stack';

const filters = ['Organic', 'Domestic', 'Private Label']
const Example = ({ filters }) => {
  const [state, setState] = React.useState([])
  return (
    <Stack spacing={2} direction="row">
      {filters.map(filter => (
        <Chip
          key={filter}
          label={filter}
          color={state.includes(filter) ? 'primary' : 'default'}
          onClick={() => {
            if (state.includes(filter)) {
              setState(state.filter(item => item !== filter))
              return
            }
            setState(state.concat(filter))
          }}
        />
      ))}
    </Stack>
  )
}

<Example filters={filters} />
```
