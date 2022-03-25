import localforage from 'localforage'
import { parseBasketItem } from './helpers'

export const CUSTOMER_CACHE_KEY = 'customer-basket'
export const GUEST_CACHE_KEY = 'guest-basket'

export async function retrieveBasketFromCache(cacheKey) {
  try {
    const basket = await localforage.getItem(cacheKey)

    if (basket) {
      const parsedBasket = JSON.parse(basket)
      parsedBasket.items.forEach(parseBasketItem)
      return parsedBasket
    }
  } catch (error) {
    console.warn('The basket was not retrieved', error)
  }
  return null
}

export async function persistBasketToCache(
  { id, amendmentId, items, shipping, orchestration, metadata, coupon, voucher, discount, order },
  cacheKey,
) {
  try {
    await localforage.setItem(
      cacheKey,
      JSON.stringify({ id, amendmentId, items, shipping, orchestration, metadata, coupon, voucher, discount, order }),
    )
  } catch (error) {
    console.warn('The basket was not persisted\n', error)
  }
}

export async function removeBasketFromCache(cacheKey) {
  try {
    await localforage.removeItem(cacheKey)
  } catch (error) {
    console.warn('The basket was not removed\n', error)
  }
}
