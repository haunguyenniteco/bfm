import AppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import Box from '@mui/material/Box'
import Link from 'next/link'
import IconButton from '@mui/material/IconButton'
import MenuIcon from '@mui/icons-material/Menu'
import Logo from '@theming/Logo'
import Sticky from 'react-sticky-el'
import PersonIcon from '@icons/Person'
import ShoppingCartIcon from '@icons/ShoppingCart'
import Hidden from '@mui/material/Hidden'
import getConfig from 'next/config'
import useAppState from '@hooks/useAppState'
import { signIn } from 'next-auth/react'
import { useState } from 'react'
import { useBasket } from '@components/basket/BasketItem/context'
import Badge from '@mui/material/Badge'
import ServiceCheck from '@components/common/Header/ServiceCheck'
import OrderAmendBrandHeader from '@components/common/Header/OrderAmendBrandHeader'
import Divider from '@mui/material/Divider'
import Grid from '@mui/material/Grid'
import Button from '@components/ui/Button'
import Container from '@mui/material/Container'
import Backdrop from '@mui/material/Backdrop'
import { CategoryList } from '@components/common/Header/CategoryList'
import CmsHeaders from '../CmsHeaders'
import AccountMenu from './AccountMenu'
import SearchProducts from '../SearchProducts'
import messages from '../messages'
import { StyledBox, StyledBadge, Popover } from './elements'

const AppBarSection = ({ children, onMenuClick, ...props }) => {
  const [anchorEl, setAnchorEl] = useState(null)
  const [categoriesAnchor, setCategoriesAnchor] = useState(null)
  const { publicRuntimeConfig = {} } = getConfig() || {}
  const { tenantName } = publicRuntimeConfig
  const { isSignedIn, intl } = useAppState()
  const {
    state: { amendmentId, totalQuantity, totalPriceMinusDiscount },
  } = useBasket()

  return (
    <>
      <CmsHeaders />
      <Sticky topOffset={100} stickyStyle={{ zIndex: 99999 }}>
        <AppBar color="default" position="static" role="banner">
          <Container>
            <Toolbar disableGutters>
              <Hidden mdUp>
                <IconButton edge="start" color="inherit" aria-label="menu" onClick={onMenuClick} size="large">
                  <MenuIcon />
                </IconButton>
              </Hidden>

              <StyledBox flexGrow="1">
                <Link href="/">
                  <a aria-label={intl.formatMessage(messages.homePage)}>
                    <Logo style={{ marginBottom: -6 }} />
                  </a>
                </Link>
              </StyledBox>
              <Box display="flex" alignItems="center">
                {tenantName && (
                  <>
                    <IconButton
                      color="inherit"
                      aria-label={intl.formatMessage(messages.profile)}
                      title={intl.formatMessage(messages.profile)}
                      onClick={e => {
                        if (!isSignedIn) {
                          signIn(
                            'azure-ad-b2c',
                            { callbackUrl: `${process.env.NEXTAUTH_URL}/auth/signin` },
                            { prompt: 'login' },
                          )
                          return
                        }
                        setAnchorEl(e.currentTarget)
                      }}
                      size="large"
                    >
                      <Badge variant={isSignedIn ? 'dot' : ''}>
                        <PersonIcon />
                      </Badge>
                    </IconButton>
                    <AccountMenu anchorEl={anchorEl} setAnchorEl={setAnchorEl} />
                  </>
                )}
                <Link href="/basket" passHref>
                  <IconButton
                    color="inherit"
                    data-cy="basket-action"
                    size="large"
                    aria-label={intl.formatMessage(messages.basket)}
                    title={intl.formatMessage(messages.basket)}
                  >
                    <StyledBadge badgeContent={totalQuantity}>
                      <ShoppingCartIcon />
                    </StyledBadge>
                  </IconButton>
                </Link>
              </Box>
            </Toolbar>
            <Hidden mdUp>
              <Box pb={1}>
                <SearchProducts />
              </Box>
            </Hidden>
          </Container>
        </AppBar>
        <Divider />
      </Sticky>
      <AppBar color="default" position="static" role="navigation" id="navigation">
        <Hidden mdDown>
          <Container>
            <Toolbar disableGutters>
              <Grid container alignItems="center">
                <Grid item xs={4}>
                  <Button
                    variant="text"
                    color="inherit"
                    startIcon={<MenuIcon color="primary" />}
                    onClick={e => {
                      setCategoriesAnchor(e.currentTarget)
                    }}
                  >
                    {intl.formatMessage(messages.browseProducts)}
                  </Button>
                  <Backdrop sx={{ color: '#fff', zIndex: theme => theme.zIndex.drawer + 1 }} open={!!categoriesAnchor}>
                    <Popover
                      open={!!categoriesAnchor}
                      anchorEl={categoriesAnchor}
                      onClose={() => setCategoriesAnchor(null)}
                      anchorOrigin={{
                        vertical: 0,
                        horizontal: 'left',
                      }}
                    >
                      <Button
                        variant="text"
                        color="inherit"
                        startIcon={<MenuIcon color="primary" />}
                        onClick={() => setCategoriesAnchor(null)}
                        style={{ backgroundColor: '#fff', border: 'unset', borderRadius: 'unset' }}
                      >
                        {intl.formatMessage(messages.browseProducts)}
                      </Button>
                      <Box
                        sx={{
                          width: 1272,
                          backgroundColor: '#fff',
                        }}
                      >
                        <CategoryList onSelect={() => setCategoriesAnchor(null)} />
                      </Box>
                    </Popover>
                  </Backdrop>
                </Grid>
                <SearchProducts />
                <Grid container item xs={4} justifyContent="flex-end">
                  {amendmentId ? (
                    <OrderAmendBrandHeader amendmentId={amendmentId} />
                  ) : (
                    <ServiceCheck style={{ marginRight: 12, display: 'flex' }} />
                  )}
                </Grid>
              </Grid>
            </Toolbar>
          </Container>
        </Hidden>
        <Divider />
        <Hidden mdUp>
          <Container>
            <Box sx={{ py: 1 }}>
              {amendmentId ? (
                <OrderAmendBrandHeader amendmentId={amendmentId} />
              ) : (
                <ServiceCheck style={{ marginLeft: -16, display: 'flex' }} />
              )}
            </Box>
          </Container>
          <Divider />
        </Hidden>
      </AppBar>
    </>
  )
}

export default AppBarSection
