import { styled } from '@mui/material/styles'
import { media } from '@theming/media'
import Box from '@mui/material/Box'

export const ProductCard = styled(Box)`
  display: flex;
  flex-direction: column;
  line-height: 1;
`

export const ProductCardHead = styled(Box)`
  display: flex;
  position: relative;
`

export const Details = styled(Box)`
  display: flex;
  padding: 0;
  flex-direction: column;
  cursor: pointer;
`

export const Title = styled(Box)`
  display: flex;
  font-size: 14px;
  font-weight: normal;
  line-height: 1.4;
  letter-spacing: normal;
  color: ${props => props.theme.palette.text};
  box-sizing: border-box;
  margin-bottom: 6px;
  min-height: 60px;
`
export const PriceInfo = styled(Box)`
  display: flex;
  align-items: center;
  color: ${props => props.theme.palette.text};
  font-weight: 600;
  line-height: 1.14;
  margin-top: 8px;
`

export const PriceInfoText = styled(Box)`
  flex-basis: 0;
  flex-grow: 1;
  max-width: 100%;
`

export const Info = styled(Box)`
  margin-top: 5px;
  margin-bottom: 15px;
`

export const NavLink = styled('a')`
  text-decoration: none;
  cursor: pointer;
`

export const Label = styled(Box)`
  position: absolute;
  top: 6px;
  right: 5px;
  width: 40px;
  height: 40px;
  line-height: 42px;
  background-color: ${props => props.theme.palette.danger};
  text-align: center;
  border-radius: 17px;
  /* z-index: 1000; */
`

export const ImageContainer = styled(Box)`
  width: 100%;
  /* z-index: 1000; */

  img {
    cursor: pointer;
    max-width: 100%;
    max-height: 100%;
  }
`

export const CartBoxWrapper = styled('div')`
  position: absolute;
  display: flex;
  justify-content: flex-end;
  bottom: 0px;
  width: 100%;
  z-index: 9999;

  ${media.tablet`
    bottom: 0px;
  `};
`

export const FavoriteWrapper = styled('div')`
  position: absolute;
  justify-content: flex-end;
  top: 0;
  right: 0;
  width: auto;
  /* z-index: 1000; */

  ${media.tablet`
    top: 0px;
  `};
`
