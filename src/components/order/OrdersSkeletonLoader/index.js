import Skeleton from '@mui/material/Skeleton'
import Box from '@mui/material/Box'
import { AccountLayout } from '@components/common/index'
import { PageContent } from '../elements'

const OrdersSkeletonloader = () => {
  return (
    <AccountLayout>
      <PageContent>
        <Box width="100%">
          <Skeleton height="100px" mt="30px" />
          <Skeleton height="100px" mt="30px" />
          <Skeleton height="100px" mt="30px" />
          <Skeleton height="100px" mt="30px" />
          <Skeleton height="100px" mt="30px" />
        </Box>
      </PageContent>
    </AccountLayout>
  )
}

export default OrdersSkeletonloader
