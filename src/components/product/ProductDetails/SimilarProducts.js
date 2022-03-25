import Box from '@mui/material/Box'
import Typography from '@components/ui/Typography/index'
import { FormattedMessage } from 'react-intl'
import { PageContainer, SimilarProductBox } from './elements'
import messages from './messages'
import SimilarProductGrid from './SimilarProductGrid'

const SimilarProducts = ({ products }) => {
  return (
    <SimilarProductBox>
      <PageContainer>
        <Box mb="35px">
          <Typography variant="h2" mb="35px">
            <FormattedMessage {...messages.similarProducts} />
          </Typography>
        </Box>
        <SimilarProductGrid products={products} />
      </PageContainer>
    </SimilarProductBox>
  )
}

export default SimilarProducts
