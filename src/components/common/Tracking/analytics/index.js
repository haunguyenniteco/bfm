/* eslint-disable no-underscore-dangle */
import google from './google'
import segment from './segment'
import ensighten from './ensighten'
import { warnMissingKey } from '../utils'

const analyticsProviders = {
  google,
  segment,
  ensighten,
}

export const AnalyticsManager = {
  providers: [],
  generateScript({ config, provider }) {
    const { key, name } = config
    if (!key) {
      warnMissingKey(`${name} key is required`)
      return
    }

    const { getScript = false } = provider

    if (getScript) {
      const script = document.createElement('script')
      script.innerHTML = getScript(config)
      document.head.insertBefore(script, document.head.childNodes[0])
    }
  },

  generateGTMIframeScript({ config, provider }) {
    const { key, name } = config
    if (!key) {
      warnMissingKey(`${name} key is required`)
      return
    }
    const iframe = provider.getIframe(config)
    const noscript = document.createElement('span')
    noscript.setAttribute('id', 'xx-ga')
    noscript.innerHTML = iframe
    document.body.insertBefore(noscript, document.body.childNodes[0])
  },

  configure(providers = [], includeInDevelopment = false) {
    if (process.env.NODE_ENV === `production` || includeInDevelopment) {
      providers.forEach(providerOption => {
        if (Object.prototype.hasOwnProperty.call(analyticsProviders, providerOption.name)) {
          const provider = analyticsProviders[providerOption.name]
          let currencyCode = ''

          if (!providerOption.currencyCode) {
            warnMissingKey(`${providerOption.name} currencyCode isn't set for ecommerce analytics`)
          } else {
            currencyCode = providerOption.currencyCode
          }
          this.providers.push({ ...provider, currencyCode, debug: includeInDevelopment })

          this.generateScript({ config: providerOption, provider })
          if (providerOption.name === 'google') {
            this.generateGTMIframeScript({ config: providerOption, provider })
          }

          if (typeof provider.init === 'function') {
            provider.init()
          }
        }
      })
    }
  },
}
