import useAppState from '@hooks/useAppState'
import { UnitMeasurements } from '@components/common'
import IngredientInfo from './IngredientInfo'
import AllergenInfo from './AllergenInfo'
import messages from './messages'
import { TextInfo, ItemBlockContent, ManufacturerBlock } from './elements'

const ProductInfo = ({ product, locale }) => {
  const { intl } = useAppState()
  const {
    dietTypeDescription,
    placeOfItemActivityInformation,
    consumerUsageInstructions,
    consumerStorageInstructions,
    percentageOfAlcoholByVolume,
    consumerSalesConditions,
    safetyInformation,
    manufacturersOfTradeItem,
    width,
    height,
    depth,
    grossWeight,
    packaging,
    additionalInformation,
    extId,
    gtin,
  } = product

  // console.log('###', product, promotions)

  const hasDimension = width?.value > 0 && height?.value > 0 && depth?.value > 0

  return (
    <>
      <IngredientInfo product={product} locale={locale} intl={intl} />
      <AllergenInfo product={product} locale={locale} intl={intl} />

      {dietTypeDescription && dietTypeDescription[locale] && (
        <ItemBlockContent title={intl.formatMessage(messages.dietaryInfo)}>
          <TextInfo>{dietTypeDescription[locale]}</TextInfo>
        </ItemBlockContent>
      )}
      {placeOfItemActivityInformation?.countryOfOriginStatement?.[locale] && (
        <ItemBlockContent title={intl.formatMessage(messages.countryOfOrigin)}>
          <TextInfo>{placeOfItemActivityInformation.countryOfOriginStatement[locale]}</TextInfo>
        </ItemBlockContent>
      )}
      {consumerUsageInstructions && consumerUsageInstructions[locale] && (
        <ItemBlockContent title={intl.formatMessage(messages.consumerUsageInstructions)}>
          <TextInfo>{consumerUsageInstructions[locale]}</TextInfo>
        </ItemBlockContent>
      )}
      {consumerStorageInstructions && consumerStorageInstructions[locale] && (
        <ItemBlockContent title={intl.formatMessage(messages.consumerStorageInstructions)}>
          <TextInfo>{consumerStorageInstructions[locale]}</TextInfo>
        </ItemBlockContent>
      )}
      {percentageOfAlcoholByVolume && (
        <ItemBlockContent title={intl.formatMessage(messages.percentageOfAlcoholByVolume)}>
          <TextInfo>{percentageOfAlcoholByVolume}%</TextInfo>
        </ItemBlockContent>
      )}
      {consumerSalesConditions?.length > 0 && (
        <ItemBlockContent title={intl.formatMessage(messages.minimumAgeRequirement)}>
          {consumerSalesConditions.map(condition => {
            if (condition?.consumerSalesConditionName && condition.consumerSalesConditionName[locale]) {
              return (
                <div key={`key-${condition.consumerSalesConditionName[locale]}`}>
                  <TextInfo>{condition.consumerSalesConditionName[locale]}</TextInfo>
                </div>
              )
            }
            return null
          })}
        </ItemBlockContent>
      )}
      {safetyInformation?.length > 0 && (
        <ItemBlockContent title={intl.formatMessage(messages.safetyInformation)}>
          <TextInfo>
            {safetyInformation[0].precautionaryStatements[0].precautionaryStatementsDescription[locale]}
          </TextInfo>
        </ItemBlockContent>
      )}
      {manufacturersOfTradeItem?.length > 0 && (
        <ItemBlockContent title={intl.formatMessage(messages.manufacturer)}>
          {manufacturersOfTradeItem.map((i, k) => (
            /* eslint-disable-next-line react/no-array-index-key */
            <ManufacturerBlock key={k}>
              <TextInfo>{i.partyName}</TextInfo>
              {i.partyAddress.split(',').map((item, key) => (
                /* eslint-disable-next-line react/no-array-index-key */
                <TextInfo key={key}>{item}</TextInfo>
              ))}
            </ManufacturerBlock>
          ))}
        </ItemBlockContent>
      )}
      {hasDimension && (
        <ItemBlockContent title={intl.formatMessage(messages.dimensions)}>
          <TextInfo>
            {width.value}
            <UnitMeasurements unit={width.measurementUnitCode} /> x {height.value}
            <UnitMeasurements unit={height.measurementUnitCode} /> x {depth.value}
            <UnitMeasurements unit={depth.measurementUnitCode} />
          </TextInfo>
        </ItemBlockContent>
      )}
      {grossWeight?.name && grossWeight.name[locale] && (
        <ItemBlockContent title={intl.formatMessage(messages.weight)}>
          <TextInfo>
            <span>{grossWeight.value || 0}</span>
            <UnitMeasurements unit={grossWeight.measurementUnitCode} />
          </TextInfo>
        </ItemBlockContent>
      )}
      {packaging?.length > 0 && (
        <ItemBlockContent title={intl.formatMessage(messages.packaging)}>
          {packaging.map((item, key) => (
            /* eslint-disable-next-line react/no-array-index-key */
            <div key={key}>
              <TextInfo>{item.packagingTypeName[locale]}</TextInfo>
            </div>
          ))}
        </ItemBlockContent>
      )}

      {additionalInformation && additionalInformation[locale] && (
        <ItemBlockContent title={intl.formatMessage(messages.additionalInformation)}>
          <TextInfo>{additionalInformation[locale]}</TextInfo>
        </ItemBlockContent>
      )}
      <ItemBlockContent title={intl.formatMessage(messages.productIdentifier)}>
        <TextInfo>EXT ID: {extId}</TextInfo>
        <TextInfo>EAN: {gtin}</TextInfo>
      </ItemBlockContent>
    </>
  )
}

export default ProductInfo
