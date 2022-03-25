import { styled } from '@mui/material/styles'
import Container from '@mui/material/Container'
import Box from '@mui/material/Box'

export const PageContainer = styled(Container)`
  min-height: 80vh;
  padding-top: 15px;
`

export const PageContent = styled(Box)`
  display: flex;
  flex-wrap: wrap;
`

export const SideBar = styled(Box)`
  width: 311px;
`

export const Main = styled(Box)`
  flex: 1;
  width: 100%;
`
