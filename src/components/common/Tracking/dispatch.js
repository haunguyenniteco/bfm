import { AnalyticsManager } from './analytics'

/**
 * Dispatch tracking data to providers
 * @name dispatch
 * @param {Object} data Arguments supplied by tracking library
 * @returns {undefined} No Return
 */
export default function dispatch(data) {
  // Dispatch analytics events
  AnalyticsManager.providers.forEach(provider => {
    provider.dispatch({ ...data, currencyCode: provider.currencyCode }, provider.debug)
  })
}
