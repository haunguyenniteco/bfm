const storeResolver = {
  Query: {
    store: async (_source, { id }, { dataSources }) => {
      try {
        const data = await dataSources.commerceAPI.getPlaceById(id)
        return data
      } catch (err) {
        throw new Error('Could not retrieve store', err)
      }
    },
  },

  Mutation: {},
}

export default storeResolver
