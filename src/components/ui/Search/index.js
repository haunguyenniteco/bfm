import TextField from '@mui/material/TextField'
import InputAdornment from '@mui/material/InputAdornment'
import IconButton from '@mui/material/IconButton'
import SearchIcon from '@mui/icons-material/Search'
import CloseIcon from '@mui/icons-material/Close'
import messages from 'components/common/Header/messages'
import useAppState from '@hooks/useAppState'
import { styled } from '@mui/material/styles'

const StyledSearchField = styled(TextField)`
  & > div {
    border: 1px solid transparent;
    border-radius: 4px;
    transition: 0.3s;
  }

  & > div.Mui-focused {
    border-color: #bbb;
    background: #fff;
  }

  & svg {
    color: #000;
  }
`

const Search = ({ value, onChange, ...props }) => {
  const { intl } = useAppState()
  return (
    <StyledSearchField
      variant="outlined"
      placeholder={intl.formatMessage(messages.search)}
      margin="none"
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">
            <SearchIcon />
          </InputAdornment>
        ),
        endAdornment: value ? (
          <InputAdornment position="end">
            <IconButton
              size="small"
              aria-label={intl.formatMessage(messages.clearSearch)}
              title={intl.formatMessage(messages.clearSearch)}
              onClick={() => {
                onChange({ target: { value: '' } })
              }}
            >
              <CloseIcon />
            </IconButton>
          </InputAdornment>
        ) : null,
      }}
      value={value}
      onChange={onChange}
      {...props}
    />
  )
}

export default Search
