import Skeleton from '@mui/material/Skeleton'
import Box from '@mui/material/Box'
import { FormattedMessage } from 'react-intl'
import { AccountLayout } from '@components/common'
import Typography from '@components/ui/Typography/index'
import { PageContent } from '../elements'
import messages from '../messages'

const AccountSkeletonloader = () => {
  return (
    <AccountLayout>
      <PageContent>
        <Typography variant="h1">
          <FormattedMessage {...messages.pageTitle} />
        </Typography>
        <Box width="100%" data-testid="loading">
          <Skeleton height="100px" mt="30px" />
          <Skeleton height="50px" mt="30px" />
          <Skeleton height="50px" mt="30px" />
        </Box>
      </PageContent>
    </AccountLayout>
  )
}

export default AccountSkeletonloader
