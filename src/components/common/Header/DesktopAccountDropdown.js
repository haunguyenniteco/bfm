import { useRef } from 'react'
import Box from '@mui/material/Box'
import useOnClickOutside from 'use-onclickoutside'
import useToggle from '@hooks/useToggle'
import AccountMenuList from './DesktopAccountMenuList'
import { ProfileIcon, IconLink, AccountDropdownMenu, MenuBackdrop } from './elements'

function DesktopAccountDropdown() {
  const ref = useRef(null)
  const [open, setOpen] = useToggle(false)
  useOnClickOutside(ref, () => setOpen(false))

  const handleMenuItemSelected = () => {
    setOpen(false)
  }

  return (
    <Box position="relative" ref={ref}>
      <IconLink onClick={() => setOpen(!open)} data-cy="authenticated">
        <ProfileIcon style={{ color: '#4a90e2' }} />
      </IconLink>
      {open && (
        <AccountDropdownMenu>
          <AccountMenuList onSelected={handleMenuItemSelected} />
        </AccountDropdownMenu>
      )}
      <MenuBackdrop isVisible={open} key="same" />
    </Box>
  )
}

export default DesktopAccountDropdown
