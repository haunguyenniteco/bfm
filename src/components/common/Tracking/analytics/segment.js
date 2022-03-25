import * as snippet from '@segment/snippet'
import getAnalyticsData from './getAnalyticsData'

const segmentProvider = {
  name: 'segment',

  /**
   * Dispatch tracking data to segment
   * @name dispatch
   * @ignore
   * @param {Object} data Arguments supplied by tracking library
   * @param {String} data.action String value used as the first param to analytics.track()
   * @returns {undefined} No Return
   */
  dispatch(data, debug) {
    const analyticsData = getAnalyticsData(data)
    if (debug) console.log('Segment Tracking :: ', analyticsData)

    const newData = { ...analyticsData }
    const { action } = newData
    delete newData.action

    if (window && window.analytics) {
      window.analytics.track(action, newData)
    }
  },

  /**
   * Render string script
   * @returns {String} String script to be included in the document head
   */
  getScript({ key: segmentAnalytics }) {
    const opts = {
      apiKey: segmentAnalytics.writeKey,
      page: true, // Set this to `false` if you want to manually fire `analytics.page()` from within your pages.
    }

    if (segmentAnalytics.skipMinimize === true) {
      return snippet.max(opts)
    }

    return snippet.min(opts)
  },
}

export default segmentProvider
