import { injectStyle } from 'react-toastify/dist/inject-style'
import { ToastContainer } from 'react-toastify'
import { styled } from '@mui/material/styles'
import Box from '@mui/material/Box'

if (typeof window !== 'undefined') {
  injectStyle()
}

const StyledToolbar = styled(Box)(({ theme }) => ({
  // For more overridable classes > https://fkhadra.github.io/react-toastify/how-to-style/#override-existing-css-classes
  '.Toastify__toast-container': {},
  '.Toastify__toast-theme--dark': {
    background: theme.palette.normalGrey,
    padding: '20px 15px',
    opacity: '0.8 !important',
  },
  '.Toastify__progress-bar-theme--dark': {
    background: theme.palette.primary.main,
  },
}))

const Toast = () => {
  return (
    <StyledToolbar>
      <ToastContainer
        position="bottom-left"
        hideProgressBar
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
    </StyledToolbar>
  )
}

export default Toast
