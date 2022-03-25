import { FormattedMessage } from 'react-intl'
import Link from 'next/link'
import useCategories from '@hooks/useCategories'
import useChangeLanguage from '@hooks/useChangeLanguage'
import { getCategoryRoute } from '@lib/helpers'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import Skeleton from '@mui/material/Skeleton'
import { ArrowBackIcon } from './elements'
import messages from '../messages'

function SidebarCategoryNavigation() {
  const { loading, error, category, categories, categoryId } = useCategories()
  const { locale } = useChangeLanguage()
  if (loading || error) {
    return (
      <List>
        {new Array(5).fill().map((v, i) => (
          <ListItem key={i}>
            <Skeleton variant="text" width="100%" />
          </ListItem>
        ))}
      </List>
    )
  }
  const items = categories.length ? categories : [category]
  let backRoute = getCategoryRoute()
  if (category?.level > 1) {
    backRoute = getCategoryRoute(
      {
        extId: category.parentExtId,
        name: category.parentName,
      },
      locale,
    )
  }
  return (
    <List>
      {!!categoryId && (
        <ListItem disablePadding>
          <Link href={backRoute} passHref>
            <ListItemButton component="a">
              <ListItemIcon>
                <ArrowBackIcon />
              </ListItemIcon>
              <ListItemText primary={<FormattedMessage {...messages.allCategories} />} />
            </ListItemButton>
          </Link>
        </ListItem>
      )}
      {!categoryId && (
        <ListItem selected>
          <ListItemText primary={<FormattedMessage {...messages.allCategories} />} />
        </ListItem>
      )}
      {items
        .filter(item => !!item)
        .map(item => {
          const selected = categoryId === item.extId
          return (
            <ListItem key={item.extId} disablePadding>
              <Link href={getCategoryRoute(item, locale)} passHref>
                <ListItemButton selected={selected} component="a">
                  <ListItemText primary={item.name[locale]} />
                </ListItemButton>
              </Link>
            </ListItem>
          )
        })}
    </List>
  )
}

export default SidebarCategoryNavigation
