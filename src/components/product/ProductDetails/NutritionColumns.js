import { FormattedMessage } from 'react-intl'
import { UNIT_SYMBOL } from '@lib/constants'
import { getNutrientName } from '@lib/helpers'
import {
  TableTopic,
  ReferenceIntake,
  ReferenceColumnContainer,
  Column,
  Name,
  Banner,
  Circle,
  ReferenceInfo,
} from './elements'
import messages from './messages'

const ReferenceItem = ({ name, quantity, percentage }) => (
  <Column>
    <Name>{name}</Name>
    <Banner>
      {quantity.map(q => (
        <span key={UNIT_SYMBOL[q.measurementUnitCode]}>
          {`${parseFloat(q.value) || 0}${UNIT_SYMBOL[q.measurementUnitCode]}`}
        </span>
      ))}
      <Circle>{percentage}</Circle>
    </Banner>
  </Column>
)

const NutritionColumns = ({ servingSizes, nutrients, dailyValueIntakeReference, locale, nutrientBasisQuantity }) => (
  <>
    <TableTopic>
      <FormattedMessage
        {...messages.perPortion}
        values={{
          portionSize: servingSizes[0]
            ? `(${parseFloat(servingSizes[0].value)}${UNIT_SYMBOL[servingSizes[0].measurementUnitCode]})`
            : '',
        }}
      />
    </TableTopic>
    <ReferenceIntake>
      <ReferenceColumnContainer>
        {nutrients
          .filter(nutrient => nutrient.value)
          .map(nutrient => (
            <ReferenceItem
              key={nutrient.code}
              name={getNutrientName(locale, nutrient)}
              quantity={[...nutrient.value.quantityContained].map(q => {
                const formattedValue =
                  q.value >= 100
                    ? Math.round((q.value / nutrientBasisQuantity.value) * servingSizes[0].value)
                    : ((q.value / nutrientBasisQuantity.value) * servingSizes[0].value).toFixed(2)
                return {
                  ...q,
                  value: formattedValue,
                }
              })}
              percentage={`${Math.round(
                (nutrient.value?.dailyValueIntakePercent / nutrientBasisQuantity.value) * servingSizes[0].value,
              )}%`}
            />
          ))}
      </ReferenceColumnContainer>
      <ReferenceInfo>
        {dailyValueIntakeReference[locale] ? (
          `* ${dailyValueIntakeReference[locale]}`
        ) : (
          <FormattedMessage {...messages.riClause} />
        )}
      </ReferenceInfo>
    </ReferenceIntake>
  </>
)

export default NutritionColumns
