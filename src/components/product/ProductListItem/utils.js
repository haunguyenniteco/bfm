import { debounce } from 'lodash'

// For most OS, it seems 600ms is the slowest you can set to be a "double click"
const DEBOUNCE_MS = 600

/**
 * Wraps a function to prevent accidental double-clicks from
 * executing it too often.
 * @param {Function} func - The onClick function to return, debounced
 */
export function preventAccidentalDoubleClick(func) {
  return debounce(func, DEBOUNCE_MS, {
    leading: true,
    trailing: false,
  })
}

export const defaultImage = '/images/default-product.png'

export const getDefaultImageUrl = (mediaArray = [], mediaWidth = 512) => {
  const media = mediaArray.find(item => item.mediaDimensionWidth === mediaWidth)
  if (media) return media.mediaStorageKey
  return defaultImage
}
