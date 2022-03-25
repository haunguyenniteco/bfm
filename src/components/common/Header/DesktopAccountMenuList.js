import Router from 'next/router'
import Box from '@mui/material/Box'
import useAppState from '@hooks/useAppState'
import { useSignoutCustomer } from '@graphql-sdk'
import { useBasket } from '@components/basket/BasketItem/context'
import useAuth from '@hooks/useAuth'
import { AccountMenuContainer, AccountMenuListItem, AccountMenuListItemTitle } from './elements'
import messages from './messages'

const MenuItem = ({ icon, title, className, onClick }) => {
  const Icon = icon
  return (
    <AccountMenuListItem className={className} onClick={onClick}>
      <Box display="flex" alignItems="center">
        {icon && <Icon />}
        <AccountMenuListItemTitle fontSize={2} fontWeight="normal" className="title">
          {title}
        </AccountMenuListItemTitle>
      </Box>
    </AccountMenuListItem>
  )
}

const AccountMenuList = ({ onSelected }) => {
  const { intl } = useAppState()
  const signOut = useSignoutCustomer(onSelected)
  const auth = useAuth()

  const {
    actions: { reset },
  } = useBasket()

  const handleRoute = route => {
    Router.push(route)
    onSelected()
  }

  const handleSignout = async () => {
    try {
      //  await signOut()
      reset()
      auth.signOut(true)
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <AccountMenuContainer>
      <MenuItem
        title={intl.formatMessage(messages.accountInformation)}
        onClick={() => handleRoute('/profile')}
        className="menu-item"
      />
      <MenuItem
        title={intl.formatMessage(messages.orders)}
        onClick={() => handleRoute('/orders')}
        className="menu-item"
      />
      <MenuItem title={intl.formatMessage(messages.logout)} className="menu-footer" onClick={handleSignout} />
    </AccountMenuContainer>
  )
}

export default AccountMenuList
