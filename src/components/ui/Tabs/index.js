/**
 * styled elements for StoreSelection
 */

import { styled } from '@mui/material/styles'
import { media } from '@theming/media'
import { Tab as DTab, TabList as DTabList, TabPanel as DTabPanel } from './elements'

export const TabList = styled(DTabList)`
  flex-wrap: unset;
  margin: 0;

  ${media.phone`
    line-height: 40px;
  `};

  ${media.tablet`
    line-height: 60px;
  `};
`

export const Tab = styled(DTab)`
  background-color: ${props => props.theme.palette.white};
  font-size: 12px;
  font-weight: ${props => props.theme.fontWeights.body};
  line-height: 13px;
  text-transform: capitalize;
  padding: 20px 0;
  color: ${({ theme }) => theme.palette.G2};
  font-weight: bold;
  flex: 1;

  &:focus {
    z-index: 1;
    outline: none;
  }

  &.selected {
    border-bottom: 3px solid ${({ theme }) => theme.palette.primary};
    color: ${({ theme }) => theme.palette.G6};
  }

  ${media.tablet`
    font-size: 16px;
  `}
`

export const TabPanel = styled(DTabPanel)`
  background-color: transparent;
`
