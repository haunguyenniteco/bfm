/* eslint-disable global-require */
import { sha256 } from 'crypto-hash'
import { ApolloClient, ApolloLink } from '@apollo/client'
import { InMemoryCache } from '@apollo/client/cache'
import { BatchHttpLink } from '@apollo/client/link/batch-http'
import { RetryLink } from '@apollo/client/link/retry'
import { createPersistedQueryLink } from '@apollo/client/link/persisted-queries'
import apolloLogger from 'apollo-link-logger'
import { onError } from '@apollo/client/link/error'
import fetch from 'isomorphic-unfetch'
import urljoin from 'url-join'
import getConfig from 'next/config'
import { parseCookies } from '@lib/helpers'
import persist from '@lib/persist'
import { invalidTokenLink, authTokenLink } from './auth'
import inflateLink from './inflateLink'
import { omitTypenameLink } from './omitVariableTypenameLink'
import possibleTypes from './possibleTypes.json'

const getAuthToken = req => () =>
  parseCookies(req)[persist.ACCESS_TOKEN_KEY] || parseCookies(req)[persist.GUEST_ACCESS_TOKEN_KEY]

const { serverRuntimeConfig = {} } = getConfig() || {}
const showApolloLogger = process.env.NODE_ENV !== 'production' && process.browser

let graphqlUrl
if (process.browser) {
  graphqlUrl = window.location.origin
} else {
  graphqlUrl = serverRuntimeConfig.serverUrl
}

const errorLink = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors) {
    graphQLErrors.forEach(({ message, locations, path }) => {
      if (message !== 'PersistedQueryNotFound') {
        console.error(
          `[GraphQL error]: Message: ${message}, Location: ${JSON.stringify(locations)}, Path: ${JSON.stringify(path)}`,
        )
      }
    })
  }
  if (networkError) {
    // tslint:disable-next-line:no-console
    console.log(`[Network error]: ${networkError}`)
  }
})

const { invalidLink } = invalidTokenLink()

function getLink(ctx) {
  const { authLink } = authTokenLink(getAuthToken(ctx?.req))

  const links = [
    createPersistedQueryLink({ sha256, useGETForHashedQueries: false }),
    inflateLink,
    omitTypenameLink,
    invalidLink,
    authLink,
    new RetryLink(),
    new BatchHttpLink({
      uri: urljoin(graphqlUrl || 'https://bfm-test.vercel.app', 'api/graphql'),
      credentials: 'same-origin',
      fetch,
    }),
  ]

  if (showApolloLogger) {
    links.unshift(errorLink)
    links.unshift(apolloLogger)
  }

  return ApolloLink.from(links)
}

export default function createApolloClient(initialState, ctx) {
  // The `ctx` (NextPageContext) will only be present on the server.
  // use it to extract auth headers (ctx.req) or similar.

  return new ApolloClient({
    ssrMode: Boolean(ctx),
    link: getLink(ctx),
    cache: new InMemoryCache({ possibleTypes }).restore(initialState),
    defaultOptions: {
      // mutate: {
      //   errorPolicy: 'all',
      // },
      // query: {
      //   errorPolicy: 'all',
      //   fetchPolicy: 'network-only',
      // },
      // watchQuery: {
      //   errorPolicy: 'all',
      //   fetchPolicy: 'cache-and-network',
      // },
    },
  })
}
