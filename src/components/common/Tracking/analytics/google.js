import { oneLine, stripIndent } from 'common-tags'
import getAnalyticsData from './getAnalyticsData'

// eslint-disable-next-line no-param-reassign
const onPreInit = defaultDataLayer => {
  const dataLayer = {
    type: typeof defaultDataLayer,
    value: defaultDataLayer,
  }

  if (defaultDataLayer.type === `function`) {
    dataLayer.value = defaultDataLayer.value.toString()
  }

  return dataLayer
}

const generateDefaultDataLayer = (dataLayer, dataLayerName) => {
  let result = `window.${dataLayerName} = window.${dataLayerName} || [];`

  if (dataLayer.type === `function`) {
    result += `window.${dataLayerName}.push((${dataLayer.value})());`
  } else {
    if (dataLayer.type !== `object` || dataLayer.value.constructor !== Object) {
      console.warn(`Oops the plugin option "defaultDataLayer" should be a plain object. "${dataLayer}" is not valid.`)
    }

    result += `window.${dataLayerName}.push(${JSON.stringify(dataLayer.value)});`
  }

  return stripIndent`${result}`
}

const getEnvironmentParamStr = ({ gtmAuth, gtmPreview }) => {
  const str =
    gtmAuth && gtmPreview
      ? oneLine`
      &gtm_auth=${gtmAuth}&gtm_preview=${gtmPreview}&gtm_cookies_win=x
    `
      : ``
  return str
}

const generateGTM = ({ id, environmentParamStr, dataLayerName }) => stripIndent`
  (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
  new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
  j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
  'https://www.googletagmanager.com/gtm.js?id='+i+dl+'${environmentParamStr}';f.parentNode.insertBefore(j,f);
  })(window,document,'script','${dataLayerName}', '${id}');`

const generateGTMIframe = ({ id, environmentParamStr }) =>
  oneLine`<iframe src="https://www.googletagmanager.com/ns.html?id=${id}${environmentParamStr}" height="0" width="0" style="display: none; visibility: hidden"></iframe>`

const googleProvider = {
  name: 'google',

  /**
   * Dispatch method
   * @name dispatch
   * @ignore
   * @param {Object} data Arguments supplied by tracking library
   * @param {Boolean} debug Arguments supplied by tracking to log analyticsData
   * @returns {undefined} No Return
   */
  dispatch(data, debug) {
    const analyticsData = getAnalyticsData(data)
    if (debug) console.log('GM Tracking :: ', analyticsData)
    if (window && window.dgDataLayer) {
      window.dgDataLayer.push(analyticsData)
    }
  },

  init() {
    window.dataLayer = window.dataLayer || []
  },

  /**
   * Render string script
   * @returns {String} String script to be included in the document head
   */
  getScript({ key: id, gtmAuth, gtmPreview, defaultDataLayer = { platform: 'dg' }, dataLayerName = `dgDataLayer` }) {
    let defaultDataLayerCode = ``
    if (defaultDataLayer) {
      const dataLayer = onPreInit(defaultDataLayer)
      defaultDataLayerCode = generateDefaultDataLayer(dataLayer, dataLayerName)
    }

    const environmentParamStr = getEnvironmentParamStr({ gtmAuth, gtmPreview })
    const script = oneLine`${defaultDataLayerCode}${generateGTM({ id, environmentParamStr, dataLayerName })}`
    return script
  },

  getIframe({ key: id, gtmAuth, gtmPreview }) {
    const environmentParamStr = getEnvironmentParamStr({ gtmAuth, gtmPreview })
    return generateGTMIframe({ id, environmentParamStr })
  },
}

export default googleProvider
