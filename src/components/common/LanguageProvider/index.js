/* eslint-disable no-underscore-dangle */
import '@formatjs/intl-relativetimeformat/polyfill'
import persist from '@lib/persist'

// Import supported locale
import '@formatjs/intl-relativetimeformat/locale-data/en'
import '@formatjs/intl-relativetimeformat/locale-data/fi'
import '@formatjs/intl-relativetimeformat/locale-data/pt'
import '@formatjs/intl-relativetimeformat/locale-data/es'

import { createContext, Fragment, useReducer, useContext } from 'react'
import { createIntl, createIntlCache, RawIntlProvider } from 'react-intl'

// Import locale json file
import enTranslation from '@lang/en.json'
import fiTranslation from '@lang/fi.json'
import ptTranslation from '@lang/pt.json'
import esTranslation from '@lang/es.json'

const DEFAULT_LOCALE = 'en'

// Add/Remove supported languages here
const appLocales = {
  en: enTranslation,
  fi: fiTranslation,
  pt: ptTranslation,
  es: esTranslation,
}

export const LocaleContext = createContext({
  locale: 'en',
  messages: {},
  supportedLanguages: [],
})

export const LocaleDispatchContext = createContext()

// This is optional but highly recommended since it prevents memory leak
const cache = createIntlCache()

const reducer = (state, action) => {
  switch (action.type) {
    case 'CHANGE_LANGUAGE': {
      const { locale } = action
      persist.setLocale(locale)
      return { ...state, locale, messages: appLocales[locale] }
    }

    default:
      throw new Error(`Unkown action: ${action.type}`)
  }
}

const LanguageProvider = ({ localeData, children }) => {
  const [state, dispatch] = useReducer(reducer, { ...localeData, supportedLanguages: Object.keys(appLocales) })
  const intl = createIntl({ ...state }, cache)

  return (
    <LocaleDispatchContext.Provider value={dispatch}>
      <LocaleContext.Provider value={state}>
        <RawIntlProvider value={intl} key={state.locale} defaultLocale={DEFAULT_LOCALE} textComponent={Fragment}>
          {children}
        </RawIntlProvider>
      </LocaleContext.Provider>
    </LocaleDispatchContext.Provider>
  )
}

export default LanguageProvider
export const useLocale = () => useContext(LocaleContext)
export const useDispatchLocale = () => useContext(LocaleDispatchContext)
