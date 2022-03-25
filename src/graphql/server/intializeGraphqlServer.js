import { ApolloServer } from 'apollo-server-micro'
import { getGraphqlConfig } from './getGraphqlConfig'

export const intializeGraphqlServer = options => {
  const graphqlConfig = getGraphqlConfig(options)
  const apolloServer = new ApolloServer(graphqlConfig)

  const graphqlPath = options.path || '/api/graphql'
  return apolloServer.createHandler({ path: graphqlPath })
}
