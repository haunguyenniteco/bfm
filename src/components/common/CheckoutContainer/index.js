import PropTypes from 'prop-types'
import Box from '@mui/material/Box'
import Container from '@mui/material/Container'

const CheckoutContainer = ({
  children,
  childrenStyles,
  childrenContainerStyles,
  headerComponent,
  alertComponent,
  footerComponent,
  footerStyles,
}) => {
  return (
    <Box display="flex" flexDirection="column" justifyContent="space-between">
      {alertComponent && (
        <Box sx={{ bgcolor: 'primary.dark', color: 'primary.contrastText', alignItems: 'center' }}>
          <Container>{alertComponent}</Container>
        </Box>
      )}
      {headerComponent && (
        <Box sx={{ display: 'flex', bgcolor: 'background.default', py: 2 }}>
          <Container maxWidth="xs">{headerComponent}</Container>
        </Box>
      )}

      <Box sx={{ display: 'flex', alignItems: 'center', py: 2 }} style={childrenStyles}>
        <Container maxWidth="xs" style={childrenContainerStyles}>
          {children}
        </Container>
      </Box>

      {footerComponent && (
        <Box sx={{ display: 'flex', flex: 1, py: 2 }} style={footerStyles}>
          <Container maxWidth="xs">{footerComponent}</Container>
        </Box>
      )}
    </Box>
  )
}

CheckoutContainer.propTypes = {
  headerComponent: PropTypes.node,
  alertComponent: PropTypes.node,
  footerComponent: PropTypes.node,
  children: PropTypes.node,
}

export default CheckoutContainer
