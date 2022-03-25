import { Box } from '@mui/material'
import { CustomLink } from '@components/ui'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemText from '@mui/material/ListItemText'

const SidebarNavigation = ({ items }) => {
  return (
    <Box display="flex" flexDirection="column" alignItems="stretch" maxWidth={216}>
      <List>
        {items.map((item, key) => (
          <ListItem key={key} disablePadding>
            <CustomLink href={item.path}>
              <ListItemButton>
                <ListItemText primary={item.name} />
              </ListItemButton>
            </CustomLink>
          </ListItem>
        ))}
      </List>
    </Box>
  )
}

SidebarNavigation.propTypes = {}

export default SidebarNavigation
