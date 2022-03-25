import { useEffect } from 'react'

const localStorageKey = 'signOut'

const browserRedirectToIndexAfterSignOut = () => {
  const href = '/'
  // Browser redirect to purge sensitive session data.
  window.location.href = href
}

const useAuthSync = () => {
  const syncLogout = event => {
    if (event.key === localStorageKey) {
      browserRedirectToIndexAfterSignOut()
    }
  }
  useEffect(() => {
    window.addEventListener('storage', syncLogout)
    return () => {
      window.removeEventListener('storage', syncLogout)
      window.localStorage.removeItem(localStorageKey)
    }
  }, [])
}

export default useAuthSync
