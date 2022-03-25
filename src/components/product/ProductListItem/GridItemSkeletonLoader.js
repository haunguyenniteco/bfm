/**
 * GridItemSkeletonLoader
 */

import Box from '@mui/material/Box'
import { Skeleton } from '@components/ui'
import { ProductCard, ProductCardHead, Details, Info } from './elements'

function GridItemSkeletonLoader() {
  return (
    <ProductCard bg="white">
      <ProductCardHead pb="4px" mb="15px" justifyContent="center" alignItems="center" data-cy="product_card">
        <Skeleton width="100%" height={['160px', '190px', '240px']} variant="rect" />
      </ProductCardHead>
      <Details>
        <Box flexDirection="column" mb="6px" height="60px" display="flex">
          <Skeleton width="100%" height={15} variant="rect" style={{ marginBottom: '5px' }} />
          <Skeleton width="50%" height={15} variant="rect" />
        </Box>
        <Box css={{ height: '15px' }} mt="8px" display="flex">
          <Skeleton width={80} height="100%" variant="rect" />
        </Box>
        <Box mt="5px" css={{ height: '15px' }} display="flex">
          <Skeleton width={80} height="100%" variant="rect" />
        </Box>
      </Details>
      <Info />
    </ProductCard>
  )
}

GridItemSkeletonLoader.propTypes = {}

export default GridItemSkeletonLoader
