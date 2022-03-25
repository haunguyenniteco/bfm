import { createContext, useContext } from 'react'

export const ServiceWorkerContext = createContext({
  updateAvailable: false,
})

export const useServiceWorkerContext = () => useContext(ServiceWorkerContext)
