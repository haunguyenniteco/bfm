/**
 * All config needed for the app should be parsed from environment variables in this file.
 * This goes for config needed in server code as well as config needed in browser code.
 * - If the config is needed in a Node js file, you should import it directly from here.
 * - If the config is needed in browser code, which may sometimes be executed in a browser
 *   and sometimes be executed on the server, you should import the config from here into
 *   next.config.js and add it to either `publicRuntimeConfig` or `serverRuntimeConfig`.
 *   Then use `getConfig()` to get it within React components and other browser code.
 */
const envalid = require('envalid')

// Config is loaded for the `next build` command, too, and we don't want to complain
// about missing environment variables in that phase.
if (process.env.IS_BUILDING_NEXTJS) {
  module.exports = {}
} else {
  const { port, str, url, num, bool } = envalid

  /**
   * See https://www.npmjs.com/package/envalid
   *
   * Envalid parses NODE_ENV automatically, and provides the following
   * shortcut (boolean) properties for checking its value:
   *   env.isProduction    // true if NODE_ENV === 'production'
   *   env.isTest          // true if NODE_ENV === 'test'
   *   env.isDevelopment   // true if NODE_ENV === 'development'
   *
   * Be sure to add `{ default: null }` if it should be optional.
   */
  module.exports = envalid.cleanEnv(
    process.env,
    {
      DG_API_KEY: str(),
      DG_ORGANIZATION_ID: str(),
      DG_API_URL: str(),
      SHOPPER_API_URL: str({ default: '' }),
      DEFAULT_STORE_ID: str(),
      SERVER_URL: url({ default: 'http://localhost:3000' }),
      NODE_ENV: str({ choices: ['development', 'test', 'jesttest', 'production'], default: 'production' }),
      PORT: port({ default: 3000 }),
      LOOKUP_COUNTRY_CODE: str({ default: 'au' }),
      CLUSTER: str({ default: 'dev' }),
      BUILD_DATE: str({ default: new Date().toLocaleString() }),
      BUILD_NUMBER: str({ default: 'localhost' }),
      BUILD_IMAGE: str({ default: 'web-client-localhost' }),
      GOOGLE_TAG_MANAGER_KEY: str({ default: 'GTM-565D52D' }),
      GOOGLE_MAP_KEY: str({ default: 'AIzaSyClAuZvW6KiuNiDNktdHeCGS7GAg4puMXg' }), // Never add a real customer map key to default
      FACEBOOK_DOMAIN_VERIFICATION: str({ default: '' }),
      BRAND: str({ default: "Bunbury Farmer's Market" }),
      BRAND_THEME: str({ default: 'false' }),
      SERVICE_WORKER_TIMEOUT: num({ default: 60 * 1000 }),
      SITE_URL: str({ default: 'http://localhost:3000' }),

      NEXTAUTH_URL: str({ default: 'http://localhost:3000' }),
      AUTH_CLIENT_ID: str({ default: '' }),
      AUTH_CLIENT_SECRET: str({ default: '' }),
      AUTH_TENANT_NAME: str({ default: '' }),
      AUTH_TENANT_ID: str({ default: '' }),
      AUTH_LOGIN_FLOW: str({ default: '' }),
      AUTH_PROFILE_EDIT_URL: str({ default: '' }),
      AUTH_PASSWORD_RESET_URL: str({ default: '' }),
      AUTH_SESSION_MAX_AGE: num({ default: 30 * 24 * 60 * 60 }), // 30 days
    },
    {
      // disable dotenv processing
      dotEnvPath: '.env',
      // https://www.npmjs.com/package/envalid#strict-mode
      strict: false,
    },
  )
}
