import { FormattedMessage } from 'react-intl'
import { Tabs as TabsUi } from '@components/ui/Tabs/elements'
import TabDescription from './TabDescription'
import TabSimilar from './TabSimilar'
import TabInfo from './TabInfo'
import { StyledTab, StyledTabList, StyledTabPanel } from './elements'
import messages from './messages'

export default function Tabs({ product, locale }) {
  const { nutrientHeaders } = product
  const hasNutrition = nutrientHeaders?.length > 0 && nutrientHeaders[0].nutrientDetails.length > 0

  return (
    <TabsUi key={product.id}>
      {/* Tabs row */}
      <StyledTabList>
        <StyledTab>
          <FormattedMessage {...messages.description} />
        </StyledTab>
        {hasNutrition && (
          <StyledTab>
            <FormattedMessage {...messages.info} />
          </StyledTab>
        )}
        <StyledTab>
          <FormattedMessage {...messages.similarProducts} />
        </StyledTab>
      </StyledTabList>

      {/* Content */}
      <StyledTabPanel>
        <TabDescription product={product} locale={locale} />
      </StyledTabPanel>

      {hasNutrition && (
        <StyledTabPanel>
          <TabInfo nutrition={product.nutrientHeaders} locale={locale} />
        </StyledTabPanel>
      )}

      <StyledTabPanel className="similar-products-tab">
        <TabSimilar masterProductId={product.masterProductId} />
      </StyledTabPanel>
    </TabsUi>
  )
}
