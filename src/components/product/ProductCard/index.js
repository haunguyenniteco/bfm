import Link from 'next/link'
import MuiLink from '@mui/material/Link'
import shortid from 'shortid'
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import CardActions from '@mui/material/CardActions'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'
import FavouriteToggle from '@components/favourite/FavouriteToggle/index'
import CartBox from '@components/common/CartBox/index'
import CurrencyPrice from '@components/common/CurrencyPrice/index'
import { getPriceForViews, getProductRoute } from '@lib/helpers'
import useAppState from '@hooks/useAppState'
import ProductOffer from '@components/Icons/ProductOffer'
import ComparisonPrices from '../ProductDetails/ComparisonPrices'
import NetContent from '../ProductDetails/NetContent'
import messages from '../messages'
import Image from '../Image/index'

const ProductCard = ({ product, locale }) => {
  const { intl } = useAppState()
  const { name, prices, netContent = [], media, priceComparisonMeasurements = [] } = product

  const { price, oldPrice, isPiecePricedByWeight } = getPriceForViews(product)

  return (
    <Card variant="outlined" sx={{ minHeight: '360px', height: '100%' }}>
      <CardContent style={{ padding: '7px' }}>
        <Box position="relative" mb={2}>
          <Link href={getProductRoute(product, locale)} passHref>
            <MuiLink aria-label={name[locale]}>
              <Image media={media} alt={name[locale]} width={320} height={320} />
            </MuiLink>
          </Link>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              position: 'absolute',
              top: 0,
              left: 0,
              backgroundColor: 'rgba(255,255,255,.7)',
              paddingRight: 1,
              marginRight: 3,
            }}
          >
            {!!oldPrice && (
              <Typography fontSize="10px" mb={0.5} fontWeight="500" color="secondary">
                <ProductOffer style={{ verticalAlign: 'middle', marginRight: 8 }} />
              </Typography>
            )}
          </Box>
          <FavouriteToggle />
        </Box>
        <Link href={getProductRoute(product, locale)} passHref>
          <MuiLink color="inherit">
            <Box>
              <Typography fontWeight="600" minHeight="40px" lineHeight="2.5ex" height="7.5ex" overflow="hidden">
                {name[locale]}
              </Typography>
            </Box>
          </MuiLink>
        </Link>
      </CardContent>
      <CardActions>
        {prices.clicksUnitPrice && (
          <Box
            fontSize={18}
            fontWeight="600"
            display="flex"
            alignItems="center"
            justifyContent="space-between"
            width="100%"
          >
            <Box>
              <CurrencyPrice value={price} about={isPiecePricedByWeight} />
              {isPiecePricedByWeight && (
                <Typography fontSize={10} fontWeight="500" component="span">
                  / each
                </Typography>
              )}
            </Box>

            {prices?.depositPrice > 0 && (
              <Typography fontSize={10} fontWeight="bold">
                {intl.formatMessage(messages.deposit)}
                &nbsp;
                <CurrencyPrice value={prices.depositPrice} />
              </Typography>
            )}
          </Box>
        )}
      </CardActions>
      <CardActions>
        <Box width="50%">
          {prices.clicksUnitPriceWithoutVat && (
            <Box display="flex" justifyContent="space-between">
              <Typography variant="body2" color="textSecondary">
                {intl.formatMessage(messages.priceWithoutVat)}
                &nbsp;
                <CurrencyPrice value={prices.clicksUnitPriceWithoutVat} />
              </Typography>
              <Typography variant="body2" color="textSecondary">
                {intl.formatMessage(messages.vatPercentage)}
                &nbsp;
                {prices.clicksUnitPriceVatPercent}
              </Typography>
            </Box>
          )}
          <Box>
            <NetContent netContent={netContent} />
          </Box>
        </Box>
        <Box width="50%">
          <Box variant="body2" paragraph color="textSecondary">
            {prices.comparisonPrices && prices.comparisonPrices.length > 0 && (
              <ComparisonPrices prices={prices} shortid={shortid} />
            )}
          </Box>

          {!!priceComparisonMeasurements?.length && (
            <Typography variant="body2" paragraph color="textSecondary">
              {priceComparisonMeasurements.map((comparisonItem, index) => (
                <span key={index}>{comparisonItem.comparisonPriceText}</span>
              ))}
            </Typography>
          )}
        </Box>
      </CardActions>
      <CardActions>
        <CartBox product={product} width="100%" maxWidth="100%" isSmall />
      </CardActions>
      {!!oldPrice && (
        <CardActions style={{ paddingTop: 0 }}>
          <Typography fontSize="10px" fontWeight="500" color="secondary">
            {intl.formatMessage(messages.wasNow, {
              was: <CurrencyPrice value={oldPrice} />,
              now: <CurrencyPrice value={price} />,
            })}
          </Typography>
        </CardActions>
      )}
    </Card>
  )
}

export default ProductCard
