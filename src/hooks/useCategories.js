import { useCategoryDetails } from '@graphql-sdk/react/queries'
import useAppState from '@hooks/useAppState'
import { useRouter } from 'next/router'

function useCategories(categoryIdParam) {
  const { storeId } = useAppState()
  const {
    query: { categoryId: categoryIdRoute },
  } = useRouter()
  let categoryId = categoryIdParam
  // we use id from route only if param is not set (undefined)
  // otherwise is can be set with id or null (to get root categories)
  if (typeof categoryId === 'undefined') {
    categoryId = categoryIdRoute
  }
  const {
    loading,
    error,
    data: { categories, category } = {},
  } = useCategoryDetails({
    storeId,
    tree: 'online',
    directChildren: true,
    categoryId: categoryId || 'online',
    getParent: !!categoryId,
  })
  return {
    loading,
    error,
    category,
    categories,
    categoryId,
  }
}

export default useCategories
