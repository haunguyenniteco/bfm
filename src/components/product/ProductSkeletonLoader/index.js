import Skeleton from '@mui/material/Skeleton'
import Stack from '@mui/material/Stack'
import Grid from '@mui/material/Grid'
import Box from '@mui/material/Box'
import Container from '@mui/material/Container'

function ProductSkeletonLoader() {
  return (
    <Container py={4}>
      <Stack spacing={1} py={2}>
        <Skeleton variant="text" />
      </Stack>
      <Box sx={{ flexGrow: 1 }}>
        <Grid container spacing={{ xs: 2, md: 3 }}>
          <Grid item xs={12} sm={6}>
            <Skeleton variant="rectangular" height="60vh" />
          </Grid>
          <Grid item xs={12} sm={6}>
            <Skeleton animation="wave" />
            <Skeleton animation="wave" width="60%" />
            <Skeleton animation="wave" width="60%" height={60} />
          </Grid>
        </Grid>
      </Box>

      <Box py={3}>
        <Skeleton variant="text" height={100} />
      </Box>

      <Box sx={{ flexGrow: 1 }}>
        <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
          <Grid item xs={2} sm={4} md={4}>
            <Skeleton animation="wave" height={300} />
          </Grid>
          <Grid item xs={2} sm={4} md={4}>
            <Skeleton animation="wave" height={300} />
          </Grid>
          <Grid item xs={2} sm={4} md={4}>
            <Skeleton animation="wave" height={300} />
          </Grid>
          <Grid item xs={2} sm={4} md={4}>
            <Skeleton animation="wave" height={300} />
          </Grid>
        </Grid>
      </Box>
    </Container>
  )
}

ProductSkeletonLoader.propTypes = {}

export default ProductSkeletonLoader
