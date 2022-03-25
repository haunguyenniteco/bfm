import { useEffect } from 'react'
import { Loading } from '@components/ui'
import { useSession, signIn } from 'next-auth/react'
import { useApolloClient } from '@apollo/client'
import { useSigninCustomer } from '@graphql-sdk'
import { useRouter } from 'next/router'
import useAuth from '@hooks/useAuth'
import { toast } from 'react-toastify'
import useAppState from '@hooks/useAppState'
import Button from '@components/ui/Button'
import { AuthLayout, CheckoutContainer } from '@components/common'
import Typography from '@components/ui/Typography/index'
import messages from '../messages'

const OauthSignIn = () => {
  const router = useRouter()
  const { data: session, status } = useSession()
  const loading = status === 'loading'
  const apolloClient = useApolloClient()
  const signinCustomer = useSigninCustomer()
  const auth = useAuth()
  const { intl } = useAppState()
  const redirectUrl = router.query?.redirectUrl || '/'

  const fetchData = async () => {
    try {
      const { data: { signinCustomer: authData } = {} } = await signinCustomer()
      if (!authData.accessToken) return
      auth.signIn(authData, apolloClient)
    } catch (error) {
      toast.error(intl.formatMessage(messages.errorMessage))
      console.log(error)
    }
  }

  useEffect(() => {
    // Do client sign in
    if (session) {
      fetchData()
    }
  }, [session])

  if (!session && !loading) {
    return (
      <AuthLayout seoTitle={intl.formatMessage(messages.pageTitle)} allowBackOption={false}>
        <CheckoutContainer
          headerComponent={
            <Typography variant="h1" data-cy="header-title" textAlign="center">
              {intl.formatMessage(messages.pageDetails)}
            </Typography>
          }
          footerComponent={
            <Button
              fullWidth
              variant="contained"
              onClick={() =>
                signIn(
                  'azure-ad-b2c',
                  { callbackUrl: `${process.env.NEXTAUTH_URL}/auth/signin?redirectUrl=${redirectUrl}` },
                  { prompt: 'login' },
                )
              }
            >
              {intl.formatMessage(messages.pageAction)}
            </Button>
          }
        />
      </AuthLayout>
    )
  }
  return <Loading title="" />
}

export default OauthSignIn
