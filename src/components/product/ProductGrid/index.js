import { NextSeo } from 'next-seo'
import Hidden from '@mui/material/Hidden'
import Container from '@mui/material/Container'
import Grid from '@mui/material/Grid'
import useCategories from '@hooks/useCategories'
import useAppState from '@hooks/useAppState'
import useChangeLanguage from '@hooks/useChangeLanguage'
import SidebarCategoryNavigation from '@components/product/SidebarCategoryNavigation'
import { routeProductSelect } from '@lib/helpers'
import useContent from '@hooks/useContent'
import ProductCard from '@components/product/ProductCard'
import ProductList from '../ProductList'
import messages from '../messages'

function ProductGrid({ loading, products, pagination, onLoadMore, width, aggregations, selectedFacets, handleFacets }) {
  const { intl } = useAppState()
  const { loading: loadingCategory, error, category } = useCategories()
  const { locale } = useChangeLanguage()
  const { content } = useContent()

  const title = (category && category.name[locale]) || intl.formatMessage(messages.seoTitle)
  let categoriesHeader = ' '
  if (loadingCategory === false && !error) {
    if (category) {
      categoriesHeader = category.name[locale]
    } else {
      categoriesHeader = intl.formatMessage(messages.allProductsLabel)
    }
  }

  const onGridItemClick = (event, product) => {
    routeProductSelect(product, locale)
  }

  return (
    <>
      <NextSeo title={title} description={title} />
      <Container>
        <Grid container spacing={1}>
          <Hidden mdDown>
            <Grid item xs={3}>
              <SidebarCategoryNavigation />
            </Grid>
          </Hidden>
          <Grid item xs>
            {content}
            <ProductList
              categoriesHeader={categoriesHeader}
              width={width}
              loadMore={onLoadMore}
              pagination={pagination}
              loading={loading}
              products={products}
              component={ProductCard}
              onItemClick={onGridItemClick}
              locale={locale}
              mediaThumbnailWidth={130}
              mediaWidth={320}
              mediaFit="contain"
              priceWithoutVatLabel={intl.formatMessage(messages.priceWithoutVat)}
              vatPercentageLabel={intl.formatMessage(messages.vatPercentage)}
              aggregations={aggregations}
              selectedFacets={selectedFacets}
              handleFacets={handleFacets}
            />
          </Grid>
        </Grid>
      </Container>
    </>
  )
}

ProductGrid.propTypes = {}

export default ProductGrid
