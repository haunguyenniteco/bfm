/**
 * styled elements for Modal
 */

import { styled } from '@mui/material/styles'
import ReactModal from 'react-modal'

const ANIMATION_DURATION = 250
if (process.env.NODE_ENV !== 'test') {
  ReactModal.setAppElement('#__next')
}

const ModalAdapter = ({ className, ...props }) => (
  <ReactModal
    closeTimeoutMS={ANIMATION_DURATION}
    portalClassName={className}
    className={`${className}__content`}
    overlayClassName={`${className}__overlay`}
    {...props}
  />
)

export const ModalStyled = styled(ModalAdapter)`
  &__overlay {
    position: fixed;
    top: 0px;
    left: 0px;
    right: 0px;
    bottom: 0px;
    background-color: rgba(51, 51, 51, 0.7);
    transition: opacity ${ANIMATION_DURATION}ms ease-in-out;
    opacity: 0;
    z-index: 1111;

    overflow: auto;
    -webkit-overflow-scrolling: touch;

    text-align: center;
    padding: 200px 5% 500px;

    &.ReactModal__Overlay--after-open {
      opacity: 1;
    }
    &.ReactModal__Overlay--before-close {
      opacity: 0;
    }
  }

  &__content {
    display: inline-block;
    text-align: left;
    max-width: 1000px;

    background: #fff;
    outline: none;
    padding: 20px;

    position: relative;
  }
`

export const CloseButton = styled('button')`
  cursor: pointer;
  background-color: transparent;
  color: inherit;

  position: absolute;
  top: 0;
  right: 0;

  padding: 16px;
`
