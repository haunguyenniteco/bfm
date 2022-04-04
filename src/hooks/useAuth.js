import Router from 'next/router'
import persist from '@lib/persist'

const localStorageKey = 'signOut'

const browserRedirectToIndexAfterSignOut = () => {
  // signout from idp server
  window.location.href = '/'
}

const useAuth = () => {
  const signIn = async (authData, apolloClient) => {
    persist.deleteAccessToken()
    persist.setAccessToken(authData)
    persist.deleteGuestAccessToken()
    if (apolloClient) {
      await apolloClient.resetStore()
    }

    const redirectUrl = Router.query && Router.query.redirectUrl
    if (typeof redirectUrl === 'string') {
      Router.replace(redirectUrl)
    } else {
      // We don't need full redirect.
      const href = '/'
      Router.replace(href)
    }
  }

  const signInGuest = async authData => {
    persist.setGuestAccessToken(authData)
  }

  const signOut = async (redirectToIndex = true) => {
    try {
      persist.deleteAccessToken()
      persist.deleteSkipOnboarding()
      persist.deleteStoreId()
      window.localStorage.setItem(localStorageKey, Date.now().toString())
      if (redirectToIndex) browserRedirectToIndexAfterSignOut()
    } catch (error) {
      return error
    }
  }

  return { signIn, signInGuest, signOut }
}

export default useAuth
