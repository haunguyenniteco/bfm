import { format } from 'date-fns'
import { enGB, enUS, fi, pt, es } from 'date-fns/locale'

const locales = { enGB, enUS, fi, pt, es }

// by providing a default string of 'PP' or any of its variants for `formatStr`
// it will format dates in whichever way is appropriate to the locale
function formatDate(date, formatStr = 'PP', locale = 'en') {
  const localeId = locale === 'en' ? 'enUS' : locale
  return format(date, formatStr, {
    locale: locales[localeId],
  })
}
export default formatDate
