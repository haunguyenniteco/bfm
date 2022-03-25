import { useContext, createContext, useEffect } from 'react'
import Router from 'next/router'
import PropTypes from 'prop-types'
import track, { useTracking } from './track'
import dispatch from './dispatch'
import TRACKING from './constants'

const {
  PRODUCT_LIST_VIEWED,
  PRODUCT_VIEWED,
  PAGE_VIEW,
  ROUTE_CHANGE,
  PRODUCT_ADDED,
  PRODUCT_REMOVED,
  CHECKOUT,
  CHECKOUT_OPTION,
  PAYMENT_INFO_ENTERED,
} = TRACKING

export const AnalyticsContext = createContext()

export const AnalyticsConsumer = AnalyticsContext.Consumer

export const useAnalytics = () => {
  const trackContext = useContext(AnalyticsContext)
  if (trackContext == null) throw Error('useTrack: Please provide AnalyticsContext value.')
  return trackContext
}

const process = ({ page, event, ...props }) => {
  return page ? { event: event || PAGE_VIEW, ...props } : null
}

const AnalyticsProvider = ({ children }) => {
  const { trackEvent } = useTracking()

  const trackCheckout = props => {
    return trackEvent({
      action: CHECKOUT,
      ...props,
    })
  }

  const trackCheckoutOption = props => {
    return trackEvent({
      action: CHECKOUT_OPTION,
      ...props,
    })
  }

  const trackProductListViewed = props => {
    return trackEvent({
      action: PRODUCT_LIST_VIEWED,
      ...props,
    })
  }

  const trackProductViewed = props => {
    return trackEvent({
      action: PRODUCT_VIEWED,
      ...props,
    })
  }

  const trackProductClicked = props => {
    return trackEvent({
      action: PRODUCT_VIEWED,
      ...props,
    })
  }

  const trackProductAdded = props => {
    return trackEvent({
      action: PRODUCT_ADDED,
      ...props,
    })
  }

  const trackProductRemoved = props => {
    return trackEvent({
      action: PRODUCT_REMOVED,
      ...props,
    })
  }

  const trackPurchase = props => {
    return trackEvent({
      action: PAYMENT_INFO_ENTERED,
      ...props,
    })
  }

  const handleRouteChange = url => {
    // This plugin will fire a new event called dg-route-change whenever a route
    // is changed in your DG web application.
    trackEvent({ event: ROUTE_CHANGE, url })
  }

  useEffect(() => {
    Router.events.on('routeChangeStart', handleRouteChange)
    return () => {
      Router.events.off('routeChangeStart', handleRouteChange)
    }
  }, [])

  return (
    <AnalyticsContext.Provider
      value={{
        trackProductListViewed,
        trackCheckout,
        trackCheckoutOption,
        trackProductViewed,
        trackProductClicked,
        trackProductAdded,
        trackProductRemoved,
        trackPurchase,
      }}
    >
      {children}
    </AnalyticsContext.Provider>
  )
}

AnalyticsProvider.propTypes = {
  children: PropTypes.node.isRequired,
}

export default track({}, { dispatch, process })(AnalyticsProvider)
