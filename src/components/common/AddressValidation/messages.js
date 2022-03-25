/*
 * AddressValidation Messages
 *
 * This contains all the text for the AddressValidation component.
 */
import { defineMessages } from 'react-intl'

export default defineMessages({
  pageTitle: {
    id: 'AddressValidation.pageTitle',
    defaultMessage: 'Address Validation',
  },

  headerTitle: {
    id: 'AddressValidation.headerTitle',
    defaultMessage: 'Stores and available services for your address',
  },
  enterAddress: {
    id: 'AddressValidation.enterAddress',
    defaultMessage: 'Enter your address to browse products available in your area',
  },
  placeholder: {
    id: 'AddressValidation.placeholder',
    defaultMessage: 'Street address',
  },
  warning: {
    id: 'AddressValidation.warning',
    defaultMessage: 'We can’t find that address.',
  },
  error: {
    id: 'AddressValidation.error',
    defaultMessage: 'Something went wrong, please try again',
  },
  clearSearch: {
    id: 'AddressSearch.clearSearch',
    defaultMessage: 'Clear search',
  },
})
