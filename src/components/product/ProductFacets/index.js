import { orderBy, snakeCase } from 'lodash'
import useAppState from '@hooks/useAppState'
import messages from './messages'
import { StyledToggleButtonGroup, StyledToggleButton } from './elements'

const attributeFacets = (facets = {}) => {
  const facetAttributes = []
  const keys = Object.keys(facets)

  keys.forEach(key => {
    if (Array.isArray(facets[key])) {
      let facetValues = []
      facetValues = facets[key].map(i => {
        return { type: snakeCase(key), ...i }
      })

      facetAttributes.push(...facetValues)
    }
  })

  return facetAttributes
}

const ProductFacets = props => {
  const { intl } = useAppState()
  const { aggregations, handleFacets, selectedFacets, totalCount } = props

  const facets = attributeFacets(aggregations?.facets).filter(x => {
    return (
      (x !== undefined && x.value !== '' && x.value !== '-' && x.count !== totalCount) ||
      selectedFacets.includes(`${x.type}-${x.value}`)
    )
  })

  if (facets.length === 0) {
    return null
  }

  const sortedFacets = orderBy(facets, ['count', ['value']], ['desc'])

  return (
    <StyledToggleButtonGroup
      size="large"
      fullWidth
      value={selectedFacets}
      onChange={handleFacets}
      aria-label={intl.formatMessage(messages.facets)}
    >
      {sortedFacets.map(facet => {
        return (
          <StyledToggleButton
            key={`${facet.type}-${facet.value}`}
            value={`${facet.type}-${facet.value}`}
            aria-label={facet.value}
          >
            {facet.value}
          </StyledToggleButton>
        )
      })}
    </StyledToggleButtonGroup>
  )
}

export default ProductFacets
