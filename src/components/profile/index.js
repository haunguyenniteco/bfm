import { NextSeo } from 'next-seo'
import withAuth from '@lib/withAuth'
import { useEffect } from 'react'
import useAppState from '@hooks/useAppState'
import ComponentError from '@components/common/Error/ComponentError'
import getConfig from 'next/config'
import { useUserDetails } from '@graphql-sdk'
import { FormattedMessage } from 'react-intl'
import AccountSkeletonLoader from '@components/profile/AccountSkeletonLoader'
import Link from '@mui/material/Link'
import { AccountLayout } from '@components/common'
import Typography from '@components/ui/Typography/index'
import { PageContent, PageItem } from './elements'
import messages from './messages'

const Profile = () => {
  const { publicRuntimeConfig = {} } = getConfig() || {}
  const { idpProfileEdit, idpPasswordReset } = publicRuntimeConfig
  const { intl } = useAppState()
  const { data: { currentCustomer } = {}, loading, error, refetch } = useUserDetails()

  // TODO: Handle refetch with apollo defaultOptions
  useEffect(() => {
    if (currentCustomer) {
      refetch()
    }
  })

  if (error) {
    return (
      <AccountLayout allowBackOption={false}>
        <PageContent>
          <Typography variant="h1">
            <FormattedMessage {...messages.pageTitle} />
          </Typography>
          <ComponentError />
        </PageContent>
      </AccountLayout>
    )
  }

  if (loading) {
    return <AccountSkeletonLoader />
  }

  return (
    <AccountLayout>
      <NextSeo title={intl.formatMessage(messages.pageTitle)} />
      <PageContent>
        <Typography variant="h1">
          <FormattedMessage {...messages.pageTitle} />
        </Typography>
        <PageItem>
          <Typography fontWeight="bold">
            {currentCustomer?.firstName} {currentCustomer?.lastName}
          </Typography>
          <Typography> {currentCustomer?.email}</Typography>
          <br />
          {idpProfileEdit && (
            <Link color="primary" href={idpProfileEdit}>
              {intl.formatMessage(messages.manage)}
            </Link>
          )}
          <br /> <br />
          {idpPasswordReset && (
            <Link color="primary" href={idpPasswordReset}>
              {intl.formatMessage(messages.reset)}
            </Link>
          )}
        </PageItem>
      </PageContent>
    </AccountLayout>
  )
}

export default withAuth(Profile)
