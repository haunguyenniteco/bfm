import getConfig from 'next/config'
import Box from '@mui/material/Box'

const { publicRuntimeConfig = {} } = getConfig() || {}

const BuildInfo = () => {
  const { clusterName, buildDate, buildId, buildImage } = publicRuntimeConfig

  if (clusterName === 'production') return null

  return (
    <Box display="flex" flexDirection="column">
      <Box
        bgcolor="black"
        color="white"
        fontWeight="bold"
        component="span"
        px="5px"
        pt="5px"
        pb="2px"
        lineHeight="16px"
      >
        Build:&nbsp;&nbsp;&nbsp;{buildId}&nbsp;&nbsp;&nbsp;{buildDate}
      </Box>
      <Box
        bgcolor="black"
        color="white"
        fontWeight="bold"
        component="span"
        px="5px"
        pt="5px"
        pb="2px"
        lineHeight="16px"
      >
        Build Image:&nbsp;&nbsp;&nbsp;{buildImage}
      </Box>
    </Box>
  )
}

export default BuildInfo
