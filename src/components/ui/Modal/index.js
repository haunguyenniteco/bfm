import { Component } from 'react'
import PropTypes from 'prop-types'
import CloseIcon from './CloseIcon'
import { CloseButton, ModalStyled } from './elements'

class Modal extends Component {
  constructor(props) {
    super(props)

    const { isOpen } = props
    this.state = {
      isOpen,
    }
  }

  static getDerivedStateFromProps(props, state) {
    if (props.isOpen !== state.isOpen) {
      return {
        isOpen: props.isOpen,
      }
    }
    return null
  }

  // TODO:  Investigate why closeModal function isnt working
  closeModal = onClose => () => {
    this.setState({ isOpen: false })
    if (onClose) {
      onClose()
    }
  }

  render() {
    const { hasClose, contentLabel, children, isOpen, onClose, ...rest } = this.props
    const { isOpen: isModalOpen } = this.state

    return (
      <ModalStyled isOpen={isModalOpen} contentLabel={contentLabel} {...rest}>
        {hasClose && (
          <CloseButton onClick={this.closeModal(onClose)}>
            <CloseIcon />
          </CloseButton>
        )}
        {children}
      </ModalStyled>
    )
  }
}

Modal.propTypes = {
  isOpen: PropTypes.bool,
  hasClose: PropTypes.bool,
}

Modal.defaultProps = {
  isOpen: false,
  hasClose: true,
}

export default Modal
