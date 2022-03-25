import Script from 'next/script'

export const CookieConsent = () => {
  return (
    <>
      {/* This script is from onetrust, but can be replace with any other third party tracking script */}
      <Script
        src="https://cdn.cookielaw.org/scripttemplates/otSDKStub.js"
        type="text/javascript"
        charset="UTF-8"
        data-domain-script="e19825ca-06fb-483d-992b-45c803a6632a"
      />
      <Script id="cookie-consent">{function OptanonWrapper() {}}</Script>
    </>
  )
}
