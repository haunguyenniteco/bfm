import { AuthLayout, CheckoutContainer } from '@components/common'
import Skeleton from '@mui/material/Skeleton'

const SelectStoreSkeletonloader = () => {
  return (
    <AuthLayout noContainer>
      <CheckoutContainer
        headerComponent={
          <>
            <Skeleton height="100px" my="15px" />
            <Skeleton height="50px" mb="5px" />
            <Skeleton height="100px" my="15px" />
          </>
        }
        footerComponent={
          <>
            <Skeleton width="100%" height="50px" mb="10px" />
            <Skeleton width="100%" height="50px" mb="10px" />
            <Skeleton width="100%" height="50px" mb="10px" />
            <Skeleton width="100%" height="50px" mb="10px" />
            <Skeleton width="100%" height="50px" mb="10px" />
            <Skeleton width="100%" height="150px" mb="10px" />
          </>
        }
      />
    </AuthLayout>
  )
}

export default SelectStoreSkeletonloader
