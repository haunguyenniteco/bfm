import useAppState from '@hooks/useAppState'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import Router from 'next/router'
import messages from '../messages'

const AccountMenu = ({ anchorEl, setAnchorEl }) => {
  const { intl } = useAppState()

  return (
    <Menu
      anchorEl={anchorEl}
      keepMounted
      open={!!anchorEl}
      onClose={() => {
        setAnchorEl(null)
      }}
    >
      <MenuItem
        onClick={() => {
          Router.push('/profile')
          setAnchorEl(null)
        }}
      >
        {intl.formatMessage(messages.accountInformation)}
      </MenuItem>
      <MenuItem
        onClick={() => {
          Router.push('/orders')
          setAnchorEl(null)
        }}
      >
        {intl.formatMessage(messages.orders)}
      </MenuItem>
      <MenuItem
        onClick={async () => {
          Router.push('/auth/signout')
          setAnchorEl(null)
        }}
      >
        {intl.formatMessage(messages.logout)}
      </MenuItem>
    </Menu>
  )
}

export default AccountMenu
