const CheckoutOption = data => {
  const { step, option } = data
  return {
    event: 'checkoutOption',
    ecommerce: {
      checkout_option: {
        actionField: { step, option },
      },
    },
  }
}

export default CheckoutOption
