import { NextSeo } from 'next-seo'
import useAppState from '@hooks/useAppState'
import { PageContainer, PageTitle, PageContent, H2 } from './elements'
import messages from '../messages'

const FavouriteList = () => {
  const { intl } = useAppState()

  return (
    <PageContainer>
      <NextSeo title={intl.formatMessage(messages.pageTitle)} />
      <PageTitle>
        <H2>{intl.formatMessage(messages.pageTitle)}</H2>
      </PageTitle>
      <PageContent>
        <h5>{intl.formatMessage(messages.empty)}</h5>
      </PageContent>
    </PageContainer>
  )
}

FavouriteList.propTypes = {}

export default FavouriteList
