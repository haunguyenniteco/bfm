import { defineMessages } from 'react-intl'

export default defineMessages({
  pageTitle: {
    id: 'Order.pageTitle',
    defaultMessage: 'My orders',
  },
  orderTitle: {
    id: 'Order.orderTitle',
    defaultMessage: 'Order #',
  },

  orderAmendmentTitle: {
    id: 'Order.orderAmendmentTitle',
    defaultMessage: 'Amending Order #',
  },

  contactFormTitle: {
    id: 'Order.contactFormTitle',
    defaultMessage: 'Contact',
  },
  noOrders: {
    id: 'Order.noOrders',
    defaultMessage: 'No orders found',
  },
  pastOrders: {
    id: 'Order.pastOrders',
    defaultMessage: 'Past orders',
  },

  delivery: {
    id: 'Order.delivery',
    defaultMessage: 'Delivery',
  },

  collection: {
    id: 'Order.collection',
    defaultMessage: 'Collection',
  },

  deliveryAddress: {
    id: 'Order.deliveryAddress',
    defaultMessage: 'Delivery Address:',
  },
  pickupAddress: {
    id: 'Order.pickupAddress',
    defaultMessage: 'Collection From:',
  },
  deliveryTime: {
    id: 'Order.deliveryTime',
    defaultMessage: 'Delivery Time:',
  },
  pickupTime: {
    id: 'Order.pickupTime',
    defaultMessage: 'Collection Time:',
  },
  today: {
    id: 'Order.today',
    defaultMessage: 'Today',
  },
  email: {
    id: 'Order.email',
    defaultMessage: 'Email address *',
  },
  validEmail: {
    id: 'Order.validEmail',
    defaultMessage: 'Valid Email Address Required',
  },
  emailRequired: {
    id: 'Order.emailRequired',
    defaultMessage: 'Email Required',
  },
  phone: {
    id: 'Order.phone',
    defaultMessage: 'Mobile phone number *',
  },

  phoneMin10Digits: {
    id: 'Order.phoneMin10Digits',
    defaultMessage: 'This must be at least 10 digits.',
  },

  phoneMax13Digits: {
    id: 'Order.phoneMax13Digits',
    defaultMessage: 'This must be no more than 13 digits',
  },

  onlyDigits: {
    id: 'Order.onlyDigits',
    defaultMessage: 'Only digits here',
  },

  phoneRequired: {
    id: 'Order.phoneRequired',
    defaultMessage: 'Please enter your phone number',
  },
  messageToDriver: {
    id: 'Order.messageToDriver',
    defaultMessage: 'Message to the driver',
  },
  messageToPicker: {
    id: 'Order.messageToPicker',
    defaultMessage: 'Message to the picker',
  },

  orderSummary: {
    id: 'Order.orderSummary',
    defaultMessage: 'Products',
  },

  amendOrder: {
    id: 'Order.amendOrder',
    defaultMessage: 'Amend order',
  },

  confirmOrder: {
    id: 'Order.confirmOrder',
    defaultMessage: 'Confirm changes',
  },

  cancelOrder: {
    id: 'Order.cancelOrder',
    defaultMessage: 'Cancel order',
  },
  cancelAction: {
    id: 'Order.cancelAction',
    defaultMessage: 'Cancel',
  },

  exitAction: {
    id: 'Order.exitAction',
    defaultMessage: 'Exit',
  },

  backAction: {
    id: 'Order.backAction',
    defaultMessage: 'Back to orders',
  },

  confirmAction: {
    id: 'Order.confirmAction',
    defaultMessage: 'Confirm',
  },

  notFound: {
    id: 'Order.notFound',
    defaultMessage: 'Order #{orderId} not found',
  },

  success_cancel: {
    id: 'Order.success_cancel',
    defaultMessage: ` Order was cancelled successfully`,
  },
  success_amend: {
    id: 'Order.success_amend',
    defaultMessage: ` Order was amended successfully`,
  },
  failure: {
    id: 'Order.failure',
    defaultMessage: ` Something went wrong, please try again later`,
  },
  orderStatus: {
    id: 'Order.orderStatus',
    defaultMessage: `Order status:`,
  },
  orderType: {
    id: 'Order.orderType',
    defaultMessage: `Order type:`,
  },
  errorMessage: {
    id: 'Order.errorMessage',
    defaultMessage: 'Something went wrong ',
  },
  successMessage: {
    id: 'Order.successMessage',
    defaultMessage: 'Item removed from order',
  },

  reOrderTitle: {
    id: 'Order.reOrderTitle',
    defaultMessage: 'Re-order',
  },
  reOrderMessage: {
    id: 'Order.reOrderMessage',
    defaultMessage: `Moving all the items to the basket will remove items currently in the basket. 
    The products that are not available will not be added to the re-order.
    `,
  },
  reOrderAction: {
    id: 'Order.reOrderAction',
    defaultMessage: 'Got it, proceed',
  },
  reOrderNotification: {
    id: 'Order.reOrderNotification',
    defaultMessage: 'Order has been re-added to your basket',
  },
})
