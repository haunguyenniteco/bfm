import Skeleton from '@mui/material/Skeleton'
import Box from '@mui/material/Box'
import { AuthLayout, CheckoutContainer } from '@components/common'

const SelectStoreSkeletonloader = () => {
  return (
    <AuthLayout noContainer allowBackOption={false} allowCloseOption={false}>
      <CheckoutContainer
        headerComponent={
          <>
            <Skeleton variant="text" sx={{ mt: 10 }} />
            <Box display="flex">
              <Skeleton width="100%" sx={{ m: 0.5 }} />
              <Skeleton width="100%" sx={{ m: 0.5 }} />
            </Box>
          </>
        }
        footerComponent={
          <Box>
            <Skeleton sx={{ p: 2 }} />
            <Skeleton animation="wave" sx={{ p: 2 }} />
            <Skeleton animation={false} sx={{ p: 2 }} />
          </Box>
        }
      />
    </AuthLayout>
  )
}

export default SelectStoreSkeletonloader
