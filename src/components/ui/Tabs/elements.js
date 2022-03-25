import { styled } from '@mui/material/styles'
import {
  Tab as UnstyledTab,
  TabList as UnstyledTabList,
  Tabs as UnstyledTabs,
  TabPanel as UnstyledTabPanel,
  resetIdCounter,
} from 'react-tabs'

const Tabs = styled(UnstyledTabs)``

const TabList = styled(UnstyledTabList)`
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  padding: 0;
  margin: 0;
`

const Tab = styled(UnstyledTab)`
  font-size: 12px;
  flex-grow: 1;
  text-align: center;
  padding: 15px 18px;
  list-style: none;
  cursor: pointer;
  color: ${props => props.theme.palette.textColor};
  border-bottom: 2px solid transparent;
  text-transform: uppercase;

  &:first-of-type {
    border-left: none;
  }

  &[class*='selected'] {
    font-weight: bold;
    color: ${props => props.theme.palette.primary.main};
    border-bottom-color: ${props => props.theme.palette.primary.main};
  }

  &[class*=['disabled'] {
    color: #e0e0e0;
    cursor: not-allowed;
  }
`

const TabPanel = styled(UnstyledTabPanel)`
  display: none;
  &[class*='selected'] {
    display: block;
  }
`

Tab.tabsRole = 'Tab'
Tabs.tabsRole = 'Tabs'
TabPanel.tabsRole = 'TabPanel'
TabList.tabsRole = 'TabList'

export { Tab, TabList, Tabs, TabPanel, resetIdCounter as tabsResetIdCounter }
