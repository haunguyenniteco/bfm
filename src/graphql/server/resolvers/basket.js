import { handleErrors } from '../common/helpers'
import {
  mergeBasketAndShoppingList,
  createShoppingListPayload,
  parseShoppingListResponse,
  extendShoppingListItemsWithSearch,
} from '../common/shoppingList'
import productsResolver from './products'
import { validateBasket, releaseReservedBasket } from '../common/validation'

export const fetchProductData = async (_source, { storeId, items }, _info) => {
  try {
    const skus = items.map(({ sku }) => sku)
    if (!skus.length) return []
    const data = await productsResolver.Query.products(
      _source,
      {
        input: {
          store_id: storeId,
          gtin: skus,
          meta: {
            pagination: {
              page: 1,
              page_size: skus.length,
            },
          },
        },
      },
      _info,
    ).catch(handleErrors)
    return data.items
  } catch (error) {
    throw new Error('Fetch product data error', error)
  }
}

const retrieveShoppingList = async (_source, { storeId }, _info) => {
  try {
    const {
      dataSources,
      userScope: { customerId },
    } = _info
    // Get customer's shoping lists
    const shoppingLists = await dataSources.shopperAPI.getShoppingLists(customerId).catch(handleErrors)

    // If customer has no shopping lists, create a new empty one, and return that
    if (!shoppingLists.length) {
      return dataSources.shopperAPI.createShoppingList(customerId, { items: [] }).catch(handleErrors)
    }

    // Get the ID of active shopping list
    const activeShoppingList = shoppingLists.find(sl => sl.active)
    const activeShoppingListID = activeShoppingList && activeShoppingList.id
    if (!activeShoppingListID) {
      return dataSources.shopperAPI.createShoppingList(customerId, { items: [] }).catch(handleErrors)
    }

    // Get the items of the active shopping list
    const shoppingList = await dataSources.shopperAPI
      .getShoppingList(customerId, activeShoppingListID)
      .catch(handleErrors)

    const parsed = parseShoppingListResponse(shoppingList)
    const searchItems = await fetchProductData(_source, { storeId, items: parsed.items }, _info)
    const extendedShoppingListItems = extendShoppingListItemsWithSearch(parsed.items, searchItems)
    return { ...shoppingList, items: extendedShoppingListItems }
  } catch (error) {
    throw new Error('Retrieve shopping list error', error)
  }
}

const basketResolver = {
  Query: {
    initializeBasket: async (_source, { input = {} }, _info) => {
      try {
        const { items: cachedItems, id: cachedBasketId, alwaysValidate, storeId } = input
        const {
          dataSources,
          userScope: { customerId },
        } = _info

        // TODO:  Fix validateBasketItems dataSource when real customer feature is added.

        if (customerId) {
          const runRelease = releaseReservedBasket({
            items: cachedItems,
            validateFn: {},
            alwaysValidate,
          })
          const fetchShoppingList = retrieveShoppingList(_source, { storeId, customerId }, _info)
          const [shoppingList] = await Promise.all([fetchShoppingList, runRelease])

          if (shoppingList) {
            // Release the inventory balance of the cached basket items before merging with shopping list
            const mergedItems = mergeBasketAndShoppingList(cachedItems, shoppingList.items)

            // Validate merged items
            const { items, notAvailableItems, notEnoughQuantityItems } = await validateBasket({
              items: mergedItems,
              validateFn: {},
              alwaysValidate,
            })

            // Update shopping list
            const payload = createShoppingListPayload(items)
            await dataSources.shopperAPI.emptyShoppingList(customerId, shoppingList.id).catch(handleErrors)
            dataSources.shopperAPI.addToShoppingList(customerId, shoppingList.id, payload).catch(handleErrors)
            return { id: shoppingList.id, items, notAvailableItems, notEnoughQuantityItems }
          }
        }

        // Validate guest basket
        const { items, notAvailableItems, notEnoughQuantityItems } = await validateBasket({
          items: cachedItems,
          validateFn: {},
          alwaysValidate,
        })

        return { id: cachedBasketId, items, notAvailableItems, notEnoughQuantityItems }
      } catch (error) {
        return JSON.stringify(error)
      }
    },
  },
  Mutation: {
    validateInventory: async (_source, { input = {} }, { dataSources, userScope }) => {
      try {
        const { items: itemsToValidate, id, alwaysValidate, storeId } = input
        const { customerId } = userScope

        const { items, notAvailableItems, notEnoughQuantityItems } = await validateBasket({
          items: itemsToValidate,
          validateFn: {},
          alwaysValidate,
        })

        if (customerId) {
          const payload = createShoppingListPayload(items)
          await dataSources.shopperAPI.emptyShoppingList(customerId, id).catch(handleErrors)
          dataSources.shopperAPI.addToShoppingList(customerId, id, payload).catch(handleErrors)
        }

        return { id, items, notAvailableItems, notEnoughQuantityItems }
      } catch (error) {
        throw new Error('Inventory validation error', error)
      }
    },

    clearBasket: async (_source, { input = {} }, { dataSources, userScope }) => {
      try {
        const { id, alwaysValidate, storeId } = input
        const { customerId } = userScope
        // TODO: Release the reserved basket of non logged in users.
        if (customerId) {
          const shoppingList = await dataSources.shopperAPI.getShoppingList(customerId, id).catch(handleErrors)
          if (shoppingList) {
            const masterIds = shoppingList.items.map(({ product: { masterProductId } }) => ({ masterProductId }))
            await dataSources.shopperAPI.emptyShoppingList(customerId, id).catch(handleErrors)
            releaseReservedBasket({
              items: masterIds,
              validateFn: {},
              alwaysValidate,
            })
          }
        }
        return true
      } catch (error) {
        return JSON.stringify(error)
      }
    },
  },
}

export default basketResolver
