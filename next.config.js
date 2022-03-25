/* eslint-disable no-param-reassign */
require('dotenv').config()
const withPlugins = require('next-compose-plugins')
const withBundleAnalyzer = require('@next/bundle-analyzer')({ enabled: process.env.ANALYZE === 'true' })
const path = require('path')
const Dotenv = require('dotenv-webpack')
const appConfig = require('./config')

const nextConfig = {
  webpack(config, { isServer }) {
    config.plugins = config.plugins || []
    config.resolve = {
      ...config.resolve,
      extensions: ['.mjs', '.js', '.json', '.svg'],
    }

    config.module.rules.push({
      test: /\.(gql|graphql)$/,
      loader: 'graphql-tag/loader',
      exclude: ['/node_modules/', '/.next/'],
      enforce: 'pre',
    })

    config.plugins = [
      ...config.plugins,
      // Read the .env file
      new Dotenv({
        path: path.join(__dirname, '.env'),
        systemvars: true,
      }),
    ]

    // Fixes npm packages that depend on `fs` module
    if (!isServer) config.resolve.fallback.fs = false

    // code block below is reference example for webpack4
    // if (!isServer) {
    //   config.node = {
    //     fs: 'empty',
    //   }
    // }

    return config
  },

  onDemandEntries: {
    // Period (in ms) where the server will keep pages in the buffer
    maxInactiveAge: 120 * 1e3, // default 25s
    // Number of pages that should be kept simultaneously without being disposed
    pagesBufferLength: 3, // default 2
  },

  serverRuntimeConfig: {
    serverUrl: appConfig.SERVER_URL,
    authClientSecret: appConfig.AUTH_CLIENT_SECRET,
    facebookDomainVerification: appConfig.FACEBOOK_DOMAIN_VERIFICATION,
    apiKey: appConfig.DG_API_KEY,
    organizationId: appConfig.DG_ORGANIZATION_ID,
  },
  publicRuntimeConfig: {
    baseApiUrl: appConfig.DG_API_URL,
    userInfoApiUrl: appConfig.SHOPPER_API_URL,
    brand: appConfig.BRAND,
    defaultStore: appConfig.DEFAULT_STORE_ID,
    clusterName: appConfig.CLUSTER,
    buildDate: appConfig.BUILD_DATE,
    buildId: appConfig.BUILD_NUMBER,
    buildImage: appConfig.BUILD_IMAGE,
    gtmKey: appConfig.GOOGLE_TAG_MANAGER_KEY,
    gMapKey: appConfig.GOOGLE_MAP_KEY,
    serviceWorkerTimeout: appConfig.SERVICE_WORKER_TIMEOUT,
    searchCountry: appConfig.LOOKUP_COUNTRY_CODE,
    siteUrl: appConfig.SITE_URL,

    clientId: appConfig.AUTH_CLIENT_ID,
    tenantName: appConfig.AUTH_TENANT_NAME,
    tenantId: appConfig.AUTH_TENANT_ID,
    loginFlow: appConfig.AUTH_LOGIN_FLOW,
    idpProfileEdit: appConfig.AUTH_PROFILE_EDIT_URL,
    idpPasswordReset: appConfig.AUTH_PASSWORD_RESET_URL,
    authMaxAge: appConfig.AUTH_SESSION_MAX_AGE,
  },
  images: {
    domains: [
      'images.ctfassets.net',
      'images.yoururl.com',
      'https',
      'app.contentful.com',
      'bunburyfarmersmarketimages.com.au',
    ],
    imageSizes: [70, 100, 320, 512, 800],
  },

  async redirects() {
    return [
      {
        source: '/account',
        destination: '/profile',
        permanent: true,
      },
      {
        source: '/order',
        destination: '/orders',
        permanent: true,
      },
    ]
  },
}

module.exports = withPlugins(
  [
    // add plugins here..
    withBundleAnalyzer,
  ],
  nextConfig,
)
