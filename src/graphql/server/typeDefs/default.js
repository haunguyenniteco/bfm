const { gql } = require('apollo-server-micro')

export default gql`
  type Defaults {
    id: ID!
    name: String!
    status: String!
  }

  "Multiple language options"
  type LocaleField {
    default: String
    en: String
    fi: String
    es: String
    pt: String
  }

  type Query {
    viewer: Defaults
  }
`
