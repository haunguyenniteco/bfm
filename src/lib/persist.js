import cookies from 'js-cookie'

export default class persist {
  static get ACCESS_TOKEN_KEY() {
    return 'idToken'
  }

  static get GUEST_ACCESS_TOKEN_KEY() {
    return 'guestIdToken'
  }

  static get STORE_ID_KEY() {
    return 'storeId'
  }

  static get COOKIE_ACCEPTED_KEY() {
    return 'cookieAccepted'
  }

  static get LOCALE_KEY() {
    return 'locale'
  }

  static get SKIP_ONBOARDING_KEY() {
    return 'skipOnboarding'
  }

  static get(key) {
    return cookies.get(key)
  }

  static set(key, value, options = {}) {
    return cookies.set(key, value, { ...options })
  }

  static remove(key) {
    return cookies.remove(key)
  }

  static getAccessToken() {
    return cookies.get(persist.ACCESS_TOKEN_KEY)
  }

  static setAccessToken(authData) {
    persist.set(persist.ACCESS_TOKEN_KEY, JSON.stringify(authData), {
      expires: new Date(authData.expires),
      path: '/',
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
    })
  }

  static getGuestAccessToken() {
    return cookies.get(persist.GUEST_ACCESS_TOKEN_KEY)
  }

  static setGuestAccessToken(token) {
    persist.set(persist.GUEST_ACCESS_TOKEN_KEY, JSON.stringify(token), {
      expires: new Date(token.accessTokenExpires),
      path: '/',
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
    })
  }

  static deleteAccessToken() {
    persist.remove(persist.ACCESS_TOKEN_KEY)
  }

  static deleteGuestAccessToken() {
    persist.remove(persist.GUEST_ACCESS_TOKEN_KEY)
  }

  static setStoreId(storeId, days = 30) {
    persist.set(persist.STORE_ID_KEY, storeId, {
      path: '/',
      expires: days,
    })
  }

  static getStoreId() {
    return cookies.get(persist.STORE_ID_KEY)
  }

  static deleteStoreId() {
    persist.remove(persist.STORE_ID_KEY)
  }

  static getCookieAccepted() {
    return cookies.get(persist.COOKIE_ACCEPTED_KEY)
  }

  static setCookieAccepted() {
    persist.set(persist.COOKIE_ACCEPTED_KEY, true)
  }

  static setLocale(locale, days = 365) {
    persist.set(persist.LOCALE_KEY, locale, {
      path: '/',
      expires: days,
    })
  }

  static getLocale() {
    return cookies.get(persist.LOCALE_KEY)
  }

  static getSkipOnboarding() {
    return cookies.get(persist.SKIP_ONBOARDING_KEY)
  }

  static skipOnboarding(days = 30) {
    persist.set(persist.SKIP_ONBOARDING_KEY, true, {
      path: '/',
      expires: days,
    })
  }

  static deleteSkipOnboarding() {
    persist.remove(persist.SKIP_ONBOARDING_KEY)
  }
}
