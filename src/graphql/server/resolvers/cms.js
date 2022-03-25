const cmsResolver = {
  Query: {
    content: async (_source, { slug, format }, { dataSources }) => {
      try {
        const data = await dataSources.commerceAPI.getContent(slug, format)
        return data
      } catch (error) {
        return JSON.stringify(error)
      }
    },
    area: async (_source, { key, format, preview }, { dataSources }) => {
      try {
        const data = await dataSources.commerceAPI.getArea(key, format, preview)
        return data
      } catch (error) {
        if (error.extensions.response.status === 404) {
          return {
            key,
            content: '',
          }
        }
        throw new Error('Fetching Area error', error)
      }
    },
  },
  Mutation: {},
}

export default cmsResolver
