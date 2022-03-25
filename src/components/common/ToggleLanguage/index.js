import { useState } from 'react'
import IconButton from '@mui/material/IconButton'
import LanguageIcon from '@mui/icons-material/Language'
import MenuItem from '@mui/material/MenuItem'
import Menu from '@mui/material/Menu'
import Box from '@mui/material/Box'
import { FormattedMessage } from 'react-intl'
import useChangeLanguage from '@hooks/useChangeLanguage'
import useAppState from '@hooks/useAppState'
import messages from './messages'

function ToggleLanguage(props) {
  const { locale, supportedLanguages, changeLocale } = useChangeLanguage()
  const { intl } = useAppState()

  const onChangeLanguage = lang => {
    if (lang !== locale) {
      changeLocale(lang)
    }
  }

  const [anchorEl, setAnchorEl] = useState(null)

  return (
    <Box {...props}>
      <IconButton
        aria-label={intl.formatMessage(messages.selectLanguage)}
        aria-controls="menu-appbar"
        aria-haspopup="true"
        title={intl.formatMessage(messages.selectLanguage)}
        color="inherit"
        onClick={e => setAnchorEl(e.currentTarget)}
        size="large"
      >
        <LanguageIcon />
      </IconButton>
      <Menu
        anchorEl={anchorEl}
        keepMounted
        open={!!anchorEl}
        role="menu"
        onClose={() => {
          setAnchorEl(null)
        }}
      >
        {supportedLanguages.map((lang, index) => (
          <MenuItem
            onClick={() => onChangeLanguage(lang)}
            selected={lang === locale}
            disabled={lang === locale}
            divider
            key={lang}
            role="menuitem"
          >
            <FormattedMessage {...messages[lang]} />
          </MenuItem>
        ))}
      </Menu>
    </Box>
  )
}

ToggleLanguage.propTypes = {}

export default ToggleLanguage
