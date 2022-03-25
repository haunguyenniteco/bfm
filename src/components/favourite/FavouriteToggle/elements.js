import { styled } from '@mui/material/styles'
import { media } from '@theming/media'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import { Favourite, FavouriteBorder } from '@components/Icons'

const defaultDimension = '30px'

export const FavoriteBox = styled(Box)`
  display: flex;
  position: absolute;
  top: 0;
  right: 0;
  z-index: 10000;
`
export const FavoriteButton = styled(Button)`
  color: transparent;
  background: transparent;
  border: none;

  box-shadow: none;
  width: 20px;
  height: 20px;
  padding: 0;
  cursor: pointer;

  &:hover {
    background: transparent;
  }

  &.unresponsive {
    width: ${defaultDimension};
    height: ${defaultDimension};
  }

  ${media.tablet`
    width: ${defaultDimension};
    height: ${defaultDimension};
  `};

  .small & {
    width: 36px !important;
    height: 36px !important;
  }
`

export const AddFavoriteIcon = styled(FavouriteBorder)`
  position: relative;
  width: 20px;
  height: 20px;
  margin: 0 auto;
`

export const RemoveFavorite = styled(Favourite)`
  position: relative;
  width: 20px;
  height: 20px;
  margin: 0 auto;
`
