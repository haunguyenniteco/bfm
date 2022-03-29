import Box from '@mui/material/Box'
import AppBarSection from '@components/common/Header/AppBarSection'
import useToggle from '@hooks/useToggle'
import Drawer from '@mui/material/Drawer'
import { Logo } from '@components/Icons/index'
import CloseIcon from '@mui/icons-material/Close'
import IconButton from '@mui/material/IconButton'
import Divider from '@mui/material/Divider'
import { CategoryList } from './CategoryList'

const Header = () => {
  const [showMenu, toggleMenu] = useToggle(false)
  return (
    <>
      <AppBarSection onMenuClick={toggleMenu} />
      <Drawer
        anchor="left"
        open={showMenu}
        onClose={() => {
          toggleMenu()
        }}
      >
        <Box textAlign="center" p={2}>
          <Logo style={{ marginTop: 6 }} />
          <IconButton size="small" style={{ position: 'absolute', top: 8, right: 8 }} onClick={() => toggleMenu()}>
            <CloseIcon />
          </IconButton>
        </Box>
        <Divider />
        <CategoryList showSubcategories onSelect={toggleMenu} />
      </Drawer>
    </>
  )
}

Header.propTypes = {}

export default Header
