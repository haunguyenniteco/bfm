/**
 * styled elements for Favourites
 */

import { styled } from '@mui/material/styles'
import { Container } from '@components/ui'
import Box from '@mui/material/Box'
import { media } from '@theming/media'

export const H2 = styled('h2')`
  font-size: 24px;
`

export const PageContainer = styled(Container)`
  padding: 0;
  ${media.desktop`
      padding-top: 20px;
      margin-left: 0;
    `};

  ${media.giant`
      margin-left: auto;
    `};
`
export const PageTitle = styled(Box)`
  display: flex;

  align-items: center;
  padding: 10px;
`

export const PageContent = styled(Box)`
  width: 100%;
  display: flex;
  min-height: 50vh;
  align-items: center;
  justify-content: center;
`
