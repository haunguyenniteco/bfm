import { gql } from '@apollo/client'

export const userFragment = gql`
  fragment User on Customer {
    id
    title
    email
    firstName
    lastName
    eulaAccepted
    phone
    extId
    provider
  }
`

export const authFragment = gql`
  fragment AuthFields on Auth {
    accessToken
    accessTokenExpires
    refreshToken
    refreshTokenExpires
    customerId
    username
    provider
    expires
  }
`
