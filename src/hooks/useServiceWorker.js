import { useState, useEffect } from 'react'
import { register, unregister } from '@lib/register-service-worker'

export const useServiceWorker = ({ timeout = 1000 }) => {
  const [updateAvailable, setUpdateAvailable] = useState(false)
  const [registration, setRegistration] = useState(null)

  useEffect(() => {
    const interval = setInterval(() => {
      if (registration) {
        console.log({ registration }, registration.update)
        registration.update()
      }
    }, timeout)
    return () => clearInterval(interval)
  }, [registration])

  const registered = reg => setRegistration(reg)
  const updated = () => setUpdateAvailable(true)

  console.log({ ___updateAvailable___: updateAvailable })

  useEffect(() => {
    register('/service-worker.js', { registered, updated })
    return () => unregister()
  }, [])

  return { updateAvailable }
}
