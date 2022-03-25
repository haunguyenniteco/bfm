import { deflate } from 'graphql-deduplicator'
import typeDefs from './typeDefs'
import resolvers from './resolvers'
import { CommerceAPI, ShopperAPI, UserInfoAPI } from './dataSource'
import { _formatError } from './common/formatError'

const isDev = process.env.NODE_ENV !== 'production'

export const getGraphqlConfig = options => {
  const { baseApiUrl, userInfoApiUrl, apiKey, organizationId, deduplicate } = options
  return {
    typeDefs,
    resolvers,
    uploads: false,
    debug: isDev,
    introspection: isDev,
    playground: isDev,

    dataSources: () => ({
      commerceAPI: new CommerceAPI({
        baseApiUrl,
        apiKey,
        organizationId,
      }),
      shopperAPI: new ShopperAPI({
        baseApiUrl,
        apiKey,
        organizationId,
      }),
      userInfoAPI: new UserInfoAPI({ userInfoApiUrl }),
    }),

    context: async ({ req, connection }) => {
      if (connection) {
        // check connection for metadata
        return connection.context
      }
      const authToken = req.headers['x-auth'] || ''

      let userScope = {}
      if (authToken) {
        userScope = JSON.parse(authToken)
      }
      return { userScope, req }
    },

    subscriptions: {
      onConnect: async connectionParams => {
        const authToken = connectionParams.authToken || ''
        let userScope = {}
        if (authToken) {
          userScope = JSON.parse(authToken)
        }
        return { userScope }
      },
    },

    formatResponse: response => {
      /* eslint-disable-next-line no-underscore-dangle */
      if (deduplicate && response.data && !response.data.__schema) {
        return deflate(response)
      }

      return response
    },
    formatError: _formatError,
  }
}
