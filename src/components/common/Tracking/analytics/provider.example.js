import getAnalyticsData from './getAnalyticsData'

const exampleProvider = {
  name: 'example',

  /**
   * Dispatch tracking data to segment
   * @name dispatch
   * @ignore
   * @param {Object} data Arguments supplied by tracking library
   * @param {String} data.action String value used as the first param to analytics.track()
   * @returns {undefined} No Return
   */
  dispatch(data, debug) {
    // Example that works with google tag manager
    const analyticsData = getAnalyticsData(data) // TODO transform me please
    if (debug) console.log('Example Tracking :: ', analyticsData)
    if (window && window.dataLayer) window.dataLayer.push(data)
  },

  init() {
    // Todo some initialization
    // Example that works with google tag manager
    window.dataLayer = window.dataLayer || []
  },

  /**
   * Render string script
   * @returns {String} String script to be included in the document head
   */
  // eslint-disable-next-line no-unused-vars
  getScript({ key }) {
    // Return a javascript string that will be included in the HEAD of the rendered HTML document
    return 'STRING_SCRIPT'
  },
}

export default exampleProvider
