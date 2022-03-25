const { gql } = require('apollo-server-micro')

export default gql`
  type Auth {
    accessToken: String
    accessTokenExpires: String
    refreshToken: String
    refreshTokenExpires: String
    customerId: String
    username: String
    provider: String
    expires: String
  }

  type AuthCustomer {
    organizationId: String!
    provider: String!
    id: String!
    customerId: String
    verified: Boolean
    unverifiedAccessExpiresAt: String
    username: String!
  }

  type Customer {
    id: ID!
    title: String
    email: String!
    firstName: String
    lastName: String
    eulaAccepted: Boolean
    phone: String
    extId: String
    provider: String
  }

  type DeliveryAddress {
    id: ID!
    name: String
    firstName: String
    lastName: String
    email: String
    phone: String
    street: String!
    building: String
    buildingName: String
    formattedAddress: String
    apartment: String
    postcode: String
    postalArea: String
    city: String
    state: String
    countryCode: String
    messageToPicker: String
    messageToDeliveryDriver: String
  }

  input ContactPreference {
    id: String!
  }

  input CustomerInput {
    title: String
    first_name: String!
    last_name: String!
    username: String!
    password: String!
    email: String!
    is_adult: Boolean
    eula_accepted: Boolean!
    provider: String! = "naveo"
    segment: String! = "customer"
    verify_callback: String!
    contact_preferences: [ContactPreference]
  }

  input DeliveryAddressInstance {
    name: String
    first_name: String
    last_name: String
    email: String
    phone: String
    street: String!
    building: String
    building_name: String
    formatted_address: String
    apartment: String
    postcode: String
    postal_area: String
    city: String
    state: String
    country_code: String
    message_to_picker: String
    message_to_delivery_driver: String
    vanity: String
  }

  input DeliveryAddressInput {
    delivery_addresses: [DeliveryAddressInstance!]
  }

  type Query {
    currentCustomer: Customer!
    isSignedIn: Boolean!
    customerIdentity: AuthCustomer!
    refreshToken: Auth
    deliveryAddresses: [DeliveryAddress]
  }

  type Mutation {
    registerCustomer(input: CustomerInput!): AuthCustomer!
    updateCustomer(
      title: String
      first_name: String!
      last_name: String!
      email: String!
      phone: String
      eula_accepted: Boolean
    ): Customer!

    changePassword(password: String!, new_password: String!): Auth!
    signinCustomer(username: String, password: String): Auth!
    signinGuest(customer_id: String!, provider: String = "naveo"): Auth!
    verifyCustomer(token: String!): Boolean
    passwordReset(password: String!, password_recovery_token: String!): AuthCustomer!
    forgetPassword(email: String!, provider: String! = "naveo", callback_url: String!): Boolean
    verifyPasswordRecoveryToken(token: String!): Boolean
    signoutCustomer: Boolean
    trustedSignin(
      email: String!
      username: String!
      access_token: String!
      access_token_expires_at: String
      refresh_token: String
      refresh_token_expires_at: String
      customer_id: String!
      provider: String!
    ): Auth

    saveDeliveryAddress(input: DeliveryAddressInput!): [DeliveryAddress]!
    deleteDeliveryAddress(addressId: String!): Boolean
  }
`
