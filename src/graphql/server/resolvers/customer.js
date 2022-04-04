import { getToken } from 'next-auth/jwt'
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

    isSignedIn: async (_, __, { userScope }) => {
      const { customerId, username } = userScope // catching the reject from the userScope promise.
      return !!customerId && username !== 'guest'
    },
  },

  Mutation: {
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
  },
}

export default customerResolver
