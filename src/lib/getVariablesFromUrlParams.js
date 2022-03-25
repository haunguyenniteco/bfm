import { snakeCase } from 'lodash'

const getVariablesFromUrlParams = (storeId, query, locale, { nextPage = 1, pageSize = 12 } = {}) => {
  const { categoryId, categoryIds, q: phrase, price_from: from, price_to: to, price, name, f: facets } = query

  let priceLimit = false
  let sorting = false
  let filterFacets = {}

  if (from || to) {
    priceLimit = {
      ...(from ? { gte: from } : {}),
      ...(to ? { lte: to } : {}),
    }
  }

  if (name || price) {
    sorting = [
      {
        language: locale,
        type: price ? 'price' : 'name',
        direction: price || name,
      },
    ]
  }
  if (facets) {
    const attributeFilterFacets = Array.isArray(facets) ? facets : [facets]

    filterFacets = { group_by_type: true }

    attributeFilterFacets.forEach(facet => {
      const type = snakeCase(facet.split('-')[0])
      const value = facet.slice(facet.indexOf('-') + 1)

      if (filterFacets[type]) {
        filterFacets[type].push(value)
      } else {
        filterFacets[type] = [value]
      }
    })
  }

  return {
    store_id: storeId,
    language: locale,
    ...(phrase ? { match_phrase: { phrase } } : {}),
    filters: {
      ...(categoryId ? { category_path_ids: [categoryId] } : {}),
      ...(categoryIds ? { category_path_ids: categoryIds.split(',') } : {}),
      ...(priceLimit && { price_limit: priceLimit }),
      ...(facets ? { facets: filterFacets } : {}),
    },
    ...(sorting && { sorting }),
    aggregations: {
      facets: {
        size: 50,
      },
    },
    meta: {
      pagination: {
        page: nextPage,
        page_size: pageSize,
      },
    },
  }
}

export default getVariablesFromUrlParams
