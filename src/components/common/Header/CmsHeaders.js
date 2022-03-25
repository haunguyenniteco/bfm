import Box from '@mui/material/Box'
import useArea from '@hooks/useArea'

const CmsHeaders = () => {
  const { headerTop } = useArea('headerTop')
  const { headerNotification } = useArea('headerNotification')
  return (
    <Box>
      {headerTop && <Box>{headerTop}</Box>}
      {headerNotification && <Box>{headerNotification}</Box>}
    </Box>
  )
}

CmsHeaders.propTypes = {}

export default CmsHeaders
