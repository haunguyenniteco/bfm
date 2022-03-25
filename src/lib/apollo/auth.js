import { setContext } from '@apollo/client/link/context'
import { onError } from '@apollo/client/link/error'
import persist from '../persist'

// possibly remove callback here and use event emitter
export const invalidTokenLink = () => {
  const invalidLink = onError(error => {
    if (error.networkError && error.networkError.statusCode === 401) {
      persist.deleteAccessToken()
    }
  })
  return { invalidLink }
}

export const authTokenLink = getAuthToken => {
  const authLink = setContext((_, context) => {
    const authToken = getAuthToken()
    if (authToken) {
      return {
        ...context,
        headers: {
          ...context.headers,
          ...(authToken ? { 'X-Auth': authToken } : {}),
        },
      }
    }
    return context
  })

  return { authLink }
}
