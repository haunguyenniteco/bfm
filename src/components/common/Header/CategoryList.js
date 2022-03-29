import { useState } from 'react'
import Link from 'next/link'
import useAppState from '@hooks/useAppState'
import useCategories from '@hooks/useCategories'
import useChangeLanguage from '@hooks/useChangeLanguage'
import { routeCategorySelect } from '@lib/helpers'
import Divider from '@mui/material/Divider'
import FavoriteIcon from '@mui/icons-material/Favorite'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import Skeleton from '@mui/material/Skeleton'
import { OffersIcon, ArrowBackIcon } from './elements'
import messages from './messages'

const ListBackItem = ({ label, onClick }) => (
  <ListItem button onClick={onClick}>
    <ListItemIcon>
      <ArrowBackIcon />
    </ListItemIcon>
    <ListItemText primary={label} />
  </ListItem>
)

export const CategoryList = ({ onSelect = () => {} }) => {
  const { locale } = useChangeLanguage()
  const { intl } = useAppState()
  const [categoryId, setCategoryId] = useState(null)
  const { loading, error, categories, category } = useCategories(categoryId)

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

  return (
    <>
      {!categoryId && (
        <>
          <List component="nav">
            <Link href="/favourites" passHref>
              <ListItem button component="a" onClick={onSelect}>
                <ListItemIcon>
                  <FavoriteIcon style={{ color: '#000' }} />
                </ListItemIcon>
                <ListItemText primary={intl.formatMessage(messages.favourites)} />
              </ListItem>
            </Link>
            <Link href="/offers" passHref>
              <ListItem button component="a" onClick={onSelect}>
                <ListItemIcon>
                  <OffersIcon />
                </ListItemIcon>
                <ListItemText primary={intl.formatMessage(messages.offers)} />
              </ListItem>
            </Link>
          </List>
          <Divider />
          <List>
            {categories.map(categoryItem => (
              <ListItem
                key={categoryItem.extId}
                button
                onClick={() => {
                  setCategoryId(categoryItem.extId)
                  routeCategorySelect(categoryItem, locale)
                }}
              >
                <ListItemText primary={categoryItem.name[locale]} />
              </ListItem>
            ))}
          </List>
        </>
      )}
      {!!categoryId && !!category && (
        <List>
          {category.level === 1 && (
            <ListBackItem
              label={intl.formatMessage(messages.allCategories)}
              onClick={() => {
                setCategoryId(null)
              }}
            />
          )}
          {category.level > 1 && (
            <ListBackItem
              label={`All ${category.parentName[locale]}`}
              onClick={() => {
                setCategoryId(category.parentExtId)
              }}
            />
          )}
          <ListItem
            button
            onClick={() => {
              onSelect()
            }}
          >
            <ListItemText
              primary={`All ${category.name[locale]}`}
              primaryTypographyProps={{ sx: { fontWeight: 'bold' } }}
            />
          </ListItem>
          {categories.map(childCategory => (
            <ListItem
              key={childCategory.extId}
              button
              onClick={() => {
                setCategoryId(childCategory.extId)
                routeCategorySelect(childCategory, locale)
              }}
            >
              <ListItemText primary={childCategory.name[locale]} />
            </ListItem>
          ))}
        </List>
      )}
    </>
  )
}
