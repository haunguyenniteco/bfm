/**
 * AuthLayout
 */

import PropTypes from 'prop-types'
import { useBasket } from '@components/basket/BasketItem/context'
import { NextSeo } from 'next-seo'
import { useRouter } from 'next/router'
import { Logo as BrandLogo } from '@components/Icons'
import AppBar from '@mui/material/AppBar'
import Container from '@mui/material/Container'
import Toolbar from '@mui/material/Toolbar'
import IconButton from '@mui/material/IconButton'
import Box from '@mui/material/Box'
import Avatar from '@mui/material/Avatar'
import Divider from '@mui/material/Divider'
import Typography from '@mui/material/Typography'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import CloseIcon from '@mui/icons-material/Close'
import useAppState from '@hooks/useAppState'
import { SkipLink } from '@components/common'
import { Layout } from './elements'
import messages from './messages'

const AuthLayout = ({
  title,
  seoTitle,
  color,
  children,
  onClose,
  allowBackOption,
  allowCloseOption,
  secondaryHeader,
}) => {
  const router = useRouter()
  const { intl } = useAppState()

  const {
    state: {
      shipping: { delivery },
    },
  } = useBasket()
  const { store } = delivery || {}

  return (
    <Layout>
      <NextSeo title={seoTitle || title} data-cy="pageSeo" />
      <SkipLink href="#main" message={intl.formatMessage(messages.skipToContent)} />
      <AppBar position="sticky" color={color} role="banner">
        <Container>
          <Toolbar disableGutters>
            {allowBackOption && (
              <IconButton
                data-cy="auth-back-button"
                onClick={() => {
                  router.back()
                }}
                aria-label={intl.formatMessage(messages.back)}
                title={intl.formatMessage(messages.back)}
                size="large"
              >
                <ArrowBackIcon />
              </IconButton>
            )}

            <Box flexGrow={1} display="flex" justifyContent="center">
              {!!title && (
                <Typography variant="h4" data-cy="auth-title">
                  {title}
                </Typography>
              )}
              {!title && (
                <Avatar
                  src={store?.chain?.logoUrl}
                  variant="square"
                  alt={store?.chain?.name}
                  sx={{ width: 60, height: 'auto', backgroundColor: 'transparent' }}
                >
                  <BrandLogo />
                </Avatar>
              )}
            </Box>

            {allowCloseOption && (
              <IconButton
                data-cy="auth-close"
                onClick={() => {
                  if (onClose) {
                    onClose()
                  }
                  router.push('/')
                }}
                aria-label={intl.formatMessage(messages.close)}
                title={intl.formatMessage(messages.close)}
                size="large"
              >
                <CloseIcon />
              </IconButton>
            )}
          </Toolbar>
        </Container>
        {secondaryHeader && (
          <Toolbar variant="dense" sx={{ bgcolor: 'primary.dark', color: 'primary.contrastText' }}>
            <Container>{secondaryHeader}</Container>
          </Toolbar>
        )}
        <Divider />
      </AppBar>
      <Box role="main" id="main">
        {children}
      </Box>
    </Layout>
  )
}

AuthLayout.defaultProps = {
  allowBackOption: true,
  allowCloseOption: true,
  color: 'default',
}

AuthLayout.propTypes = {
  seoTitle: PropTypes.string,
  children: PropTypes.node.isRequired,
  onClose: PropTypes.func,
  allowBackOption: PropTypes.bool,
  allowCloseOption: PropTypes.bool,
  color: PropTypes.string,
}

export default AuthLayout
