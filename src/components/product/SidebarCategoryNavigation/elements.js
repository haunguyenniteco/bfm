/**
 * styled elements for SidebarCategoryNavigation
 */

import { styled } from '@mui/material/styles'
import Box from '@mui/material/Box'
import { BackArrow } from '@components/Icons'

export const ArrowBackIcon = styled(BackArrow)`
  height: 14px;
  width: 14px;
  margin-right: 1rem;
`

export const CategoryTitle = styled(Box)`
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  cursor: pointer;
  text-transform: capitalize;
`
