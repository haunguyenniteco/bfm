/**
 *
 * Products
 *
 */
import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import { useProductList, useLoadMoreProducts } from '@graphql-sdk'
import getVariablesFromUrlParams from '@lib/getVariablesFromUrlParams'
import useAppState from '@hooks/useAppState'
import useChangeLanguage from '@hooks/useChangeLanguage'
import ProductGrid from '@components/product/ProductGrid'
import { Error } from '@components/common'
import { sortBy } from 'lodash'

const MultipleProducts = () => {
  const { storeId } = useAppState()
  const { locale } = useChangeLanguage()
  const router = useRouter()
  const variables = {
    input: {
      ...getVariablesFromUrlParams(storeId, router.query, locale),
    },
  }
  const attributeFacets = filter => {
    const facetAttributes = []
    const keys = Object.keys(filter ?? {})

    keys.forEach(key => {
      if (Array.isArray(filter[key])) {
        let facetValues = []
        facetValues = filter[key].map(i => {
          return { type: key, value: i }
        })

        facetAttributes.push(...facetValues)
      }
    })

    return facetAttributes
  }

  const getFilterFacetValues = filter => {
    const facets = []
    const attribute = attributeFacets(filter)

    if (attribute.length > 0) {
      facets.push(...attribute.map(facet => `${facet.type}-${facet.value}`))
    }

    return facets
  }

  const queryFacets = getFilterFacetValues(variables?.input?.filters?.facets || {})
  const [selectedFacets, setFacets] = useState(queryFacets)

  const { data, loading, fetchMore, error } = useProductList(variables, { notifyOnNetworkStatusChange: false })

  const { products: { items, pagination = {}, aggregations = {} } = {} } = data || {}

  const { nextPage, pageSize } = pagination

  const [loadMore] = useLoadMoreProducts(fetchMore, {
    input: {
      ...getVariablesFromUrlParams(storeId, router.query, locale, {
        nextPage,
        pageSize,
      }),
    },
  })

  const handleFacets = (event, newFacets) => {
    const f = sortBy(newFacets)
    router.push({
      pathname: router.pathname,
      query: {
        ...router.query,
        f,
      },
    })

    setFacets(newFacets)
  }

  useEffect(() => {
    if ((queryFacets?.length ?? 0) !== (selectedFacets?.length ?? 0)) {
      setFacets(queryFacets)
    }
  }, [queryFacets, selectedFacets?.length])

  if (error) return <Error error={error} />

  return (
    <ProductGrid
      loading={loading}
      products={items}
      pagination={pagination}
      onLoadMore={loadMore}
      aggregations={aggregations}
      handleFacets={handleFacets}
      selectedFacets={selectedFacets}
    />
  )
}

export default MultipleProducts
