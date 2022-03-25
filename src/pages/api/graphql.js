import { intializeGraphqlServer } from '@graphql-server'
import getConfig from 'next/config'

const { publicRuntimeConfig = {}, serverRuntimeConfig = {} } = getConfig() || {}
const { baseApiUrl, userInfoApiUrl } = publicRuntimeConfig
const { apiKey, organizationId } = serverRuntimeConfig

export const config = {
  api: {
    bodyParser: false,
  },
}

export default intializeGraphqlServer({
  baseApiUrl,
  userInfoApiUrl,
  apiKey,
  organizationId,
  path: '/api/graphql',
  deduplicate: true,
})
