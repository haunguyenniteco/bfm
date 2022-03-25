/* eslint-disable import/no-dynamic-require */
/* eslint-disable global-require */

const IntlPolyfill = require('intl')
const accepts = require('accepts')

Intl.NumberFormat = IntlPolyfill.NumberFormat
Intl.DateTimeFormat = IntlPolyfill.DateTimeFormat

// const dev = process.env.NODE_ENV !== 'production'

export const getMessages = locale => {
  return require(`../lang/${locale}.json`)
}

const supportedLocales = ['en', 'fi', 'pt', 'es']

export const loadLocaleData = async ctx => {
  const { req, res } = ctx
  if (req) {
    const { parse, serialize } = await import('cookie')
    const defaultLocale = accepts(req).language(supportedLocales) || 'en'
    let locale = defaultLocale

    try {
      const cookies = parse(req.headers.cookie)
      locale = cookies.locale
    } catch {
      locale = defaultLocale
    }

    if (!locale) {
      res.setHeader('Set-Cookie', serialize('locale', String(defaultLocale)))
      locale = defaultLocale
    }

    ctx.locale = locale

    const messages = getMessages(locale)
    return { locale, messages }
  }
}
