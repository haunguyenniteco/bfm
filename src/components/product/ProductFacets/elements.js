import { styled } from '@mui/material/styles'
import ToggleButton from '@mui/material/ToggleButton'
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup'

export const StyledToggleButton = styled(ToggleButton)(({ theme }) => ({
  margin: '0 0 8px 6px !important',
  padding: '0 17px 0 16px',
  width: 'auto',
  height: '34px;',
  boxSizing: 'border-box',
  whiteSpace: 'nowrap',
  borderRadius: '100px !important',
  fontSize: '12px',
  fontWeight: 'normal',
  color: '#191919',
  borderColor: `${theme.palette.darkGrey} !important`,
  backgroundColor: `${theme.palette.whiteGrey}`,
  '&.Mui-selected': {
    backgroundColor: theme.palette.primary.dark,
    color: theme.palette.white,
    border: `1px solid ${theme.palette.primary.dark} !important`,
    ':hover': {
      border: `1px solid ${theme.palette.primary.dark} !important`,
      backgroundColor: theme.palette.primary.dark,
    },
  },
}))

export const StyledToggleButtonGroup = styled(ToggleButtonGroup)(({ theme }) => ({
  flexWrap: 'wrap',
  [theme.breakpoints.down('md')]: {
    overflowX: 'auto',
    overflowY: 'hidden',
    whiteSpace: 'nowrap',
    height: '44px',
    flexDirection: 'column',
    rowGap: '20px;',
  },
  [theme.breakpoints.down('sm')]: {
    width: '100%',
  },
}))
