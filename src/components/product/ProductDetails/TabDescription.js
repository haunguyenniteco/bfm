import Box from '@mui/material/Box'
import ProductInfo from './ProductInfo'

const TabDetails = ({ product, locale }) => {
  return (
    <Box px="15px">
      <ProductInfo product={product} locale={locale} />
    </Box>
  )
}

export default TabDetails
