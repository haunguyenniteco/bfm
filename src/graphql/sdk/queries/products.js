import { gql } from '@apollo/client'
import { productSearchFragment, productDetailsFragment, basicProductFragment } from '../fragments/products'

export const getProductListDetails = gql`
  ${productSearchFragment}
  query ProductList($input: ProductsQueryInput) {
    products(input: $input) {
      ...SearchResults
    }
  }
`

export const getProductDetails = gql`
  ${productDetailsFragment}
  query ProductDetails($storeId: String!, $productId: String!) {
    product(storeId: $storeId, productId: $productId) {
      ...ProductFields
    }
  }
`

export const getProductSimilarProducts = gql`
  ${basicProductFragment}
  query SimilarProducts($storeId: String!, $masterProductId: String!, $page: Int, $pageSize: Int) {
    similarProducts(storeId: $storeId, masterProductId: $masterProductId, page: $page, pageSize: $pageSize) {
      items {
        ...BasicProductFields
      }
    }
  }
`
