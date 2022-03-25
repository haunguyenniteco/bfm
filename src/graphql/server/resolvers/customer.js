import { getToken } from 'next-auth/jwt'
import pickBy from 'lodash/pickBy'
import { authenticated } from '../common/helpers'

const secret = process.env.AUTH_CLIENT_SECRET

const customerResolver = {
  Query: {
    currentCustomer: authenticated(async (_source, _args, { dataSources }) => {
      try {
        const data = await dataSources.userInfoAPI.getCustomer()
        return {
          id: data?.objectId,
          email: data[`signInNames.emailAddress`],
          firstName: data?.givenName,
          lastName: data?.surname,
          ...data,
        }
      } catch (error) {
        return error
      }
    }),

    customerIdentity: authenticated(async (_source, _args, { dataSources }) => {
      const identity = await dataSources.shopperAPI.getCustomerIdentity()
      return identity
    }),

    isSignedIn: async (_, __, { userScope }) => {
      const { customerId, username } = userScope // catching the reject from the userScope promise.
      return !!customerId && username !== 'guest'
    },

    refreshToken: authenticated(async (_source, _args, { dataSources, userScope }) => {
      const { accessToken, refreshToken, username, provider } = userScope // catching the reject from the userScope promise.
      const data = await dataSources.shopperAPI.refreshToken({
        provider,
        access_token: accessToken,
        refresh_token: refreshToken,
        username,
      })
      return { ...data, provider }
    }),

    deliveryAddresses: authenticated(async (_source, _args, { dataSources, userScope }) => {
      const { customerId } = userScope
      const { deliveryAddresses } = await dataSources.shopperAPI.getCustomerDeliveryAddresses(customerId)
      return deliveryAddresses
    }),
  },

  Mutation: {
    registerCustomer: async (_source, { input }, { dataSources }) => {
      const user = await dataSources.shopperAPI.registerCustomer(input)
      return user
    },

    signinCustomer: async (_source, _args, { req }) => {
      const token = await getToken({ req, secret })
      return {
        accessToken: token.accessToken,
        accessTokenExpires: token.accessTokenExpires,
        customerId: token.id,
        provider: token.provider,
        expires: token.expires,
        username: token.username,
      }
    },

    signinGuest: async (_source, _args, { dataSources }) => {
      const data = await dataSources.commerceAPI.signinGuest(_args)
      const { provider } = _args
      return {
        accessTokenExpires: data.accessTokenExpiresAt,
        provider,
        ...data,
      }
    },

    trustedSignin: async (_source, _args, { dataSources }) => {
      const data = await dataSources.shopperAPI.trustedSignin(_args)
      const { provider } = _args
      return { ...data, provider }
    },

    changePassword: authenticated(async (_source, _args, { dataSources, userScope }) => {
      const { provider } = userScope
      const data = await dataSources.shopperAPI.changePassword(_args)
      return { ...data, provider }
    }),

    verifyCustomer: async (_source, { token }, { dataSources }) => {
      await dataSources.shopperAPI.verifyCustomer(token)
    },

    passwordReset: async (_source, _args, { dataSources }) => {
      const user = await dataSources.shopperAPI.passwordReset(_args)
      return user
    },

    forgetPassword: async (_source, _args, { dataSources }) => {
      await dataSources.shopperAPI.forgetPassword(_args)
    },

    verifyPasswordRecoveryToken: async (_source, { token }, { dataSources }) => {
      await dataSources.shopperAPI.verifyPasswordRecoveryToken(token)
    },

    signoutCustomer: async (_source, _args, { dataSources }) => {
      await dataSources.shopperAPI.signoutCustomer()
    },

    updateCustomer: authenticated(async (_source, _args, { dataSources, userScope }) => {
      const { customerId } = userScope
      const customer = await dataSources.shopperAPI.updateCustomer(customerId, _args)
      return customer
    }),

    saveDeliveryAddress: authenticated(async (_source, { input }, { dataSources, userScope }) => {
      const emptyFieldsFiltered = {
        delivery_addresses: input.delivery_addresses.map(address => {
          return pickBy(address, Boolean)
        }),
      }

      const { customerId } = userScope
      const { deliveryAddresses } = await dataSources.shopperAPI.saveCustomerDeliveryAddress(
        customerId,
        emptyFieldsFiltered,
      )
      return deliveryAddresses
    }),

    deleteDeliveryAddress: authenticated(async (_source, { addressId }, { dataSources, userScope }) => {
      const { customerId } = userScope
      try {
        await dataSources.shopperAPI.deleteCustomerDeliveryAddress(customerId, addressId)
        return true
      } catch (error) {
        return error
      }
    }),
  },
}

export default customerResolver
