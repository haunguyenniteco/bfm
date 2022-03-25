import { styled } from '@mui/material/styles'
import Badge from '@mui/material/Badge'
import PopoverMui from '@mui/material/Popover'
import Box from '@mui/material/Box'

export const StyledBadge = styled(Badge)`
  & > span {
    color: #fff;
  }
`
export const Popover = styled(PopoverMui)`
  .MuiPopover-paper {
    box-shadow: unset;
    background-color: unset;
  }
`
export const StyledBox = styled(Box)`
  text-align: center;
  margin-left: 24px;

  @media (min-width: 768px) {
    text-align: left;
    margin-left: 0;
  }
`
