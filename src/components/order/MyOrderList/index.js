import { NextSeo } from 'next-seo'
import { useEffect } from 'react'
import { useRouter } from 'next/router'
import withAuth from '@lib/withAuth'
import { FormattedMessage } from 'react-intl'
import useAppState from '@hooks/useAppState'
import { AccountLayout } from '@components/common/index'
import useChangeLanguage from '@hooks/useChangeLanguage'
import { useOrderList, useStoreInfo } from '@graphql-sdk'
import ComponentError from '@components/common/Error/ComponentError'
import OrdersSkeletonloader from '@components/order/OrdersSkeletonLoader'
import messages from '../messages'
import { PageContent, PageTitle } from '../elements'
import OrderList from './List/OrderList'

const MyOrderList = () => {
  const router = useRouter()
  const { intl, storeId, isSignedIn } = useAppState()
  const { locale } = useChangeLanguage()
  const variables = { locale }
  const { data: { storeInfo } = {} } = useStoreInfo({ storeId })
  const { data, loading, error, refetch } = useOrderList(variables)
  const { orders } = data || {}
  // TODO: Handle refetch with apollo defaultOptions
  useEffect(() => {
    if (orders) {
      refetch()
    }
  })

  if (error) return <ComponentError />

  if (loading) return <OrdersSkeletonloader />

  return (
    <AccountLayout>
      <NextSeo title={intl.formatMessage(messages.pageTitle)} data-cy="pageSeo" />
      <PageContent>
        <PageTitle data-cy="pageTitle">
          <FormattedMessage {...messages.pageTitle} />
        </PageTitle>
        {isSignedIn && <OrderList orders={orders?.items} storeInfo={storeInfo} />}
      </PageContent>
    </AccountLayout>
  )
}

MyOrderList.prototype = {}

export default withAuth(MyOrderList)
