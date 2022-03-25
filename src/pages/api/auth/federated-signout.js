import getConfig from 'next/config'
import { getToken } from 'next-auth/jwt'

const { publicRuntimeConfig = {} } = getConfig() || {}
const { tenantName, loginFlow } = publicRuntimeConfig
const secret = process.env.AUTH_CLIENT_SECRET

export default async function signout(req, res) {
  try {
    const token = await getToken({ req, secret })
    if (!token) {
      console.debug('No JWT token found when calling /federated-signout endpoint')
      return res?.redirect(process.env.NEXTAUTH_URL)
    }
    // Uncomment this if supported by idp
    // if (!token.idToken) {
    //   console.debug("Without an id_token the user won't be redirected back from the IdP after logout.")
    // }

    const endsessionURL = `https://${tenantName}.b2clogin.com/${tenantName}.onmicrosoft.com/${loginFlow}/oauth2/v2.0/logout`
    const endsessionParams = new URLSearchParams({
      // Uncomment this if supported by idp
      // id_token_hint: token.idToken,
      post_logout_redirect_uri: `${process.env.NEXTAUTH_URL}/signout`,
    })
    return res?.redirect(`${endsessionURL}?${endsessionParams}`)
  } catch (error) {
    console.debug(error)
    res.redirect(process.env.NEXTAUTH_URL)
  }
}
