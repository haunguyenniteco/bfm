import { styled } from '@mui/material/styles'
import { media } from '@theming/media'
import { CloseButton } from '@components/ui'

export const ToastContainer = styled('div')`
  box-sizing: border-box;
  max-height: 100%;
  overflow-x: hidden;
  overflow-y: auto;
  padding: 0;

  position: fixed;
  top: 181px;
  right: 0;
  left: 0;
  z-index: 9999;
  pointer-events: none;

  ${media.desktop`
    top: auto;

    bottom: 0;
  `};
`

export const Container = styled(({ transitionState, transitionDuration, ...rest }) => <div {...rest} />)`
  background: ${props => props.theme.palette.grayDarkest};
  color: ${props => props.theme.palette.white};
  margin: 0 0 1px;
  opacity: ${props => {
    switch (props.transitionState) {
      case 'entering':
        return 0
      case 'exiting':
        return 0
      case 'entered':
        return 1
      case 'exited':
        return 0
      default:
        return 1
    }
  }};
  transition: opacity ${props => props.transitionDuration}ms linear;

  ${media.desktop`
    background: none;
  `}
`

export const Wrapper = styled('div')`
  margin: auto;
  position: relative;
  line-height: 1.6;

  padding: 9px 36px 8px 16px;
  pointer-events: auto;
  background: ${props => props.theme.palette.G0};

  ${media.phone`
    max-width: 540px;
  `}

  ${media.tablet`
    max-width: 720px;
  `}

  ${media.desktop`
    border-radius: 4px;
    margin: 10px;
    max-width: 360px;
  `}
`

export const Close = styled(CloseButton)`
  position: absolute;
  top: 3px;
  right: 0;
  width: 35px;
`
