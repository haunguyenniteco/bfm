import { gql } from '@apollo/client'
import { userFragment } from '../fragments/auth'

export const getUserDetails = gql`
  ${userFragment}
  query UserDetails {
    currentCustomer {
      ...User
    }
  }
`
export const isSignedIn = gql`
  query IsSignedIn {
    isSignedIn
  }
`
