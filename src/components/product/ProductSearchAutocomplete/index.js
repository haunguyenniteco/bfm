/**
 * ProductSearchAutocomplete
 */

import { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import Downshift from 'downshift'
import useList from '@hooks/useList'
import SuggestionHits from './SuggestionHits'
import Autocomplete from '../../common/Autocomplete'
import { Wrapper, SearchIcon, ClearButton } from './elements'

const itemToString = item => {
  if (item) {
    return item.type === 'PHRASE' ? item.searchPhrase : item.name.en
  }
  return ''
}

function ProductSearchAutocomplete({
  className,
  onItemSelect,
  queryPhrase,
  placeholder,
  onOpen,
  onClear,
  isFocusInput,
  getPredictions,
  currencyComponent,
  locale,
  onFocus,
  onBlur,
}) {
  const [searchValue, setSearchValue] = useState(queryPhrase)
  const [predictions, { clear, set }] = useList()

  const handleInputChange = async e => {
    if (!e.target.value || e.target.value.length < 3) {
      return predictions.length && clear()
    }
    try {
      const { data } = await getPredictions(e.target.value)
      set(data.predictions)
    } catch (error) {
      clear()
    }
  }

  const handleItemSelect = selected => {
    if (onClear) {
      onClear()
    }

    onItemSelect(selected)
  }

  const handleInputKeyDown = ({ event, isOpen = false, highlightedIndex, reset, inputValue }) => {
    if (!inputValue) {
      return
    }

    if (onOpen) {
      onOpen(isOpen)
    }

    if (event.key === 'Enter' && highlightedIndex == null) {
      const selectedItem = { searchPhrase: inputValue, type: 'PHRASE' }
      handleItemSelect(selectedItem)
      if (isOpen) {
        reset()
      }
    }
  }

  const handleStateChange = changes => {
    const { keyDownArrowUp, keyDownArrowDown, changeInput } = Downshift.stateChangeTypes
    if (
      Object.prototype.hasOwnProperty.call(changes, 'highlightedIndex') &&
      (changes.type === keyDownArrowUp || changes.type === keyDownArrowDown)
    ) {
      const term = predictions[changes.highlightedIndex]
      setSearchValue(term)
    } else if (changes.type === changeInput) {
      setSearchValue({ searchPhrase: changes.inputValue, type: 'PHRASE' })
    }
  }

  const handleSearchReset = () => {
    setSearchValue({ searchPhrase: '', type: 'PHRASE' })
    clear()
    if (onClear) {
      onClear()
    }
  }

  const handlePredictionSelect = (selectedItem, downshift) => {
    if (!selectedItem) return
    if (selectedItem.type === 'CATEGORY' || selectedItem.type === 'PRODUCT') {
      downshift.clearSelection()
    }
    handleItemSelect(selectedItem)
  }

  useEffect(() => {
    if (queryPhrase.searchPhrase === '') {
      setSearchValue({ searchPhrase: '', type: 'PHRASE' })
    }
  }, [queryPhrase.searchPhrase])

  return (
    <Wrapper bg="white" className={className}>
      <Autocomplete
        id="autocomplete-search-input"
        icon={SearchIcon}
        fullWidth
        items={predictions}
        selectedItem={searchValue}
        placeholder={placeholder}
        onChange={handleInputChange}
        onSelect={handlePredictionSelect}
        onStateChange={handleStateChange}
        onInputKeyDown={handleInputKeyDown}
        suggestionHits={SuggestionHits}
        currencyComponent={currencyComponent}
        locale={locale}
        itemToString={itemToString}
        iconAppend={ClearButton}
        onIconAppendClick={handleSearchReset}
        isFocusInput={isFocusInput}
        onFocus={onFocus}
        onBlur={onBlur}
      />
    </Wrapper>
  )
}

ProductSearchAutocomplete.defaultProps = {
  placeholder: 'Search...',
  queryPhrase: { searchPhrase: '', type: 'PHRASE' },
  locale: 'en',
}

ProductSearchAutocomplete.propTypes = {
  currencyComponent: PropTypes.func.isRequired,
  getPredictions: PropTypes.func.isRequired,
  onItemSelect: PropTypes.func.isRequired,
  onOpen: PropTypes.func,
  onClear: PropTypes.func,
  placeholder: PropTypes.string,
  queryPhrase: PropTypes.objectOf(PropTypes.any),
  locale: PropTypes.string,
}

export default ProductSearchAutocomplete
