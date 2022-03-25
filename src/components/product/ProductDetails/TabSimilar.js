import PropTypes from 'prop-types'
import SimilarProductGrid from './SimilarProductGrid'

const TabSimilar = ({ masterProductId }) => <SimilarProductGrid masterProductId={masterProductId} />

TabSimilar.propTypes = {
  masterProductId: PropTypes.string.isRequired,
}

export default TabSimilar
