import { gql } from '@apollo/client'
import { nameFragment } from '../fragments/products'

export const getCategoryDetails = gql`
  ${nameFragment}
  query CategoryDetails(
    $tree: String!
    $categoryId: String
    $directChildren: Boolean
    $levels: String = "1,2,3,4"
    $storeId: String!
    $pageSize: Int = 500
    $getParent: Boolean
  ) {
    categories(
      tree: $tree
      category_id: $categoryId
      direct_children: $directChildren
      levels: $levels
      store_id: $storeId
      page_size: $pageSize
    ) {
      extId
      parentExtId
      name {
        ...NameFields
      }
      parentName {
        ...NameFields
      }
      level
      order
      path
    }
    category(category_id: $categoryId, store_id: $storeId, tree: $tree, get_parent: $getParent) {
      parentExtId
      parentName {
        ...NameFields
      }
      extId
      name {
        ...NameFields
      }
      level
    }
  }
`
