import Box from '@mui/material/Box'
import Measurement from './Measurement'

const ComparisonPrices = ({ prices, shortid }) => (
  <Box>
    {prices.comparisonPrices.map(item => (
      <Measurement key={shortid.generate()}>{item.comparisonPriceText}</Measurement>
    ))}
  </Box>
)

export default ComparisonPrices
