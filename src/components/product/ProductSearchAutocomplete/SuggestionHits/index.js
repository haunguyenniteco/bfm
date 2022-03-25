import PropTypes from 'prop-types'
import highlightMatch from 'autosuggest-highlight/match'
import highlightParse from 'autosuggest-highlight/parse'
import Box from '@mui/material/Box'
import NextImage from 'next/image'
import { Wrapper, Item, Part, PriceInfo, ImageContainer, ItemDescription, SearchIcon } from './elements'

const imagePlaceholder = '/images/default-product-thumbnail.png'
const categoryPlaceholder = '/images/category_placeholder.png'

export const getImageUrl = image => {
  if (image) {
    const { mediaStorageKey = imagePlaceholder } = image
    return mediaStorageKey
  }
  return imagePlaceholder
}

const SuggestionHits = ({
  locale,
  currencyComponent: CurrencyPrice,
  highlightedIndex,
  getItemProps,
  suggestions,
  selectedItem,
  searchValue,
  isOpen,
  getMenuProps,
}) =>
  !isOpen || suggestions.length === 0 ? null : (
    <Wrapper bg="white">
      <div {...getMenuProps()}>
        {suggestions.map((hit, index) => {
          const name = hit.type === 'PHRASE' ? hit.searchPhrase : hit.name[locale]
          const matches = highlightMatch(name, searchValue)
          const parts = highlightParse(name, matches)

          const isProduct = hit.type === 'PRODUCT'

          return (
            <Item
              alignItems="center"
              product={isProduct}
              /* eslint-disable react/no-array-index-key */
              key={`${hit.ext_id}-${index}`}
              {...getItemProps({
                item: hit,
                index,
                isActive: highlightedIndex === index,
                isSelected: selectedItem === hit,
              })}
            >
              <ImageContainer product={isProduct}>
                {hit.type === 'PHRASE' && <SearchIcon />}
                {hit.type === 'PRODUCT' && (
                  <NextImage
                    className="product-image"
                    src={getImageUrl(hit.image)}
                    alt={name}
                    width={70}
                    height={70}
                    layout="intrinsic"
                    placeholder="blur"
                    blurDataURL={imagePlaceholder}
                  />
                )}
                {hit.type === 'CATEGORY' && (
                  <Box component="img" className="category-image" altText={name} src={categoryPlaceholder} />
                )}
              </ImageContainer>
              <ItemDescription>
                {parts.map((part, partIndex) => (
                  // eslint-disable-next-line react/no-array-index-key
                  <Part key={partIndex} highlight={part.highlight}>
                    {part.text}
                  </Part>
                ))}
                {hit.type === 'CATEGORY' && hit.parentName !== null && (
                  <span className="category"> in {hit.parentName[locale]}</span>
                )}
              </ItemDescription>
              {hit.type === 'PRODUCT' && (
                <PriceInfo>
                  <CurrencyPrice value={hit.price.clicksUnitPrice} />
                </PriceInfo>
              )}
            </Item>
          )
        })}
      </div>
    </Wrapper>
  )

SuggestionHits.propTypes = {
  highlightedIndex: PropTypes.number,
  getItemProps: PropTypes.func,
  getMenuProps: PropTypes.func,
  suggestions: PropTypes.arrayOf(PropTypes.object),
  searchValue: PropTypes.string,
  isOpen: PropTypes.bool,
}

export default SuggestionHits
