import { flattenDetails } from '../common/helpers'

const productsResolver = {
  Query: {
    // Product search query
    products: async (_source, { input }, { dataSources }) => {
      try {
        const {
          data: { products, aggregations },
          meta: { pagination },
        } = await dataSources.commerceAPI.getProducts({ tree: 'online', ...input })

        return {
          items: flattenDetails(products),
          aggregations,
          pagination,
        }
      } catch (error) {
        return error
      }
    },
    similarProducts: async (_source, { storeId, masterProductId, page, pageSize }, { dataSources }) => {
      try {
        const {
          data: { products, aggregations },
          // TODO: If no results, 'meta' properties is not returned in response, and error is thrown here when trying to destructure it.
          // meta: { pagination },
        } = await dataSources.commerceAPI.getSimilarProducts({
          store_id: storeId,
          product_id: masterProductId,
          page,
          page_size: pageSize,
        })
        return {
          items: flattenDetails(products),
          aggregations,
          // pagination,
        }
      } catch (error) {
        return error
      }
    },
    // Single product details query
    product: async (_source, { storeId, productId }, { dataSources }) => {
      try {
        const data = await dataSources.commerceAPI.getProductByPlaceId(storeId, productId)
        const { details, ...product } = data

        return {
          ...product,
          ...details,
        }
      } catch (error) {
        return error
      }
    },
  },

  Mutation: {},

  // Renamed fields
  MeasurementUnit: {
    value: ({ _: value }) => value,
  },
  Product: {
    name: ({ descriptionShort: name }) => name,
    prices: ({ price: prices }) => prices,
    categories: ({ presentationCategories: categories }) => {
      // Lift the parentName and parentExtId fields from parent obj
      const final = categories.map(({ parent, ...rest }) => {
        const { name, extId } = parent
        const result = { parentName: name, parentExtId: extId, ...rest }
        return result
      })
      return final
    },
    additionalIngredientStatement: ({ xAdditionalIngredientStatement }) => xAdditionalIngredientStatement,
  },

  LocaleField: {
    en: ({ en, eng, default: defaultValue, fi }) => en || eng || defaultValue || fi,
    fi: ({ fi, fin, default: defaultValue, en }) => fi || fin || defaultValue || en,
    pt: ({ pt, prt, default: defaultValue, en }) => pt || prt || defaultValue || en,
    es: ({ es, esp, default: defaultValue, en }) => es || esp || defaultValue || en,
  },
}

export default productsResolver
