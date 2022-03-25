import { memo, useState } from 'react'
import { FormattedMessage } from 'react-intl'
import shortid from 'shortid'
import { CurrencyPrice } from '@components/common'
import FavouriteToggle from '@components/favourite/FavouriteToggle'
import Grid from '@mui/material/Grid'
import Typography from '@components/ui/Typography/index'
import Box from '@mui/material/Box'
import Container from '@mui/material/Container'
import { useTheme } from '@mui/material/styles'
import useMediaQuery from '@mui/material/useMediaQuery'
import { Tabs as Tabs2, Tab } from '@components/ui/Tabs2'
import useAppState from '@hooks/useAppState'
import { useSimilarProducts } from '@graphql-sdk/react/queries'
import Hidden from '@mui/material/Hidden'
import { NextSeo } from 'next-seo'
import { getPriceForViews } from '@lib/helpers'
import ProductBreadcrumb from './ProductBreadcrumb'
import CartActions from './CartActions'
import ProductInfo from './ProductInfo'
import NutritionInfo from './NutritionInfo'
import { PageContainer, ProductBasicInfo, ProductTabs, ProductTab } from './elements'
import messages from './messages'
import SimilarProducts from './SimilarProducts'
import ComparisonPrices from './ComparisonPrices'
import DepositPrice from './DepositPrice'
import NetContent from './NetContent'
import Savings from '../Savings/index'
import Image from '../Image/index'

