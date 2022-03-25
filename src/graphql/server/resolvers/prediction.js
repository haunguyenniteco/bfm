const refineSuggestions = suggestions => {
  const searchPhrases = suggestions.searchPhrases.map(item => ({ ...item, type: 'PHRASE' })) || []
  const categories = suggestions.categories.map(item => ({ ...item, type: 'CATEGORY' })) || []
  const products = suggestions.products.map(item => ({ ...item, type: 'PRODUCT' })) || []
  return [...searchPhrases, ...categories, ...products]
}

/* eslint-disable no-underscore-dangle */
const predictionResolver = {
  Result: {
    __resolveType(obj) {
      if (obj.type === 'CATEGORY') {
        return 'PredictionCategory'
      }

      if (obj.type === 'PRODUCT') {
        return 'PredictionProduct'
      }

      if (obj.type === 'PHRASE') {
        return 'SearchPhrase'
      }

      return null
    },
  },
  Query: {
    predictions: async (_source, { input }, { dataSources }) => {
      const data = await dataSources.commerceAPI.getPredictions(input)
      const result = refineSuggestions(data)
      return result
    },
  },

  Mutation: {},
}

export default predictionResolver
