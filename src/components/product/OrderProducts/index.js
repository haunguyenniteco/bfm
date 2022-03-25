import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import Avatar from '@mui/material/Avatar'
import CardContent from '@mui/material/CardContent'
import CardHeader from '@mui/material/CardHeader'
import { Typography } from '@components/ui/index'
import { CurrencyPrice } from '@components/common'
import { getDefaultImageUrl } from '@lib/mediaTransform'
import useChangeLanguage from '@hooks/useChangeLanguage'
import { ProductTotal, ProductPriceDetail } from './elements'

const OrderProducts = ({ products = [], title }) => {
  const { locale } = useChangeLanguage()
  return (
    <Box pb={5}>
      <Typography variant="h2">{title}</Typography>
      {products.map(({ quantity, product, externalData }) => (
        <Card key={product.id} sx={{ my: 1, boxShadow: 'none' }}>
          <CardHeader
            disableTypography
            avatar={
              <Avatar
                variant="square"
                aria-label={product.name.en}
                alt={product.name.en}
                src={getDefaultImageUrl(product.media, 70)}
              />
            }
            title={product.name[locale]}
          />
          <CardContent sx={{ display: 'flex' }}>
            <ProductPriceDetail>
              {quantity} x <CurrencyPrice value={externalData.price} />
            </ProductPriceDetail>
            <ProductTotal>
              <CurrencyPrice value={quantity * externalData.price} />
            </ProductTotal>
          </CardContent>
        </Card>
      ))}
    </Box>
  )
}

export default OrderProducts
