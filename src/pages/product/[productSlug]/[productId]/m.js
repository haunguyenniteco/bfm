import { defaultImage, getDefaultImageUrl } from '@lib/mediaTransform'
import Breadcrumbs from '@components/ui/Breadcrumbs/index'
import { useProductDetails } from '@graphql-sdk'
import useAppState from '@hooks/useAppState'
import useChangeLanguage from '@hooks/useChangeLanguage'
import { useRouter } from 'next/router'
import Typography from '@mui/material/Typography'
import Link from '@mui/material/Link'
import Box from '@mui/material/Box'
import { ProgressiveImage } from '@components/ui'
// import { Hide } from '@components/ui'
import { Tabs, Tab } from '@components/ui/Tabs2/index'

const Product = () => {
  const { storeId } = useAppState()
  const { locale } = useChangeLanguage()
  const router = useRouter()
  const { query } = router

  const { productId } = query

  const variables = {
    storeId,
    productId,
    locale,
  }
  const { data, loading, error } = useProductDetails(variables, { skip: !productId })
  const { product } = data || {}

  if (loading) {
    return null
  }

  const {
    name,
    languageSpecificBrandName,
    media,
    categories,
    tradeItemDescription,
    prices,
    tradeItemMarketingMessage,
    nutrientHeaders,
    netContent,
    promotions,
  } = product

  const getMainImage = getDefaultImageUrl(media, 320)

  return (
    <div>
      <div style={{ padding: 16 }}>
        <Breadcrumbs>
          <Link color="inherit" href="/">
            Material-UI
          </Link>
          <Link color="inherit" href="/getting-started/installation/">
            Core
          </Link>
          <Typography color="textPrimary">Breadcrumb</Typography>
        </Breadcrumbs>
        <Box>
          <ProgressiveImage
            key={name[locale]}
            fit="contain"
            altText={name[locale]}
            presrc={defaultImage}
            src={getMainImage || defaultImage}
          />
        </Box>
        <div>
          {name[locale]}
          {/* <ProductName>{name[locale]}</ProductName> */}
          {/* {languageSpecificBrandName[locale] && (
                <Box mb="12px">
                  <Text color="G5" fontSize={0} lineHeight="2.17">
                    {languageSpecificBrandName[locale]}
                  </Text>
                </Box>
              )}
              {tradeItemDescription[locale] && (
                <Hide xs sm md>
                  <Text fontSize={2} lineHeight="1.25">
                    {tradeItemDescription[locale]}
                  </Text>
                </Hide>
              )} */}
        </div>
        {/* <div>
              {tradeItemMarketingMessage && tradeItemMarketingMessage[locale] && (
                <Text color="G5" mt={3}>
                  {tradeItemMarketingMessage[locale]}
                </Text>
              )}
            </div>
            <div>
              {prices.clicksUnitPrice && typeof promotions !== 'undefined' && promotions?.[0] && (
                <Text color="G0" fontSize="28px" fontWeight="bold" lineHeight="1" mt="15px">
                  <PromotionPrice oldPrice={prices.clicksUnitPrice} newPrice={promotions[0].clicksPromotionPrice} />
                </Text>
              )}
              {prices.clicksUnitPrice && (typeof promotions === 'undefined' || !promotions?.[0]) && (
                <Text color="G0" fontSize="28px" fontWeight="bold" lineHeight="1" mt="15px">
                  <CurrencyPrice value={prices.clicksUnitPrice} />
                </Text>
              )}
              {prices.clicksUnitPriceWithoutVat && (
                <Flex alignItems="center" justifyContent="space-between" mb="10px">
                  <Text color="G0" fontSize="12px" fontWeight="normal" lineHeight="1" mt="12px">
                    <FormattedMessage {...messages.priceWithoutVat} />
                    &nbsp;
                    <CurrencyPrice value={prices.clicksUnitPriceWithoutVat} />
                  </Text>
                  <Text color="G0" fontSize="12px" fontWeight="normal" lineHeight="1" mt="12px">
                    <FormattedMessage {...messages.vatPercentage} />
                    &nbsp;
                    {prices.clicksUnitPriceVatPercent}
                  </Text>
                </Flex>
              )}
              <Flex alignItems="center" justifyContent="space-between" mb="10px">
                <NetContent netContent={netContent} />

                {prices.comparisonPrices && prices.comparisonPrices.length > 0 && (
                  <Box mb="6px">
                    {prices.comparisonPrices.map(item => (
                      <Measurement lineHeight={1} mb="3px" key={shortid.generate()}>
                        {item.comparisonPriceText}
                      </Measurement>
                    ))}
                  </Box>
                )}
              </Flex>

              {prices.clicksUnitPrice && <CartActions product={product} />}
            </div> */}
      </div>
      <Tabs value={0} indicatorColor="primary">
        <Tab label="Tab 1 Title" />
        <Tab label="Tab 2 Title" />
        <Tab label="Tab 3 Title" />
      </Tabs>
    </div>
  )
}

Product.hasDefaultLayout = false

export default Product
