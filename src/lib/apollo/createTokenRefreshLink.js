import { TokenRefreshLink } from 'apollo-link-token-refresh'
import { keysToCamel } from '../keysToCamel'
import persist from '../persist'
import { putJSON } from '../request'

const REFRESH_URL = `${process.env.DG_API_URL}/customers/access-token`
const LOCAL_STORAGE_KEY = 'signOut'
const SIGN_IN_PATH = '/signin'

export const shouldRefreshAccessToken = token => {
  if (typeof token !== 'string') return false

  const tokenObj = JSON.parse(token)
  if (tokenObj === null || typeof tokenObj.accessToken !== 'string') return false
  const refreshThreshold = new Date().getTime() + 300000 // 5 minutes from now
  const expiration = new Date(tokenObj.exp * 1000).getTime()

  return refreshThreshold > expiration
}

export const createTokenRefreshLink = getAuthToken => {
  return new TokenRefreshLink({
    accessTokenField: 'accessData',

    isTokenValidOrUndefined: () => !shouldRefreshAccessToken(getAuthToken()),

    fetchAccessToken: async () => {
      const { accessToken, refreshToken, username, provider } = JSON.parse(getAuthToken())

      const data = {
        provider,
        access_token: accessToken,
        refresh_token: refreshToken,
        username,
      }
      return putJSON(REFRESH_URL, data, true)
    },

    handleFetch: async accessData => {
      persist.setAccessToken(accessData)
    },

    handleResponse: (operation, accessTokenField) => async response => {
      const { data } = keysToCamel(response)
      if (typeof data.accessToken !== 'string') return

      const { provider } = JSON.parse(getAuthToken())
      const token = { ...data, provider }
      return { [accessTokenField]: token }
    },

    handleError: async err => {
      // full control over handling token fetch Error
      console.warn('Your refresh token is invalid. Try to relogin')
      console.error(err)

      persist.deleteAccessToken()
      if (typeof window !== 'undefined') {
        window.localStorage.setItem(LOCAL_STORAGE_KEY, Date.now().toString())
        // Browser redirect to purge sensitive session data.
        window.location.href = SIGN_IN_PATH
      }
    },
  })
}

export default createTokenRefreshLink
