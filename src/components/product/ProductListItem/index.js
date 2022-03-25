import shortid from 'shortid'
import Typography from '@mui/material/Typography'
import constants from './constants'
import { preventAccidentalDoubleClick, getDefaultImageUrl } from './utils'
import useMedia from './useMedia'
import { ProductCard } from './elements'

const Measurements = ({ netContent }) => {
  if (netContent?.length) {
    const [{ value, measurementUnitCode }] = netContent
    return (
      <Typography fontSize={1} lineHeight={1.25} fontWeight="normal" color="G1">
        {value}
        {constants[measurementUnitCode]}
      </Typography>
    )
  }
  return null
}

const Units = ({ comparisonPrices }) => {
  if (comparisonPrices && comparisonPrices.length > 0) {
    return (
      <>
        {comparisonPrices.map(comparisonItem => (
          <Typography
            fontSize={1}
            lineHeight={1}
            fontWeight="normal"
            color="G1"
            textAlign="right"
            mb="3px"
            key={shortid.generate()}
          >
            {comparisonItem.comparisonPriceText}
          </Typography>
        ))}
      </>
    )
  }

  return null
}

export const truncate = (text, limit) => {
  // Sanity check for missing data
  if (typeof text === 'undefined' || typeof limit === 'undefined') return '...'
  if (text.length > limit) {
    return `${text.slice(0, limit)}...`
  }
  return text
}

const ProductGridItem = ({
  product,
  locale,
  onItemClick,
  mediaWidth,
  // mediaThumbnailWidth,
  mediaFit,
  priceWithoutVatLabel = 'Without VAT',
  vatPercentageLabel = 'VAT %',
}) => {
  const isWide = useMedia('(min-width: 48em)')
  const titleCharLength = isWide ? 85 : 68
  const tradeCharLength = isWide ? 120 : 113

  const handleOnClick = preventAccidentalDoubleClick((event, item) => {
    onItemClick(event, item)
  })

  const {
    name,
    prices,
    netContent = [],
    media,
    tradeItemMarketingMessage,
    priceComparisonMeasurements = [],
    promotions,
  } = product
  const getMainImage = getDefaultImageUrl(media, mediaWidth)
  const getThumbnailImage = getDefaultImageUrl()
  return <ProductCard product={product} locale={locale} onClick={handleOnClick} />
}

ProductGridItem.defaultProps = {
  mediaFit: 'contain',
}

ProductGridItem.propTypes = {}

export default ProductGridItem
