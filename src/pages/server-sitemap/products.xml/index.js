import { getServerSideSitemap } from 'next-sitemap'
import { Query } from '@graphql-sdk'
import createApolloClient from '@lib/apollo/apolloClient'
import { getProductRoute } from '@lib/helpers'
import getConfig from 'next/config'

const { publicRuntimeConfig = {} } = getConfig() || {}
const lastmod = new Date().toISOString()

const getFieldsFromProducts = products =>
  products.map(product => ({
    loc: getProductRoute(product, 'en'),
    lastmod,
    priority: 0.7,
    changefreq: 'daily',
  }))

const Products = () => null

export const getServerSideProps = async ctx => {
  const apolloClient = createApolloClient(ctx.apolloState || {}, ctx)

  const queryProductsByPage = page => {
    return apolloClient.query({
      query: Query.getProductListDetails,
      variables: {
        input: {
          store_id: publicRuntimeConfig.defaultStore,
          meta: { pagination: { page, page_size: 500 } },
        },
      },
    })
  }

  const { data } = await queryProductsByPage(1)
  const { totalPages } = data.products.pagination

  const promises = new Array(totalPages).fill(1).map((_, page) => {
    if (page === 1) {
      return { data }
    }
    return queryProductsByPage(page)
  })
  const products = (await Promise.all(promises)).map(response => response.data.products.items).flat()

  return getServerSideSitemap(ctx, getFieldsFromProducts(products))
}

export default Products
