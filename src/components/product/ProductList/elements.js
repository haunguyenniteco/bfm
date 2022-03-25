import { styled } from '@mui/material/styles'
import Box from '@mui/material/Box'

export const GridContainer = styled(Box)`
  display: flex;
  .product-grid-item {
    padding: 9px;
    border-color: ${props => props.theme.palette.grayLight};
    border-style: solid;
    border-width: 1px 1px 1px 0;
    margin-top: -1px;

    &:nth-child(2n) {
      border-right-width: 0;
    }

    @media (min-width: 600px) {
      &:nth-child(2n) {
        border-right-width: 1px;
      }
      &:nth-child(3n) {
        border-right-width: 0;
      }
    }

    @media (min-width: 801px) {
      &:nth-child(3n) {
        border-right-width: 1px;
      }
      &:nth-child(4n) {
        border-right-width: 0px;
      }
    }

    @media (min-width: 992px) {
      &:nth-child(4n) {
        border-right-width: 1px;
      }
      margin-left: -1px;
    }
  }
  &.product-grid-container {
    margin-top: 1px;
    @media (min-width: 992px) {
      margin-right: -4px;
      border-left: 1px solid ${props => props.theme.palette.grayLight};
    }
  }
`

export const HeaderContainer = styled(Box)`
  height: 74px;
  display: flex;
  align-items: center;
  padding: 10px 0;
`

export const HeaderTitle = styled(Box)`
  font-size: 24px;
  font-weight: 500;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.33;
  letter-spacing: normal;
`

export const GridItem = styled(Box)`
  margin: 0;
`
