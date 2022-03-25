import { graphql } from 'msw'

export const handlers = [
  // Handles a "Login" mutation
  graphql.mutation('Login', () => true),
]
