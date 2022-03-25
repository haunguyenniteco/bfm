const { gql } = require('apollo-server-micro')

export default gql`
  type Store {
    id: String!
    extId: String!
    name: String
    masterId: String
    street: String
    building: String
    postcode: String
    postalArea: String
    town: String
    city: String
    state: String
  }

  type Query {
    store(id: String!): Store
  }
`
