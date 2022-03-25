import { FormattedMessage } from 'react-intl'
import { toast } from 'react-toastify'
import { Query, useValidateInventory, useClearBasket } from '@graphql-sdk'
import { useApolloClient } from '@apollo/client'
import messages from './messages'

function InjectBasket({ children }) {
  const client = useApolloClient()
  const clearBasketFn = useClearBasket()
  const validateInventoryFn = useValidateInventory()

  const initializeBasket = async input => {
    const { data = {} } = await client.query({
      query: Query.intializeBasket,
      variables: { input },
      fetchPolicy: 'network-only',
      ssr: false,
    })

    return data.initializeBasket
  }

  const clearBasket = async input => {
    const { data = {} } = await clearBasketFn({ input })
    return data.clearBasket
  }

  const validateBasket = async ({ changedItem, ...input }) => {
    const { data: { validateInventory = {} } = {} } = await validateInventoryFn({ input })
    const { items, notEnoughQuantityItems, notAvailableItems } = validateInventory

    if (notAvailableItems?.length > 0) {
      notAvailableItems.forEach(({ name: { en: name } }) =>
        toast.warn(<FormattedMessage {...messages.notAvailableItems} values={{ name }} />, { toastId: 1 }),
      )
    }

    if (notEnoughQuantityItems?.length > 0) {
      notEnoughQuantityItems.forEach(({ name: { en: name }, available }) =>
        toast.warn(<FormattedMessage {...messages.notEnoughQuantityItems} values={{ name, available }} />, {
          toastId: 2,
        }),
      )
    }

    if (!notEnoughQuantityItems?.length && !notAvailableItems?.length && changedItem?.diffQuantity > 0) {
      toast(<FormattedMessage {...messages.addedToBasket} values={{ quantity: changedItem.diffQuantity }} />, {
        toastId: 4,
      })
    }

    return items
  }

  return children({ initializeBasket, validateBasket, clearBasket })
}

InjectBasket.propTypes = {}

export default InjectBasket
