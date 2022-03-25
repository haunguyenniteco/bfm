import { defineMessages } from 'react-intl'

export default defineMessages({
  notAvailableItems: {
    id: 'Basket.notAvailableItems',
    defaultMessage: '{name} is not available',
  },
  notEnoughQuantityItems: {
    id: 'Basket.notEnoughQuantityItems',
    defaultMessage: 'There is {available} {name} in the inventory.',
  },
  addedToBasket: {
    id: 'Basket.addedToBasket',
    defaultMessage: '{quantity} {quantity, plural, one {item is} other {items are}} added to the basket',
  },
  itemAdded: {
    id: 'Basket.itemAdded',
    defaultMessage: 'Item added.',
  },
  addedToBasketMore: {
    id: 'Basket.addedToBasketMore',
    defaultMessage: 'Add {itemsToAdd} {itemsToAdd, plural, one {bottle} other {bottles}} or more to checkout.',
  },

  reserved: {
    id: 'Basket.reserved',
    defaultMessage: 'Items will be reserved for 30 minutes.',
  },
})
