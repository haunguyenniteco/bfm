import getAnalyticsData from './getAnalyticsData'

const ensightenProvider = {
  name: 'ensighten',

  /**
   * Dispatch tracking data to segment
   * @name dispatch
   * @ignore
   * @param {Object} data Arguments supplied by tracking library
   * @param {String} data.action String value used as the first param to analytics.track()
   * @returns {undefined} No Return
   */
  dispatch(data, debug) {
    // Workaround for not being able to use object rest spread
    const analyticsData = getAnalyticsData(data)
    if (debug) console.log('Ensighten Tracking :: ', analyticsData)
    if (window && window.dataLayer) {
      window.dataLayer.push(analyticsData)
    }
  },

  init() {
    window.dataLayer = window.dataLayer || []
  },
}

export default ensightenProvider
