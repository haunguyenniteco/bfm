import { styled } from '@mui/material/styles'
import { Container } from '@components/ui'
import Hr from '@components/ui/Divider'
import { media } from '@theming'
import Box from '@mui/material/Box'

export const H1 = styled('h1')`
  font-size: 20px;
`

export const PageContainer = styled(Container)`
  padding: 0;

  ${media.desktop`
    padding-top: 20px;
  `}
`

/*
 * SideBar */

export const SideBar = styled(Box)`
  ${media.desktop`
    margin-right: 10px;
  `};
`

export const Main = styled(Box)`
  width: 100%;

  ${media.desktop`
    flex: 1 1 0%;
    /* margin-right: 15px; */
  `};

  .product-grid-container {
    margin: 0 -15px;
    ${media.tablet`
      margin: 0 ;
    `};
  }
`

export const PageTitleWrapper = styled(Box)`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  line-height: 1.4;
  font-size: 28px;
`

export const Divider = styled(Hr)`
  margin: 0 -15px;
  ${media.tablet`
    margin: 0 ;
  `};
`
