/**
 * QueryProvider
 */

import { useRouter } from 'next/router'
import { QueryParamProvider } from 'use-query-params'

/**
 * Next.js query param provider.
 */
const QueryProvider = ({ children }) => {
  const router = useRouter()

  // eslint-disable-next-line no-shadow
  const history = {
    push: ({ search }) => router.push({ search, pathname: router.pathname }),

    replace: ({ search }) => router.replace({ search, pathname: router.pathname }),
  }

  // eslint-disable-next-line no-shadow
  const location = {
    search: router.asPath.replace(/[^?]+/u, ''),
  }

  return (
    <QueryParamProvider history={history} location={location}>
      {children}
    </QueryParamProvider>
  )
}

QueryProvider.propTypes = {}

export default QueryProvider
