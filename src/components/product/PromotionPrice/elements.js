/**
 * styled elements for Radio
 */

import { styled } from '@mui/material/styles'

export const OldPrice = styled('div')`
  display: inline-block;
  text-decoration: line-through;
  font-size: 14px;
  color: ${props => props.theme.palette.info};
`
export const NewPrice = styled('div')`
  display: inline-block;
  color: ${props => props.theme.palette.error.main};
  font-size: 28px;
  margin-right: 8px;
`
