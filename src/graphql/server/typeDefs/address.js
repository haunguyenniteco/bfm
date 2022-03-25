const { gql } = require('apollo-server-micro')

export default gql`
  type Address {
    street: String
    building: String
    postcode: String
    postalArea: String
    town: String
    city: String
    state: String
  }
`
