import createApolloClient from '@lib/apollo/apolloClient'
import { Query } from '@graphql-sdk'
import { getCategoryRoute } from '@lib/helpers'
import getConfig from 'next/config'
import { getServerSideSitemap } from 'next-sitemap'

const { publicRuntimeConfig = {} } = getConfig() || {}
const locale = 'en'
const Categories = () => null

export const getServerSideProps = async ctx => {
  const apolloClient = createApolloClient(ctx.apolloState || {}, ctx)
  const { storeId } = ctx.req.cookies

  const {
    data: { categories },
  } = await apolloClient.query({
    query: Query.getCategoryDetails,
    variables: {
      storeId: storeId || publicRuntimeConfig.defaultStore,
      tree: 'online',
    },
  })

  const lastmod = new Date().toISOString()
  const fields = categories.map(category => ({
    loc: getCategoryRoute(category, locale),
    lastmod,
    priority: 0.7,
    changefreq: 'daily',
  }))

  return getServerSideSitemap(ctx, fields)
}

export default Categories
