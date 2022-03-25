import Script from 'next/script'
import { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import PlacesAutocomplete, { geocodeByAddress, getLatLng } from 'react-places-autocomplete'
import getConfig from 'next/config'
import cx from 'classnames'
import find from 'lodash/find'
import useAppState from '@hooks/useAppState'
import {
  AddressAutocompleteWrapper,
  CloseButton,
  InputWrapper,
  StyledInput,
  Hint,
  HintText,
  CloseIcon,
  SearchButton,
  SearchIcon,
  NoResultMessage,
  Loading,
} from './elements'
import messages from './messages'

const getAddressObject = addressComponents => {
  const { long_name: route } = find(addressComponents, { types: ['route'] }) || {}
  const { long_name: streetnumber } = find(addressComponents, { types: ['street_number'] }) || {}
  const { long_name: premise } = find(addressComponents, { types: ['premise'] }) || {}
  const { long_name: locality } = find(addressComponents, { types: ['locality'] }) || {}
  const { long_name: city } = find(addressComponents, { types: ['city'] }) || {}
  const { long_name: postcode } = find(addressComponents, { types: ['postal_code'] }) || {}
  const { long_name: postalTown } = find(addressComponents, { types: ['postal_town'] }) || {}
  const { long_name: postalArea } = find(addressComponents, { types: ['locality'] }) || {}
  const { long_name: country } = find(addressComponents, { types: ['country'] }) || {}
  const { long_name: latitude } = find(addressComponents, { types: ['latitude'] }) || {}
  const { long_name: longitude } = find(addressComponents, { types: ['longitude'] }) || {}

  return {
    street: `${streetnumber || ''} ${route}`,
    premise,
    city: city || postalTown,
    locality,
    postcode,
    postal_area: postalArea,
    country,
    latitude,
    longitude,
  }
}

const ALLOWED_TYPES = ['street_address', 'premise']

const isSuggestionWithAllowedType = suggestion => suggestion.types.some(type => ALLOWED_TYPES.includes(type))
const isRouteWithNumber = suggestion => suggestion.types[0] === 'route' && /\d{1,3}/.test(suggestion.description)

const AddressSearch = ({ value = '', onSelect, isProcessingAddress }) => {
  const { intl } = useAppState()
  const [defaultValue, setDefaultValue] = useState(value)
  const [errorMessage, setErrorMessage] = useState(null)

  const { publicRuntimeConfig = {} } = getConfig() || {}
  const { gMapKey, searchCountry } = publicRuntimeConfig

  const allowedCountries = searchCountry.split(',')

  const handleInputChange = address => {
    setDefaultValue(address)
    setErrorMessage(null)
  }

  const handleAddressSelect = async (address, placeId) => {
    // `placeId` is null when user hits Enter key with no suggestion item selected
    if (placeId === null) {
      return
    }
    setDefaultValue(address)
    try {
      const [geodata] = await geocodeByAddress(address)
      const addressObject = getAddressObject(geodata.address_components)
      const { lat, lng: lon } = await getLatLng(geodata)
      onSelect({
        lat,
        lon,
        address: { ...addressObject, latitude: lat, longitude: lon, formatted_address: geodata.formatted_address },
        formattedAddress: geodata.formatted_address,
      })
    } catch (error) {
      setErrorMessage(error)
    }
  }

  const handleCloseClick = () => {
    setDefaultValue('')
    setErrorMessage(null)
  }

  const handleError = (status, clearSuggestions) => {
    console.log('Error from Google Maps API', status) // eslint-disable-line no-console
    setErrorMessage(status)
    clearSuggestions()
  }

  const searchOptions = {
    componentRestrictions: { country: allowedCountries },
    types: ['address'],
    strictBounds: true,
  }

  useEffect(() => {
    setDefaultValue(value)
  }, [value])

  return (
    <>
      <Script
        src={`https://maps.googleapis.com/maps/api/js?key=${gMapKey}&libraries=places&callback=placeCallbackFunc`}
      />

      <PlacesAutocomplete
        onChange={handleInputChange}
        value={defaultValue}
        onSelect={handleAddressSelect}
        onError={handleError}
        shouldFetchSuggestions={defaultValue.length > 2}
        searchOptions={searchOptions}
        googleCallbackName="placeCallbackFunc"
      >
        {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => {
          const filteredSuggestions = suggestions.filter(s => isSuggestionWithAllowedType(s) || isRouteWithNumber(s))
          const showMessage =
            errorMessage === 'ZERO_RESULTS' ||
            errorMessage === 'NOT_FOUND' ||
            (filteredSuggestions.length === 0 && suggestions.length > 0)
          return (
            <AddressAutocompleteWrapper>
              <InputWrapper>
                <SearchButton>
                  <SearchIcon />
                </SearchButton>
                <StyledInput
                  role="search"
                  data-cy="search-input"
                  {...getInputProps({
                    placeholder: intl.formatMessage(messages.placeholder),
                    className: 'search-input',
                    disabled: isProcessingAddress,
                  })}
                />
                {isProcessingAddress && <Loading />}
                {defaultValue.length > 0 && (
                  <CloseButton
                    onClick={handleCloseClick}
                    aria-label={intl.formatMessage(messages.clearSearch)}
                    title={intl.formatMessage(messages.clearSearch)}
                  >
                    <CloseIcon />
                  </CloseButton>
                )}
              </InputWrapper>
              {!loading && filteredSuggestions.length > 0 && (
                <div className="autocomplete-container">
                  {filteredSuggestions.map(suggestion => {
                    const className = cx('suggestion-item', {
                      'suggestion-item--active': suggestion.active,
                    })
                    return (
                      /* eslint-disable react/jsx-key */
                      <Hint isHighlighted={suggestion.active} key={suggestion.id || suggestion.description}>
                        <HintText {...getSuggestionItemProps(suggestion, { className })}>
                          <span className="highlight">{suggestion.formattedSuggestion.mainText}</span>
                          {', '}
                          <span>{suggestion.formattedSuggestion.secondaryText}</span>
                        </HintText>
                      </Hint>
                    )
                    /* eslint-enable react/jsx-key */
                  })}
                </div>
              )}
              {showMessage && <NoResultMessage>{intl.formatMessage(messages.warning)}</NoResultMessage>}
            </AddressAutocompleteWrapper>
          )
        }}
      </PlacesAutocomplete>
    </>
  )
}

AddressSearch.propTypes = {
  onSelect: PropTypes.func.isRequired,
  isProcessingAddress: PropTypes.bool,
}

export default AddressSearch
