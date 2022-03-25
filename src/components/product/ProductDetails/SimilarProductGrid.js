import useChangeLanguage from '@hooks/useChangeLanguage'
import ProductList from '@components/product/ProductList'
import { CartBox, CurrencyPrice } from '@components/common'

import { routeProductSelect } from '@lib/helpers'
import Box from '@mui/material/Box'
import ProductCard from '@components/product/ProductCard'
import { SimilarProductsWrapper } from './elements'

function ProductGrid({ loading, products, pagination, onLoadMore, width }) {
  const { locale } = useChangeLanguage()

  const onGridItemClick = (event, product) => {
    routeProductSelect(product, locale)
  }

  return (
    <Box flexWrap="wrap" display="flex">
      <SimilarProductsWrapper flex="1" mb="60px">
        <ProductList
          width={width}
          loadMore={onLoadMore}
          pagination={pagination}
          loading={loading}
          products={products}
          component={ProductCard}
          onItemClick={onGridItemClick}
          locale={locale}
          currencyComponent={CurrencyPrice}
          mediaWidth={320}
          mediaFit="contain"
          cartBoxComponent={CartBox}
          productGridItemSizeProps={{
            sm: 6,
            md: 6,
          }}
        />
      </SimilarProductsWrapper>
    </Box>
  )
}

const SimilarProductGrid = ({ products }) => (
  <ProductGrid
    products={products}
    width={[1 / 2, 1 / 2, 1 / 3, 1 / 3, 1 / 6]}
    loading={false}
    isSimilarProducts
    pagination={{ nextPage: null }}
  />
)

export default SimilarProductGrid
