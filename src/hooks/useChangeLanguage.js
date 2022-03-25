import { useLocale, useDispatchLocale } from '@components/common/LanguageProvider'

const useChangeLanguage = () => {
  const dispatch = useDispatchLocale()
  const { locale, supportedLanguages } = useLocale()
  const changeLocale = lang =>
    dispatch({
      type: 'CHANGE_LANGUAGE',
      locale: lang,
    })

  return { locale, supportedLanguages, changeLocale }
}

export default useChangeLanguage
