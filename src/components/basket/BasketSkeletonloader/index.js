import Skeleton from '@mui/material/Skeleton'
import Stack from '@mui/material/Stack'
import Box from '@mui/material/Box'
import { AuthLayout, CheckoutContainer } from '@components/common'

const BasketSkeletonloader = () => {
  return (
    <AuthLayout allowBackOption={false} allowCloseOption={false}>
      <CheckoutContainer
        headerComponent={
          <Stack>
            <Skeleton variant="text" height={100} />
            <Box sx={{ pb: 1 }} width="50%">
              <Skeleton variant="text" animation={false} />
              <Skeleton variant="text" animation={false} />
              <Skeleton variant="text" animation={false} />
            </Box>
            <Skeleton variant="text" height={100} />
          </Stack>
        }
        footerComponent={
          <Box>
            <Skeleton sx={{ p: 1 }} height={200} />
            <Skeleton animation={false} sx={{ p: 1 }} />
            <Skeleton sx={{ p: 1 }} height={200} />
          </Box>
        }
      />
    </AuthLayout>
  )
}

export default BasketSkeletonloader
