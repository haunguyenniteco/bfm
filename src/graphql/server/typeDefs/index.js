import { mergeTypes } from 'merge-graphql-schemas'
import defaultType from './default'
import categoryType from './category'
import productType from './product'
import productHitType from './productHit'
import productsType from './products'
import customerType from './customer'
import queryInput from './queryInput'
import predictionType from './prediction'
import placeType from './place'
import storeType from './store'
import AddressType from './address'
import publicationType from './publication'
import orderType from './order'
import basketType from './basket'
import contentType from './cms'

const types = [
  defaultType,
  AddressType,
  queryInput,
  categoryType,
  productType,
  predictionType,
  customerType,
  placeType,
  productsType,
  productHitType,
  publicationType,
  orderType,
  basketType,
  contentType,
  storeType,
]

// NOTE: 2nd param is optional, and defaults to false
// Only use if you have defined the same type multiple times in
// different files and wish to attempt merging them together.
export default mergeTypes(types, { all: true })
