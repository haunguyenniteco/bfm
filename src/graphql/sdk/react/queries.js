import { useCallback } from 'react'
import { queryFactory, queryWithVariablesFactory } from './queryFactory'
import { Query } from '../queries'

export const useIsSignedIn = queryFactory(Query.isSignedIn)
export const useUserDetails = queryFactory(Query.getUserDetails)

export const useCategoryDetails = queryWithVariablesFactory(Query.getCategoryDetails)
export const usePredictions = queryWithVariablesFactory(Query.getSearchPredictions)
export const useStoreInfo = queryWithVariablesFactory(Query.getStoreInfo)
export const usePlacesForPickupAndDeliveries = queryWithVariablesFactory(Query.getPlacesForPickupAndDeliveries)
export const useDeliverySlots = queryWithVariablesFactory(Query.getDeliverySlots)
export const usePickupSlots = queryWithVariablesFactory(Query.getPickupSlots)
export const useDeliveryAreaGroups = queryWithVariablesFactory(Query.getDeliveryAreaGroups)

export const useProductDetails = queryWithVariablesFactory(Query.getProductDetails)
export const useProductList = queryWithVariablesFactory(Query.getProductListDetails)
export const useSimilarProducts = queryWithVariablesFactory(Query.getProductSimilarProducts)
export const useGetOrchestration = queryWithVariablesFactory(Query.getOrchestration)
export const useOrder = queryWithVariablesFactory(Query.getOrder)
export const useOrderList = queryWithVariablesFactory(Query.getOrderList)
export const useCmsContent = queryWithVariablesFactory(Query.getCmsContent)
export const useCmsArea = queryWithVariablesFactory(Query.getCmsArea)

export function useLoadMoreProducts(fetchMore, variables) {
  const loadMore = useCallback(() => {
    fetchMore({
      variables: {
        ...variables,
      },
      updateQuery: (prevResult, { fetchMoreResult }) => {
        const { items: newItems, pagination: newPagination } = fetchMoreResult.products
        return newItems.length
          ? {
              products: {
                __typename: prevResult.products.__typename, // eslint-disable-line no-underscore-dangle
                items: [...prevResult.products.items, ...newItems],
                pagination: newPagination,
                aggregations: prevResult.products.aggregations,
              },
            }
          : prevResult
      },
    })
  }, [fetchMore, variables])

  return [loadMore]
}
