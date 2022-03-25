export default function getBasketTrackingData(data) {
  const { products } = data
  return products.map(product => {
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
      price: product.clicksUnitPrice,
      gtin: product.gtin,
      ext_id: product.extId,
      quantity: product.quantity || 1,
      image_url: image(),
      coupon: product.coupon || '',
      category,
      ...(product.path ? { url: product.path } : {}),
      ...(product.position ? { position: product.position } : {}),
      ...(product.list ? { list: product.list } : {}),
    }
  })
}
