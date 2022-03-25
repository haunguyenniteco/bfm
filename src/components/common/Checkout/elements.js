/**
 * styled elements for Basket
 */

import { styled } from '@mui/material/styles'
import { Right } from '@components/Icons'

export const ArrowRight = styled(Right)`
  width: 28px;
  height: 28px;
  cursor: pointer;

  &:hover {
    color: ${({ theme }) => theme.palette.brand};
  }
`
