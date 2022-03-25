import { memo } from 'react'
import PropTypes from 'prop-types'
import InfiniteScroll from 'react-infinite-scroll-component'
import shortid from 'shortid'
import EmptyProductAssortment from '@components/product/EmptyProductAssortment'
import Typography from '@components/ui/Typography/index'
import Grid from '@mui/material/Grid'
import Placeholder from 'components/product/ProductCard/Placeholder'
import { HeaderContainer } from './elements'
import ProductFacets from '../ProductFacets/index'

const ProductGrid = props => {
  const {
    className,
    component,
    onItemClick,
    placeholderImageURL,
    loading,
    loadMore,
    products,
    pagination,
    locale,
    currencyComponent,
    cartBoxComponent,
    mediaWidth,
    mediaThumbnailWidth,
    mediaFit,
    flexWrap,
    width,
    componentClassName,
    isSimilarProducts,
    categoriesHeader,
    aggregations,
    handleFacets,
    selectedFacets,
    productGridItemSizeProps,
  } = props

  const { page, nextPage } = pagination
  const hasMore = nextPage !== null

  const gridItemProps = {
    placeholderImageURL,
    onItemClick,
    locale,
    currencyComponent,
    cartBoxComponent,
    mediaWidth,
    mediaThumbnailWidth,
    mediaFit,
  }

  const listItems = loading ? [1, 2, 3, 4, 5, 6, 7, 8] : products
  const ProductGridItem = loading ? Placeholder : component

  return (
    <>
      {categoriesHeader && (
        <HeaderContainer>
          <Typography variant="h1" data-cy="category-title">
            {categoriesHeader}
          </Typography>
        </HeaderContainer>
      )}
      <ProductFacets
        aggregations={aggregations}
        handleFacets={handleFacets}
        selectedFacets={selectedFacets}
        totalCount={pagination.totalCount}
      />
      <InfiniteScroll initialLoad={false} dataLength={listItems.length} next={loadMore} hasMore={hasMore}>
        <Grid container spacing={2}>
          {listItems.map(product => (
            <Grid key={shortid.generate()} item xs={6} sm={4} md={4} {...productGridItemSizeProps}>
              <ProductGridItem product={product} {...gridItemProps} />
            </Grid>
          ))}
        </Grid>

        {!listItems?.length && <EmptyProductAssortment />}
      </InfiniteScroll>
    </>
  )
}

ProductGrid.defaultProps = {
  onItemClick() {},
  placeholderImageURL: '/images/default-product.png',
  products: [],
  locale: 'en',
  flexWrap: 'wrap',
  width: [1 / 2, 1 / 2, 1 / 3, 1 / 3, 1 / 4],
  className: 'product-grid-container',
  componentClassName: 'grid-item',
  loadMore: () => {},
}

ProductGrid.propTypes = {
  /**
   * You can provide a `className` prop that will be applied to the outermost DOM element
   * rendered by this component. We do not recommend using this for styling purposes, but
   * it can be useful as a selector in some situations.
   */
  className: PropTypes.string,
  /**
   * If you've set up a components context using
   * [@reactioncommerce/components-context](https://github.com/reactioncommerce/components-context)
   * (recommended), then this prop will come from there automatically. If you have not
   * set up a components context or you want to override one of the components in a
   * single spot, you can pass in the components prop directly.
   */
  component: PropTypes.elementType.isRequired,
  /**
   * The inital size the grid should render at. Use to set grid width during SSR.
   */
  initialSize: PropTypes.shape({
    height: PropTypes.number,
    width: PropTypes.number,
  }),
  /**
   * Item click handler
   */
  onItemClick: PropTypes.func,
  /**
   * Image to display when product doesn't have a primary image
   */
  placeholderImageURL: PropTypes.string,
  /**
   * Products to display in the grid. Refer to `CatalogGridItem`'s documentation
   */
  products: PropTypes.arrayOf(PropTypes.object),

  locale: PropTypes.string,

  mediaWidth: PropTypes.number.isRequired,

  mediaFit: PropTypes.oneOf(['contain', 'cover']),

  /**  The width prop can set fixed or percentage-based widths on an element */
  width: PropTypes.arrayOf(PropTypes.number),
  flexWrap: PropTypes.string,
  componentClassName: PropTypes.string,

  loadMore: PropTypes.func,
}

export default memo(ProductGrid)
