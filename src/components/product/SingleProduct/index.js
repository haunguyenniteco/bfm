/**
 *
 * Product
 *
 */

import { useRouter } from 'next/router'
import { NextSeo } from 'next-seo'
import { useProductDetails } from '@graphql-sdk'
import useAppState from '@hooks/useAppState'
import useChangeLanguage from '@hooks/useChangeLanguage'
import ProductDetails from '@components/product/ProductDetails'
import ProductSkeletonLoader from '@components/product/ProductSkeletonLoader'
import { Error } from '@components/common'

const SingleProduct = () => {
  const { storeId } = useAppState()
  const { locale } = useChangeLanguage()
  const router = useRouter()
  const { query } = router

  const { productId } = query

  const variables = {
    storeId,
    productId,
    locale,
  }
  const { data, loading, error } = useProductDetails(variables, { skip: !productId })
  const { product } = data || {}

  if (loading) {
    return <ProductSkeletonLoader />
  }

  if (error) return <Error statusCode={error.status} />
  if (!loading && product) {
    const { name: title } = product
    let { tradeItemDescription } = product
    if (!tradeItemDescription) {
      tradeItemDescription = {}
      tradeItemDescription = product.name
    }

    return (
      <>
        <NextSeo config={{ noindex: false, title, description: tradeItemDescription[locale] }} />
        <ProductDetails product={product} locale={locale} router={router} />
      </>
    )
  }

  return null
}

export default SingleProduct
