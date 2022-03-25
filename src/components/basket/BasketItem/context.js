import { memo, useContext, useEffect, useRef, createContext } from 'react'
import { createId } from '@lib/helpers'
import useGetSetState from '@hooks/useGetSetState'
import useList from '@hooks/useList'
import useSlotReservation from '@hooks/useSlotReservation'
import {
  persistBasketToCache,
  retrieveBasketFromCache,
  removeBasketFromCache,
  GUEST_CACHE_KEY,
  CUSTOMER_CACHE_KEY,
} from './cache'
import { animationSpeedMs, getSupportedOptionsFromProps, parseBasketItem, errorHandling } from './helpers'

let diffQuantity = 0

const initialState = {
  id: null,
  amendmentId: null,
  requireAgeConfirmation: false,
  ready: false,
  items: [],
  options: {},
  validating: false,
  validatingNewCoupon: false,
  coupon: null,
  discount: null,
  voucher: null,
  orchestration: null,
  shipping: {
    customer: null,
    address: null,
    notes: null,
    delivery: null,
    charge: 0,
  },
  metadata: {},
  order: null,
}

export const BasketContext = createContext()

let validateBasketDelayedTimeout = null
export const BasketProvider = memo(({ children, isSignedIn, guestUserId, sessionUser, ...props }) => {
  const STORE_MASTER_ID = props.storeInfo?.masterId
  const mounted = useRef(false)
  const [getState, setState] = useGetSetState(initialState)
  const [onReadyQueue, { clear: clearQueue, push: pushToQueue }] = useList()
  const [itemAnimationTimeouts, { push: pushItemAnimation, remove: removeItemAnimation }] = useList()

  const { userActivityObserved } = useSlotReservation()

  const onReady = fn => {
    if (getState().ready) {
      fn()
      userActivityObserved()
    } else {
      pushToQueue(fn)
    }
  }

  const setValidating = validating => onReady(() => setState({ validating }))

  const setValidatingNewCoupon = validatingNewCoupon => onReady(() => setState({ validatingNewCoupon }))

  const setCoupon = coupon => onReady(() => setState({ coupon }))

  const setItems = items => onReady(() => setState({ items }))

  const setAmendmentId = amendmentId => onReady(() => setState({ amendmentId }))

  const setRequireAgeConfirmation = requireAgeConfirmation => onReady(() => setState({ requireAgeConfirmation }))

  // const setDiscountAfterValidation = discount => onReady(() => setState({ discount }, () => {}))

  const validateBasketDelayed = ({ id: itemId, quantity }) => {
    diffQuantity += quantity
    const { alwaysValidate } = getState().options

    if (!isSignedIn && !alwaysValidate) {
      return
    }

    setValidating(true)
    const collectedStateUpdates = {}

    clearTimeout(validateBasketDelayedTimeout)
    validateBasketDelayedTimeout = setTimeout(async () => {
      const { items, options, id } = getState()

      if (options.onValidate) {
        const validatedItems = await options.onValidate({
          changedItem: { id: itemId, diffQuantity },
          id,
          items,
          alwaysValidate,
          storeId: STORE_MASTER_ID,
        })
        const parsedItems = validatedItems.map(parseBasketItem)
        Object.assign(collectedStateUpdates, { items: parsedItems })
      } else {
        console.warn('no validation function was provided to the basket')
      }
      setState({ ...collectedStateUpdates, validating: false })
      diffQuantity = 0
    }, 250)
  }

  const initializeBasket = async () => {
    // Temporary basket id is needed to call inventory service.
    // If customer has saved shopping list, this will be replaced by external shopping list id
    const extraStateProps = {
      options: {
        ...getSupportedOptionsFromProps(props),
      },
    }

    // Get guest basket
    const basket = await retrieveBasketFromCache(isSignedIn ? CUSTOMER_CACHE_KEY : GUEST_CACHE_KEY)
    const id = basket?.id || createId()
    setState({ id, ...basket, ...extraStateProps })

    const collectedStateUpdates = {}
    if (extraStateProps.options.onInit) {
      const { items } = getState()

      const initialResult = await extraStateProps.options
        .onInit({
          id,
          items,
          alwaysValidate: extraStateProps.options.alwaysValidate,
          storeId: STORE_MASTER_ID,
        })
        .catch(errorHandling)

      if (isSignedIn) {
        removeBasketFromCache(GUEST_CACHE_KEY)
      } else {
        // Remove the customer's cached basket
        removeBasketFromCache(CUSTOMER_CACHE_KEY)
      }

      if (initialResult?.items) {
        // check that items is undefined
        const parsedItems = initialResult.items.map(parseBasketItem)
        Object.assign(collectedStateUpdates, {
          id: initialResult.id,
          items: parsedItems,
        })
      }
    }
    setState({ ...collectedStateUpdates, ready: true })
    onReadyQueue.forEach(fn => fn())
    clearQueue()
  }
  useEffect(() => {
    mounted.current = true
    return () => {
      mounted.current = false
    }
  }, [])

  useEffect(() => {
    if (!sessionUser.loading) initializeBasket()
  }, [sessionUser.loading])

  useEffect(() => {
    const cacheKey = isSignedIn ? CUSTOMER_CACHE_KEY : GUEST_CACHE_KEY
    if (getState().ready) persistBasketToCache(getState(), cacheKey)
  })

  const calculateExtraBasketState = () => {
    const { items, discount, options, shipping } = getState()
    const { freeShippingMinimumPurchaseAmount = -1, deliveryTypeToApplyFreeShipping } = options

    const totalQuantity = items?.reduce((acc, i) => acc + i.quantity, 0)
    const totalPrice = items?.reduce((acc, product) => {
      const { price } = product.externalData
      const p = product.quantity * price
      return acc + p
    }, 0)

    const totalVatAmount = items?.reduce((acc, i) => {
      const p = i.quantity * (i.vat || 0)
      return acc + p
    }, 0)

    const totalPriceMinusDiscount = totalPrice - Math.abs(discount || 0)

    // Determine shipping related variables
    let freeShipping = false
    let remainingUntilFreeShippingApplies = 0
    if (freeShippingMinimumPurchaseAmount && freeShippingMinimumPurchaseAmount > 0) {
      remainingUntilFreeShippingApplies = freeShippingMinimumPurchaseAmount - totalPriceMinusDiscount
      if (remainingUntilFreeShippingApplies <= 0) {
        remainingUntilFreeShippingApplies = 0
        freeShipping = true
      }
    }

    const selectedDeliveryType = shipping?.delivery?.type || ''
    const shippingDeliveryCharge = shipping?.delivery?.slot?.deliveryPrice || 0

    // TODO: If discount !== null, free shipping!
    const deliveryCharge =
      freeShipping && selectedDeliveryType === deliveryTypeToApplyFreeShipping ? 0 : shippingDeliveryCharge

    let totalToPay = totalPriceMinusDiscount
    if (!freeShipping && deliveryCharge) {
      totalToPay += deliveryCharge
    }

    return {
      totalPrice,
      totalPriceMinusDiscount,
      totalVatAmount,
      totalToPay,
      deliveryCharge,
      totalQuantity,
      freeShipping,
      remainingUntilFreeShippingApplies,
      items,
    }
  }

  const setDiscount = (discount, doValidateBasket = true) =>
    onReady(() =>
      setState({ discount }, () => {
        if (doValidateBasket) {
          validateBasketDelayed()
        }
      }),
    )

  const findItemIndex = item => getState().items.findIndex(i => i.basketItemId === item.gtin)

  const findItemByBasketItemId = id => getState().items.find(i => i.basketItemId === id)

  const changeItemQuantity = ({ item, num, quantity }) => {
    const { items } = getState()
    const index = findItemIndex(item)
    const itemInBasket = items[index]

    if (itemInBasket) {
      const itemInBasketOldQuantity = itemInBasket.quantity

      if (typeof quantity === 'number') {
        itemInBasket.quantity = quantity
      } else if (typeof num === 'number') {
        itemInBasket.quantity += num
      }

      if (itemInBasket.quantity === 0) {
        items.splice(index, 1)
        setItems([...items])

        validateBasketDelayed({ id: item.id, quantity: num })
      } else {
        const parsedItem = parseBasketItem(itemInBasket)
        items[index] = parsedItem
        setState({
          items,
        })

        validateBasketDelayed({ id: item.id, quantity: num })
      }

      const quantityChange = itemInBasket.quantity - itemInBasketOldQuantity
      if (quantityChange > 0) {
        if (getState().options.onAddToBasket) {
          getState().options.onAddToBasket([
            {
              ...item,
              quantity: quantityChange,
            },
          ])
        }
      } else if (quantityChange < 0) {
        if (getState().options.onRemoveFromBasket) {
          getState().options.onRemoveFromBasket([
            {
              ...item,
              quantity: Math.abs(quantityChange),
            },
          ])
        }
      }
      return true
    }
    return false
  }

  const quantityById = id => {
    const item = findItemByBasketItemId(id)
    return item ? item.quantity : 0
  }

  const incrementQuantityItem = item =>
    onReady(() => {
      changeItemQuantity({ item, num: 1 })
    })

  const decrementQuantityItem = item =>
    onReady(() => {
      changeItemQuantity({ item, num: -1 })
    })

  const addItem = (itemRaw, quantity = 1) =>
    onReady(() => {
      const item = parseBasketItem(itemRaw)

      // Try to increment. If not, add new product to basket
      if (!changeItemQuantity({ item, num: quantity })) {
        const { items } = getState()
        setItems([...items, { ...item, quantity }])

        validateBasketDelayed({ id: itemRaw.id, quantity })

        if (getState().options.onAddToBasket) {
          getState().options.onAddToBasket([{ ...item, quantity }])
        }
      }
    })

  const animateItem = animItem => {
    const parsedItem = parseBasketItem(animItem)

    return new Promise(async mainResolve => {
      const updateStateItem = (stateItem, animate) =>
        new Promise(resolve => {
          setState({
            items: getState().items.map(item => {
              if (item.basketItemId === stateItem.basketItemId) {
                return {
                  ...item,
                  animate,
                }
              }
              return item
            }),
          })
          resolve()
        })

      // Remove queued animation
      const removeQueuedAnimation = async () => {
        const index = itemAnimationTimeouts.findIndex(i => i.item.basketItemId === parsedItem.basketItemId)
        if (index >= 0) {
          clearTimeout(itemAnimationTimeouts[index].timeout)
          removeItemAnimation(index)
          await updateStateItem(parsedItem, false)
        }
      }

      await removeQueuedAnimation(parsedItem)

      await updateStateItem(parsedItem, true)

      pushItemAnimation({
        item: parsedItem,
        timeout: setTimeout(async () => {
          await removeQueuedAnimation(parsedItem)
          mainResolve()
        }, animationSpeedMs),
      })
    })
  }

  const removeItem = item => onReady(() => changeItemQuantity({ item, quantity: 0 }))

  const setOrchestration = (data, onPriceChange = () => {}) =>
    onReady(() => {
      const { items } = getState()
      const {
        orchestrationId,
        parts: [{ orchestrationId: partOrchestrationId, products }],
        totalPrice,
      } = data

      setState({
        orchestration: {
          orchestrationId,
          partOrchestrationId,
          totalPrice: { ...totalPrice },
          rawData: data,
        },
      })

      const changes = []

      items.forEach((item, index) => {
        const { clicksUnitPrice: unitPrice, totalClicksPrice: rowPrice } = item
        const validatedProduct = products.find(product => product.masterProductId === item.masterProductId)

        if (validatedProduct) {
          const {
            unitPrice: { priceVat: validatedUnitPrice },
            rowPrice: { priceVat: validatedRowPrice },
          } = validatedProduct

          // compare prices
          if (unitPrice !== validatedUnitPrice || rowPrice !== validatedRowPrice) {
            changes.push({
              index,
              validatedUnitPrice,
              validatedRowPrice,
            })
          }
        }
      })

      if (changes.length > 0) {
        changes.forEach(({ index, validatedUnitPrice, validatedRowPrice }) => {
          const itemInBasket = items[index]
          onPriceChange({
            item: itemInBasket,
            oldUnitPrice: itemInBasket.clicksUnitPrice,
            newUnitPrice: validatedUnitPrice,
          })

          itemInBasket.clicksUnitPrice = validatedUnitPrice
          itemInBasket.bricksUnitPrice = validatedUnitPrice
          itemInBasket.unit_price = validatedUnitPrice
          itemInBasket.totalClicksPrice = validatedRowPrice
          itemInBasket.totalBricksPrice = validatedRowPrice

          const parsedItem = parseBasketItem(itemInBasket)

          items[index] = parsedItem
        })

        setState({
          items,
        })
      }
    })

  const setOrder = order =>
    onReady(() => {
      setState({
        order,
      })
    })

  const clear = () =>
    onReady(() => {
      if (getState().options.onRemoveFromBasket) {
        getState().options.onRemoveFromBasket(getState().items)
      }
      if (getState().options.onClearBasket) {
        const { id, options } = getState()
        getState()
          .options.onClearBasket({
            id,
            alwaysValidate: options.alwaysValidate,
            storeId: STORE_MASTER_ID,
          })
          .catch(errorHandling)
      }
      setState({
        items: [],
      })
    })

  const reset = () =>
    onReady(() =>
      setState({
        id: createId(),
        amendmentId: null,
        requireAgeConfirmation: false,
        items: [],
        metadata: null,
        coupon: null,
        discount: null,
        voucher: null,
        orchestration: null,
        shipping: {
          customer: null,
          address: null,
          notes: null,
          delivery: null,
          charge: 0,
        },
        order: null,
      }),
    )

  const clearBasketAndSlots = () =>
    onReady(() => {
      let delivery
      if (getState().shipping?.delivery?.slot) {
        delivery = getState().shipping.delivery
        delete delivery.slot
      }
      setState({
        items: [],
        shipping: {
          ...getState().shipping,
          delivery,
        },
        order: null,
      })
    })

  const setMetadata = metadata => onReady(() => setState({ metadata }))

  const setDelivery = delivery => {
    return onReady(() => {
      setState({
        shipping: {
          ...getState().shipping,
          delivery,
        },
      })
    })
  }

  const setCustomer = customer =>
    onReady(() =>
      setState({
        shipping: {
          ...getState().shipping,
          customer,
        },
      }),
    )

  const setAddress = ({ notes, ...address }) =>
    onReady(() =>
      setState({
        shipping: {
          ...getState().shipping,
          address,
          notes,
        },
      }),
    )

  const setItemNote = (item, note) =>
    onReady(() => {
      const { items } = getState()
      const index = findItemIndex(item)
      const itemInBasket = items[index]

      if (itemInBasket) {
        itemInBasket.note = note

        setState({
          items,
        })
      }
    })

  const setItemSubstitution = (item, allowReplace) =>
    onReady(() => {
      const { items } = getState()
      const index = findItemIndex(item)
      const itemInBasket = items[index]

      if (itemInBasket) {
        itemInBasket.allowReplace = allowReplace
        setState({
          items,
        })
      }
    })

  const removeItemNote = item => {
    onReady(() => {
      const { items } = getState()
      const index = findItemIndex(item)
      const itemInBasket = items[index]

      if (itemInBasket) {
        itemInBasket.note = ''
        setState({
          items,
        })
      }
    })
  }

  const { options, ...state } = getState()
  const calculatedState = calculateExtraBasketState()

  return (
    <BasketContext.Provider
      value={{
        state: {
          ...state,
          ...calculatedState,
        },
        options,
        actions: {
          clear,
          reset,
          clearBasketAndSlots,
          addItem,
          setItems,
          animateItem,
          removeItem,
          incrementQuantityItem,
          decrementQuantityItem,
          quantityById,
          parseBasketItem,
          setOrchestration,
          setValidating,
          setValidatingNewCoupon,
          setCoupon,
          setDiscount,
          findItemByBasketItemId,
          setDelivery,
          setCustomer,
          setAddress,
          setMetadata,
          onReady,
          setItemNote,
          setItemSubstitution,
          removeItemNote,
          setAmendmentId,
          setRequireAgeConfirmation,
          changeItemQuantity,
          setOrder,
        },
      }}
    >
      {children}
    </BasketContext.Provider>
  )
})

export const BasketConsumer = BasketContext.Consumer

export const useBasket = () => {
  const basketContext = useContext(BasketContext)
  if (basketContext == null) throw Error('useBasket: Please provide BasketContext value.')
  return basketContext
}
