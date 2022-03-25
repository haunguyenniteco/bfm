import Container from '@mui/material/Container'
import PropTypes from 'prop-types'
import useAppState from '@hooks/useAppState'
import { SkipLink } from '@components/common'
import messages from './messages'

const Noop = () => <></>

export function Layout({ children, bg, header: Header = Noop, footer: Footer = Noop }) {
  const { intl } = useAppState()

  return (
    <>
      <SkipLink href="#page-wrap" message={intl.formatMessage(messages.skipToContent)} />
      <SkipLink href="#navigation" message={intl.formatMessage(messages.skipToNavigation)} />
      <Header />
      <Container component="main" bg={bg} id="page-wrap" role="main" sx={{ minHeight: '50vh' }} disableGutters>
        {children}
      </Container>
      <Footer />
    </>
  )
}

Layout.propTypes = {
  header: PropTypes.func,
  footer: PropTypes.func,
  children: PropTypes.node.isRequired,
  bg: PropTypes.string,
}

export default Layout
