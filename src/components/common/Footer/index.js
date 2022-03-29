import { FormattedMessage } from 'react-intl'
import { Typography } from '@components/ui'
import useArea from '@hooks/useArea'
import getConfig from 'next/config'
import Box from '@mui/material/Box'
import Container from '@mui/material/Container'
import messages from './messages'
import BuildInfo from './BuildInfo'

const { publicRuntimeConfig = {} } = getConfig() || {}
const year = new Date().getFullYear()

function Footer() {
  const { brand } = publicRuntimeConfig
  const { footer: footerFromCMS } = useArea('footer')

  return (
    <Box component="footer" role="contentinfo">
      <Container>{footerFromCMS}</Container>

      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        sx={{
          py: 3,
          px: 2,
          backgroundColor: theme => theme.palette.grey[100],
          minHeight: '30vh',
        }}
      >
        <Typography gutterBottom>
          &copy;&nbsp;
          <FormattedMessage {...messages.copyright} values={{ year, brand }} />
        </Typography>
        <BuildInfo />
      </Box>
    </Box>
  )
}

Footer.propTypes = {}

export default Footer
