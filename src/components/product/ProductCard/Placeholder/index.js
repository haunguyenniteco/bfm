import Paper from '@mui/material/Paper'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Skeleton from '@mui/material/Skeleton'

const Placeholder = () => (
  <Paper variant="outlined" square>
    <Box padding={1}>
      <Box position="relative" mb={2}>
        <Skeleton variant="rectangular" height={144} />
      </Box>
      <Box fontSize={14} fontWeight="500">
        <Skeleton variant="text" />
      </Box>
      <Typography variant="body2" color="textSecondary">
        <Skeleton variant="text" />
      </Typography>
      <Box display="flex" justifyContent="space-between">
        <Box fontSize={18} fontWeight="500">
          <Skeleton width={60} />
        </Box>
      </Box>
    </Box>
  </Paper>
)

export default Placeholder
