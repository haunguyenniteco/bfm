import { ItemBlockContent, AllergenList, AllergenListItem } from './elements'
import messages from './messages'

const AllergenInfo = props => {
  const {
    product: { allergenInformation },
    locale,
    intl,
  } = props

  const hasAllergenInfo = allergenInformation?.length > 0

  const AllergenItem = ({ allergenItem }) => {
    const { allergen, allergenStatement } = allergenItem
    return (
      <>
        {allergen.length > 0
          ? allergen.map(substance => {
              return (
                <AllergenListItem key={substance?.allergenTypeCode}>
                  {`${substance.levelOfContainmentName[locale]}: ${substance.allergenTypeName[locale]}`}
                </AllergenListItem>
              )
            })
          : allergenStatement[locale] || '-'}
      </>
    )
  }

  return (
    <>
      {hasAllergenInfo && (
        <ItemBlockContent title={intl.formatMessage(messages.allergenInfo)}>
          <AllergenList>
            {allergenInformation.map((allergenItem, index) => {
              return <AllergenItem allergenItem={allergenItem} key={`allergenIndex-${index}`} />
            })}
          </AllergenList>
        </ItemBlockContent>
      )}
    </>
  )
}

export default AllergenInfo
