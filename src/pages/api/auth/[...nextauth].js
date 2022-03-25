/* eslint-disable no-param-reassign */
import NextAuth from 'next-auth'
import getConfig from 'next/config'
import { setTokenCookie } from '@lib/helpers'

const { publicRuntimeConfig = {}, serverRuntimeConfig = {} } = getConfig() || {}
const { tenantName, clientId, loginFlow, authMaxAge } = publicRuntimeConfig
const { authClientSecret } = serverRuntimeConfig
const expiresIn = 60 * 4 // 4min

async function refreshAccessToken({ req, res }, token) {
  /**
   * Takes a token, and returns a new token with updated
   * `accessToken` and `accessTokenExpires`. If an error occurs,
   * returns the old token and an error property
   */
  try {
    const url = `https://${tenantName}.b2clogin.com/${tenantName}.onmicrosoft.com/${loginFlow}/oauth2/v2.0/token`
    const data = {
      client_id: clientId,
      client_secret: authClientSecret,
      grant_type: 'refresh_token',
      refresh_token: token.refreshToken,
      scope: `https://${tenantName}.onmicrosoft.com/api/demo.read openid offline_access`,
    }
    // https://github.com/github/fetch/issues/263
    const searchParams = Object.keys(data)
      .map(key => {
        // eslint-disable-next-line prefer-template
        return encodeURIComponent(key) + '=' + encodeURIComponent(data[key])
      })
      .join('&')

    const response = await fetch(url, {
      body: searchParams,
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      method: 'POST',
    })

    const refreshedTokens = await response.json()

    if (!response.ok) {
      throw refreshedTokens
    }

    const responseData = {
      ...token,
      accessToken: refreshedTokens.access_token,
      accessTokenExpires: Date.now() + (refreshedTokens.expires_in || expiresIn) * 1000,
      refreshToken: refreshedTokens.refresh_token ?? token.refreshToken,
    }

    setTokenCookie(res, {
      accessToken: responseData.accessToken,
      accessTokenExpires: responseData.accessTokenExpires,
      customerId: responseData.id,
      username: 'shopper',
      provider: 'naveo',
      expires: new Date(Date.now() + authMaxAge * 1000),
    })

    return responseData
  } catch (error) {
    console.log(error)

    return {
      ...token,
      error: 'RefreshAccessTokenError',
    }
  }
}

export default async function auth(req, res) {
  return NextAuth(req, res, {
    providers: [
      {
        id: 'azure-ad-b2c',
        name: 'Naveo Shopper Account',
        type: 'oauth',
        version: '2.0',
        wellKnown: `https://${tenantName}.b2clogin.com/${tenantName}.onmicrosoft.com/${loginFlow}/v2.0/.well-known/openid-configuration`,
        options: {
          clientId,
          clientSecret: authClientSecret,
        },
        authorization: {
          url: `https://${tenantName}.b2clogin.com/${tenantName}.onmicrosoft.com/${loginFlow}/oauth2/v2.0/authorize`,
          params: {
            response_mode: 'query',
            response_type: 'code',
            scope: `https://${tenantName}.onmicrosoft.com/api/demo.read openid offline_access`,
          },
        },
        checks: ['pkce', 'state'],
        idToken: true,
        profile(profile) {
          return {
            id: profile?.sub,
          }
        },
      },
    ],
    secret: authClientSecret,
    session: {
      maxAge: authMaxAge,
    },
    pages: {
      signOut: '/auth/signout',
      signIn: '/auth/signin',
    },
    callbacks: {
      async jwt({ token, user, account }) {
        // Initial sign in
        if (account && user) {
          const data = {
            idToken: account.id_token,
            accessToken: account.access_token,
            accessTokenExpires: Date.now() + (account.expires_in || expiresIn) * 1000,
            refreshToken: account.refresh_token,
            expires: new Date(Date.now() + authMaxAge * 1000),
            username: 'shopper',
            provider: 'naveo',
            ...user,
          }

          return data
        }

        // Return previous token if the access token has not expired yet
        if (Date.now() < token.accessTokenExpires) {
          return token
        }

        // Refresh and return a new token
        return refreshAccessToken({ req, res }, token)
      },

      async session({ session, token }) {
        session.accessToken = token.accessToken
        session.accessTokenExpires = token.accessTokenExpires
        session.username = token.username
        session.customerId = token.id
        session.error = token.error
        session.provider = token.provider
        // eslint-disable-next-line unused-imports/no-unused-vars
        const { user, ...rest } = session
        return rest
      },
    },
    debug: process.env.NODE_ENV !== 'production',
  })
}
