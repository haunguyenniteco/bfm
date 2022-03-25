/*
 * StoreSelection Messages
 *
 * This contains all the text for the StoreSelection component.
 */
import { defineMessages } from 'react-intl'

export default defineMessages({
  pageTitle: {
    id: 'StoreSelection.pageTitle',
    defaultMessage: 'Choose collection location ',
  },

  headerTitle: {
    id: 'StoreSelection.headerTitle',
    defaultMessage: 'Choose collection location',
  },

  delivery: {
    id: 'StoreSelection.delivery',
    defaultMessage: 'Delivery',
  },

  clickAndCollect: {
    id: 'StoreSelection.clickAndCollect',
    defaultMessage: 'Click & Collect',
  },
  noService: {
    id: 'StoreSelection.noService',
    defaultMessage: 'Service not available',
  },
  noServiceDetails: {
    id: 'StoreSelection.noServiceDetails',
    defaultMessage:
      'We’re sorry, but your address is not yet in the service area. You can see current overview of our delivery areas and pickup locations ',
  },
  noServiceAction: {
    id: 'StoreSelection.noServiceAction',
    defaultMessage: 'Check availability for other location',
  },
  ageConfirmation: {
    id: 'StoreSelection.ageConfirmation',
    defaultMessage: 'You have chosen a liquor store',
  },
  ageConfirmationDetails: {
    id: 'StoreSelection.ageConfirmationDetails',
    defaultMessage:
      'No alcohol may be sold to persons under the age of 18. Please indicate that you are over 18 to enter.',
  },
  ageConfirmed: {
    id: 'StoreSelection.ageConfirmed',
    defaultMessage: 'Yes, I am over 18 years old.',
  },
  continue: {
    id: 'StoreSelection.continue',
    defaultMessage: 'Continue',
  },
  continueToSlot: {
    id: 'StoreSelection.continueToSlot',
    defaultMessage: 'Show available collection slots',
  },
})
