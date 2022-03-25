import { useProductList } from '@graphql-sdk/react/queries'
import useAppState from '@hooks/useAppState'
import useChangeLanguage from '@hooks/useChangeLanguage'
import Grid from '@mui/material/Grid'
import ProductCard from '../ProductCard/index'

const ProductsCards = ({ gtin }) => {
  const { storeId } = useAppState()
  const { locale } = useChangeLanguage()

  const { data, loading, error } = useProductList({
    input: {
      store_id: storeId,
      gtin,
    },
  })
  if (loading || error) {
    return null
  }
  return (
    <Grid container spacing={2}>
      {data.products.items.map(product => (
        <Grid key={product.gtin} item xs={6} sm={4} md={3} lg={2.4}>
          <ProductCard product={product} locale={locale} />
        </Grid>
      ))}
    </Grid>
  )
}

export default ProductsCards
