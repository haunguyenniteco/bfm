import getProductTrackingData from './utils/getProductTrackingData'

const ProductViewEvent = data => {
  let trackingData = {}
  const {
    pageProps: {
      product,
      router: { asPath },
    },
    page,
  } = data

  const productDetail = {
    brand: product.details ? product.details.brandName : '',
    categories: product.details ? product.details.categories : product.categories,
    id: product.id,
    extId: product.extId,
    gtin: product.gtin,
    name: product.name,
    details: {
      media: product.details ? product.details.media : product.media,
    },
    prices: product.prices,
  }

  if (product) {
    trackingData = {
      event: data.event,
      eventAction: 'Detail View',
      eventCategory: 'Ecommerce',
      eventLabel: product.gtin,
      eventValue: product.prices.clicksUnitPrice,
      eventPath: asPath,
      ecommerce: {
        actionField: { list: page },
        detail: {
          products: [getProductTrackingData({ ...productDetail, position: 1, list: page, path: asPath })],
        },
      },
    }
  }

  return trackingData
}

export default ProductViewEvent
