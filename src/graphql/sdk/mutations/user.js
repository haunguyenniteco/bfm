import { gql } from '@apollo/client'
import { authFragment } from '../fragments/auth'

export const signinGuest = gql`
  ${authFragment}
  mutation SigninGuest($customerId: String!, $provider: String! = "naveo") {
    signinGuest(customer_id: $customerId, provider: $provider) {
      ...AuthFields
    }
  }
`

export const signinCustomer = gql`
  ${authFragment}
  mutation SigninCustomer($username: String, $password: String) {
    signinCustomer(username: $username, password: $password) {
      ...AuthFields
    }
  }
`
