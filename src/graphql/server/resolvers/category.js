const categoryResolver = {
  Query: {
    categories: async (_source, _args, { dataSources }) => {
      const data = await dataSources.commerceAPI.getCategories(_args)
      return data
    },
    category: async (_source, _args, { dataSources }) => {
      if (_args.get_parent) {
        const data = await dataSources.commerceAPI.getCategories(_args)
        return data.find(c => c.extId === _args.category_id)
      }
      return null
    },
  },

  Mutation: {},

  LocaleField: {
    en: ({ en, eng, default: defaultValue, fi }) => en || eng || defaultValue || fi,
    fi: ({ fi, fin, default: defaultValue, en }) => fi || fin || defaultValue || en,
    pt: ({ pt, prt, default: defaultValue, en }) => pt || prt || defaultValue || en,
    es: ({ es, esp, default: defaultValue, en }) => es || esp || defaultValue || en,
  },
}

export default categoryResolver
