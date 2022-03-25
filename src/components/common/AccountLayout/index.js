import { Hide } from '@components/ui'
import Sticky from 'react-sticky-el'
import { FormattedMessage } from 'react-intl'
import useAppState from '@hooks/useAppState'
import { SidebarNavigation } from '@components/common'
import { PageContainer, PageContent, Main, SideBar } from './elements'
import messages from './messages'

const items = [
  { name: <FormattedMessage {...messages.account} />, path: '/profile' },
  { name: <FormattedMessage {...messages.orders} />, path: '/orders' },
]
const AccountLayout = ({ children }) => {
  const { isSignedIn } = useAppState()

  return (
    <PageContainer>
      <PageContent>
        <Hide xs sm md>
          <SideBar>
            <Sticky stickyStyle={{ marginTop: 60 }}>{isSignedIn && <SidebarNavigation items={items} />}</Sticky>
          </SideBar>
        </Hide>
        <Main>{children}</Main>
      </PageContent>
    </PageContainer>
  )
}

AccountLayout.propTypes = {}

export default AccountLayout
