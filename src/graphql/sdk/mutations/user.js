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

export const signupCustomer = gql`
  mutation RegisterCustomer($input: CustomerInput!) {
    registerCustomer(input: $input) {
      id
      username
      verified
      unverifiedAccessExpiresAt
    }
  }
`

export const signoutCustomer = gql`
  mutation SignoutCustomer {
    signoutCustomer
  }
`

export const forgotPassword = gql`
  mutation ForgotPassword($email: String!, $callbackUrl: String!) {
    forgetPassword(email: $email, callback_url: $callbackUrl)
  }
`

export const verifyCustomer = gql`
  mutation VerifyCustomer($token: String!) {
    verifyCustomer(token: $token)
  }
`