const ProductDetails = ({ product, locale }) => {
  const {
    name,
    languageSpecificBrandName,
    media,
    categories,
    prices,
    tradeItemMarketingMessage,
    nutrientHeaders,
    netContent,
    masterProductId,
  } = product
  const { intl, storeId } = useAppState()
  const [tab, setTab] = useState('description')

  let { tradeItemDescription } = product

  if (!tradeItemDescription) {
    tradeItemDescription = {}
    tradeItemDescription = product.name
  }
  const { price, oldPrice, isPiecePricedByWeight } = getPriceForViews(product)

  const theme = useTheme()
  const mdUp = useMediaQuery(theme.breakpoints.up('md'))
  const mdDown = useMediaQuery(theme.breakpoints.down('md'))

  const hasNutrition = nutrientHeaders && nutrientHeaders.length > 0 && nutrientHeaders[0].nutrientDetails.length > 0
  const variables = {
    storeId,
    masterProductId,
    pageSize: 4,
  }
  const { data = {}, loading, error } = useSimilarProducts(variables)
  let similarProducts = null
  if (!error && !loading && data?.similarProducts?.items.length) {
    similarProducts = data.similarProducts.items
  }

  return (
    <Box>
      <NextSeo title={name[locale]} description={name[locale]} />
      <ProductBreadcrumb name={name} categories={categories} locale={locale} />

      <Container sx={{ pb: 3 }}>
        <Grid container>
          <Grid item xs={12} md={6}>
            <Box sx={{ height: '450px', maxWidth: '450px', margin: 'auto', position: 'relative' }}>
              <Box display="flex" width={1} style={{ position: 'relative', top: 15, right: 15 }}>
                <FavouriteToggle />
              </Box>
              <Image media={media} alt={name[locale]} layout="fill" />
            </Box>
          </Grid>
          <Grid item xs={12} md={6}>
            <ProductBasicInfo>
              <div>
                {!!oldPrice && <Savings />}
                <Typography
                  variant={mdUp ? 'h1' : 'h2'}
                  component="h1"
                  color="G0"
                  fontSize="24px"
                  fontWeight="600"
                  gutterBottom
                  fontFamily="OpenSans Bold"
                >
                  {name[locale]}
                </Typography>
                {languageSpecificBrandName[locale] && (
                  <Box mb="12px">
                    <Typography variant="body2" color="textSecondary">
                      {languageSpecificBrandName[locale]}
                    </Typography>
                  </Box>
                )}
                {tradeItemDescription[locale] && (
                  <Hidden mdDown>
                    <Box mb={1} minHeight="80px">
                      <Typography component="p" sx={{ fontSize: '16px', fontWeight: 'normal' }}>
                        {tradeItemDescription[locale]}
                      </Typography>
                    </Box>
                  </Hidden>
                )}
              </div>
              <div>
                {tradeItemMarketingMessage && tradeItemMarketingMessage[locale] && (
                  <Typography color="textSecondary">{tradeItemMarketingMessage[locale]}</Typography>
                )}
              </div>

              <Box sx={{ marginTop: 'auto' }}>
                <Grid container alignItems="flex-end">
                  <Grid item xs>
                    {/* display promotion or normal price */}
                    {prices.clicksUnitPrice && (
                      <Typography
                        variant="h1"
                        component="span"
                        fontWeight="600"
                        fontSize="26px"
                        fontFamily="OpenSans Bold"
                        color="G1"
                      >
                        <CurrencyPrice value={price} about={isPiecePricedByWeight} />
                        {isPiecePricedByWeight && (
                          <Typography fontSize={10} fontWeight="500" component="span">
                            / each
                          </Typography>
                        )}
                      </Typography>
                    )}
                    {/* if there is price without vat */}
                    {prices.clicksUnitPriceWithoutVat && (
                      <Box alignItems="center" justifyContent="space-between" mb="10px">
                        <Typography variant="body2">
                          <FormattedMessage {...messages.priceWithoutVat} />
                          &nbsp;
                          <CurrencyPrice value={prices.clicksUnitPriceWithoutVat} />
                        </Typography>
                        <Typography variant="body2">
                          <FormattedMessage {...messages.vatPercentage} />
                          &nbsp;
                          {prices.clicksUnitPriceVatPercent}
                        </Typography>
                      </Box>
                    )}
                  </Grid>
                  {prices?.depositPrice > 0 && <DepositPrice prices={prices} />}
                </Grid>

                <Grid container justifyContent="space-between">
                  <Grid item>
                    <NetContent netContent={netContent} />
                  </Grid>
                  <Grid item>
                    {prices.comparisonPrices && prices.comparisonPrices.length > 0 && (
                      <ComparisonPrices prices={prices} shortid={shortid} />
                    )}
                  </Grid>
                </Grid>
                {!!oldPrice && (
                  <Typography fontSize="10px" mb={1} fontWeight="500" color="secondary">
                    {intl.formatMessage(messages.wasNow, {
                      was: <CurrencyPrice value={oldPrice} />,
                      now: <CurrencyPrice value={price} />,
                    })}
                  </Typography>
                )}
                <br />
                {prices.clicksUnitPrice && <CartActions product={product} />}
              </Box>
            </ProductBasicInfo>
          </Grid>
        </Grid>
      </Container>

      <Container sx={{ marginTop: '25px' }}>
        <Grid container>
          <Grid item xs={12} md={6}>
            <ProductTabs
              value={tab}
              style={{ wdith: '100%' }}
              variant="fullWidth"
              onChange={(_e, selectedTab) => setTab(selectedTab)}
            >
              <ProductTab label={intl.formatMessage(messages.description)} value="description" />
              {hasNutrition && <ProductTab label={intl.formatMessage(messages.info)} value="info" />}

              {mdDown && similarProducts && (
                <ProductTab label={intl.formatMessage(messages.similarProducts)} value="similar" />
              )}
            </ProductTabs>
            {tab === 'description' && false && (
              <Box bgcolor="white" py="40px">
                <PageContainer>
                  <Typography>{tradeItemDescription[locale]}</Typography>
                </PageContainer>
              </Box>
            )}
            <Box bgcolor="white" pt="20px">
              <PageContainer>
                <Grid container spacing={4}>
                  {tab === 'description' && (
                    <Grid item xs={12} md={12}>
                      <ProductInfo product={product} locale={locale} />
                    </Grid>
                  )}
                  {tab === 'info' && (
                    <Grid item xs={12} md={12}>
                      {hasNutrition && (
                        <>
                          <NutritionInfo nutrition={nutrientHeaders} locale={locale} />
                        </>
                      )}
                    </Grid>
                  )}
                </Grid>
              </PageContainer>
            </Box>
          </Grid>

          <Grid item sx={12} md={6}>
            {mdDown && tab === 'similar' && similarProducts && <SimilarProducts products={similarProducts} />}
            {mdUp && similarProducts && <SimilarProducts products={similarProducts} />}
          </Grid>
        </Grid>
      </Container>
    </Box>
  )
}

ProductDetails.propTypes = {}

const productPropsAreEqual = (prevProps, nextProps) =>
  prevProps.product.id === nextProps.product.id && prevProps.locale === nextProps.locale

export default memo(ProductDetails, productPropsAreEqual)
