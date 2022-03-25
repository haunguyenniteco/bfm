export const defaultImage = '/images/default-product-thumbnail.png'

export const getDefaultImageUrl = (mediaArray = [], mediaWidth = 512) => {
  const media = mediaArray.find(item => item.mediaDimensionWidth === mediaWidth)
  if (media) return media.mediaStorageKey
  return defaultImage
}

export const sortByMediaSequence = (mediaArray = []) => {
  return mediaArray.sort((a, b) => a.mediaSequence - b.mediaSequence)
}
