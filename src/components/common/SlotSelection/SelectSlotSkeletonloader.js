import Skeleton from '@mui/material/Skeleton'
import Stack from '@mui/material/Stack'
import Box from '@mui/material/Box'
import { AuthLayout, CheckoutContainer } from '@components/common'

const SelectSlotSkeletonloader = () => {
  return (
    <AuthLayout allowBackOption={false} allowCloseOption={false}>
      <CheckoutContainer
        headerComponent={
          <>
            <Skeleton variant="text" sx={{ mt: 2 }} />
            <Stack>
              <Skeleton variant="text" sx={{ mt: 2 }} />
              <Box display="flex">
                <Skeleton width="100%" sx={{ m: 0.5 }} />
                <Skeleton width="100%" sx={{ m: 0.5 }} />
                <Skeleton width="100%" sx={{ m: 0.5 }} />
                <Skeleton width="100%" sx={{ m: 0.5 }} />
                <Skeleton width="100%" sx={{ m: 0.5 }} />
                <Skeleton width="100%" sx={{ m: 0.5 }} />
              </Box>
            </Stack>
          </>
        }
        footerComponent={
          <>
            <Skeleton sx={{ p: 1 }} />
            <Skeleton animation="wave" sx={{ p: 1 }} />
            <Skeleton animation={false} sx={{ p: 1 }} />
            <Skeleton animation={false} sx={{ p: 1 }} />
            <Skeleton animation={false} sx={{ p: 1 }} />
          </>
        }
      />
    </AuthLayout>
  )
}

export default SelectSlotSkeletonloader
