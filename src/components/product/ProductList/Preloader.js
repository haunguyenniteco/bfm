import Box from '@mui/material/Box'
import shortid from 'shortid'
import Typography from '@mui/material/Typography'
import { GridContainer, GridItem } from './elements'
import GridItemSkeletonLoader from '../ProductListItem/GridItemSkeletonLoader'

const PreloaderText = () => (
  <Box flexDirection="column" alignItems="center" display="flex">
    <Typography fontWeight="normal" lineHeight="120%" mt="20px">
      Loading ...
    </Typography>
  </Box>
)

const Preloader = ({ flexWrap, className, width, page, isSimilarProducts }) => {
  if (isSimilarProducts || page === 1) {
    return null
  }

  return [
    <GridContainer flexWrap={flexWrap} className={className} key={shortid.generate()}>
      {[1, 2, 3, 4].map((product, index) => (
        <GridItem
          px={2}
          py={2}
          width={width}
          // eslint-disable-next-line react/no-array-index-key
          key={`grid-skeleton-item-${index}-${product}`}
          className="product-grid-item"
        >
          <GridItemSkeletonLoader />
        </GridItem>
      ))}
    </GridContainer>,
    <PreloaderText key={shortid.generate()} />,
  ]
}

export default Preloader
