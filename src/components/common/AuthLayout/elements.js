import { styled } from '@mui/material/styles'
import Box from '@mui/material/Box'

export const Layout = styled(Box)`
  //min-height: 100vh;
  display: flex;
  flex-direction: column;
  /* align-items: stretch; */
  background-color: '${props => props.theme.palette.G3}';
`
