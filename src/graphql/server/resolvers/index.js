import { mergeResolvers } from 'merge-graphql-schemas'
import customerResolver from './customer'
import orderResolver from './order'
import categoryResolver from './category'
import productsResolver from './products'
import predictionResolver from './prediction'
import placeResolver from './place'
import basketResolver from './basket'
import publicationResolver from './publication'
import cmsResolver from './cms'
import storeResolver from './store'

const defaultResolvers = {
  Query: {
    // eslint-disable-next-line no-unused-vars
    viewer: async (_source, _args, { dataSources }) => {
      return { id: 1, name: 'John Smith', status: 'cached' }
    },
  },

  Mutation: {},
}

const resolvers = [
  defaultResolvers,
  customerResolver,
  orderResolver,
  categoryResolver,
  productsResolver,
  predictionResolver,
  placeResolver,
  publicationResolver,
  basketResolver,
  cmsResolver,
  storeResolver,
]

export default mergeResolvers(resolvers)
