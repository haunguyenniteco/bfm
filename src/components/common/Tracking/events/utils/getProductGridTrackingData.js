import getProductTrackingData from './getProductTrackingData'

/**
 * Transform a list of products into data for tracking with the Segment Product List Viewed event
 * @name getProductListTrackingData
 * @param {Object} data Object containing data for tracking a list of products
 * @param {Object} [data.tag] Tag object, used to associate the list with a uniq identifier
 * @param {Array} data.products An array of product documents
 * @returns {Object} Data for tracking
 */
export default function getProductGridTrackingData({ pageProps, page }) {
  const {
    router: { asPath },
    gridProductsList,
  } = pageProps

  let gridProducts = []

  gridProductsList.forEach(gridItem => {
    gridProducts = [...gridProducts, ...gridItem.products]
  })

  const data = {
    eventCategory: 'Ecommerce',
    eventAction: 'Product Grid Impression',
    eventLabel: '',
    eventValue: gridProducts.length,
    eventPath: asPath,
  }

  if (Array.isArray(gridProducts) && gridProducts.length) {
    data.eventLabel = gridProducts.map(i => i.gtin).join('|')
    data.products = gridProducts.map((product, index) =>
      getProductTrackingData({ ...product, position: index + 1, list: page, path: asPath }),
    )
  }

  return data
}
