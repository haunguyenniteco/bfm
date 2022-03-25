import { inflate } from 'graphql-deduplicator'
import { ApolloLink } from '@apollo/client'

const inflateLink = new ApolloLink((operation, forward) => {
  return forward(operation).map(response => {
    return inflate(response)
  })
})

export default inflateLink
