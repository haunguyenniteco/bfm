const { gql } = require('apollo-server-micro')

export default gql`
  type Publication {
    id: ID!
    code: String!
    decommissioned_at: String
    createdAt: String
    updatedAt: String
  }

  type Query {
    publications: [Publication]
  }
`
