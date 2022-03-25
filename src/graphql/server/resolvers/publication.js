const publicationResolver = {
  Query: {
    publications: async (_source, _args, { dataSources }) => {
      return dataSources.commerceAPI.getPublications()
    },
  },

  Mutation: {},
}

export default publicationResolver
