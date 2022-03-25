import NextImage from 'next/image'
import { defaultImage } from '@components/product/ProductListItem/utils'

/**
 * If there is an item with minimum width we use it. If not, instead we use biggest available.
 */
const loader =
  media =>
  ({ width }) => {
    if (media.length === 0) {
      return defaultImage
    }
    const sortedMedia = [...media].sort((a, b) => b.mediaDimensionWidth - a.mediaDimensionWidth)
    const biggestItem = media[0]
    const filtered = sortedMedia.filter(mediaItem => mediaItem.mediaDimensionWidth >= width)
    const smallestMatch = filtered[filtered.length - 1]
    const matchedItem = smallestMatch || biggestItem
    return matchedItem.mediaStorageKey
  }
/**
 * As src is required we use a placeholder, instead using media property to establish correct media item.
 */
const Image = ({ media, ...props }) => <NextImage src="#" layout="intrinsic" loader={loader(media)} {...props} />

export default Image
