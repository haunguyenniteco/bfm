import { styled } from '@mui/material/styles'
import Box from '@mui/material/Box'
import { media } from '@theming/media'
import Search from '../SearchIcon'

export const Wrapper = styled(Box)`
  margin: 0 -14px;
  border: 1px solid ${props => props.theme.palette.G3};
  border-bottom-color: ${props => props.theme.palette.G2};

  ${media.tablet`
    margin: 0 -14px;
  `};
`

export const Item = styled(Box)`
  display: flex;
  background-color: ${({ isActive, theme }) => (isActive ? theme.palette.G3 : null)};
  font-size: 14px;
  padding: 10px 12px;
  cursor: default;
  line-height: normal;
  border-bottom: 1px solid #dee2e6;
  height: 48px;
  align-items: center;

  &:last-child {
    border-bottom: none;
  }

  ${media.desktop`
    font-size: 16px;
  `};
`
export const Part = styled('span')`
  ${props =>
    props.highlight &&
    `
    color: black;
    font-weight: 600;
  `};
`
export const PriceInfo = styled(Box)`
  font-size: 12px;
  font-weight: 600;
  letter-spacing: -0.3px;
  color: ${props => props.theme.palette.text};
  margin-left: 5px;
`

export const ImageContainer = styled(Box)`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 50px;

  .category-image {
    width: 16px;
    height: 16px;
  }

  .product-image {
    background-color: transparent;
    img {
      height: 80%;
    }
  }
`

export const SearchIcon = styled(Search)`
  width: 16px;
  height: 16px;
  color: #000;
`
export const ItemDescription = styled(Box)`
  margin-left: 10px;
  margin-right: auto;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`
