export { default as Tabs } from '@mui/material/Tabs'
export { default as Tab } from '@mui/material/Tab'
export { default as TabPanel } from './TabPanel'

export const a11yProps = index => {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  }
}
