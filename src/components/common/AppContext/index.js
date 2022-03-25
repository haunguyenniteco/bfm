import { createContext, useContext } from 'react'

const intialAppState = {
  sessionUser: {},
  isSignedIn: false,
  router: {},
  storeId: '',
  storeInfo: {},
  categories: [],
  appLoading: false,
  activeCategoryId: false,
  appHost: '',
  userAgent: '',
  guestUserId: false,
}

export const AppStateContext = createContext(intialAppState)

export const AppContextProvider = ({ children, value }) => {
  return <AppStateContext.Provider value={value}>{children}</AppStateContext.Provider>
}

export const useAppState = () => useContext(AppStateContext)
