import { useContext } from 'react'
import { AppStateContext } from '@components/common/AppContext'

const useAppState = () => {
  const appContext = useContext(AppStateContext)
  if (appContext == null) throw Error('useAppState: Please provide AppStateContext value.')
  return appContext
}

export default useAppState
