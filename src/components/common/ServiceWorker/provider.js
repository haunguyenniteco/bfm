import { useServiceWorker } from '@hooks/useServiceWorker'
import { ServiceWorkerContext } from './context'

export const ServiceWorkerProvider = ({ children, timeout }) => {
  const context = useServiceWorker({ timeout })
  return <ServiceWorkerContext.Provider value={context}>{children}</ServiceWorkerContext.Provider>
}
