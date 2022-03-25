import { styled } from '@mui/material/styles'
import { media } from '@theming/media'
import Button from '@components/ui/Button/index'
import { forwardRef } from 'react'

const defaultDimension = '30px'

export const CartBox = styled(forwardRef(({ hasbasketInfo, width, ...rest }, ref) => <div ref={ref} {...rest} />))`
  display: flex;
  ${props => props.hasbasketInfo && ` left:0; right:auto;`};
  width: ${props => props.width || '171px'};
  position: relative;
  bottom: 0;
  left: auto;
  right: 0;
  max-width: ${props => props.maxwidth || '175px'};
  min-height: 35px;
  justify-content: space-between;
  align-items: center;
  margin-left: auto;
  background: ${({ hasbasketInfo }) => (hasbasketInfo ? 'rgba(255, 255, 255, 0.7)' : 'transparent')};
  border-radius: 0;

  ${media.tablet`
    min-height: 30px;
  `};

  &.unresponsive {
    min-height: ${defaultDimension};
  }
`
export const CartButton = styled(props => <Button {...props} />)`
  border-radius: 0;
  width: 30px;
  height: 30px;
  padding: 0;
  cursor: pointer;

  &.unresponsive {
    width: ${defaultDimension};
    height: ${defaultDimension};
  }

  ${media.tablet`
    width: 48px;
    height: 48px;
  `}

  .small & {
    width: 36px !important;
    height: 36px !important;
  }
`

export const Minus = styled('div')`
  background-color: ${props => props.theme.palette.white};
  width: 20px;
  height: 2px;
  margin: 0 auto;
`

export const Plus = styled('div')`
  position: relative;
  width: 20px;
  height: 20px;
  margin: 0 auto;

  &::before,
  &::after {
    content: '';
    position: absolute;
    left: 0;
    top: 50%;
    margin-top: -1px;
    background-color: ${props => props.theme.palette.white};
    width: 20px;
    height: 2px;
  }
  &::after {
    transform: rotate(90deg);
  }
`

export const CartInfo = styled(({ hasbasketInfo, ...rest }) => <div {...rest} />)`
  display: flex;
  /* background: ${({ hasbasketInfo }) => (hasbasketInfo ? 'rgba(255, 255, 255, 0.7)' : 'transparent')}; */
  flex: 1;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  margin: 0;
  height: 100%;

  &.unresponsive {
    height: ${defaultDimension};
  }

  .small & {
    height: 36px;
    margin: 0 8px;
  }
`

export const ItemsText = styled('div')`
  font-size: 20px;
  font-weight: bold;
  line-height: 1;

  &.unresponsive {
    font-size: 30px;
  }

  ${media.tablet`
    font-size: 20px;
  `};

  .small & {
    font-size: 20px;
  }
`

export const InBasketText = styled('div')`
  opacity: 0.54;
  font-size: 10px;
  color: #999999;
  letter-spacing: -0.2px;

  ${media.tablet`
    font-size: 12px;
  `};

  &.small {
    font-size: 10px;
  }
`
