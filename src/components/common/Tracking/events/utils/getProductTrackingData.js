/**
 * Transform a product object into a partial representation of the Segment product schema.
 * Combine with `getVariantTrackingData(varaint)` to get the full definition
 * @name getProductTrackingData
 * @param {Object} product Project object
 * @returns {Object} Data for tracking
 */
export default function getProductTrackingData(product) {
  const category = product.categories
    .map(c => c.name.en)
    .reverse()
    .join(',')

  const image = () => {
    if (product.details) return product.details.media[1]
    return product.media
      .map(c => c.mediaStorageKey)
      .reverse()
      .join(',')
  }

  return {
    id: product.id,
    name: product.name || product.name.en,
    brand: product.brand,
    price: product.prices?.clicksUnitPrice || product.totalClicksPrice,
    gtin: product.gtin,
    ext_id: product.extId,
    quantity: product.quantity || 1,
    image_url: image(),
    category,
    ...(product.path ? { url: product.path } : {}),
    ...(product.position ? { position: product.position } : {}),
    ...(product.list ? { list: product.list } : {}),
  }
}
