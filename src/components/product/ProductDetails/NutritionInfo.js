/* eslint-disable react/no-array-index-key */
import { groupNutrientDetails } from '@lib/helpers'
import NutritionTable from './NutritionTable'
import NutritionColumns from './NutritionColumns'

const NutritionInfo = ({ nutrition, locale }) => {
  return (
    <>
      {nutrition.map((nutritionItem, rootIndex) => {
        const {
          nutrientDetails,
          servingSizeDescription,
          nutrientBasisQuantity,
          dailyValueIntakeReference,
          servingSizes,
        } = nutritionItem
        const { nutrients, vitamins } = groupNutrientDetails(nutrientDetails)
        return (
          <div key={`nutritionItem-${rootIndex}`}>
            {nutrients.length > 0 && (
              <NutritionTable
                items={nutrients}
                locale={locale}
                servingSizeDescription={servingSizeDescription}
                index={rootIndex}
                nutrientBasisQuantity={nutrientBasisQuantity}
              />
            )}
            {vitamins.length > 0 && (
              <NutritionTable
                vitamins
                items={vitamins}
                locale={locale}
                servingSizeDescription={servingSizeDescription}
                index={rootIndex}
                nutrientBasisQuantity={nutrientBasisQuantity}
              />
            )}
            {servingSizes.length > 0 && (
              <NutritionColumns
                servingSizes={servingSizes}
                nutrients={nutrients}
                dailyValueIntakeReference={dailyValueIntakeReference}
                locale={locale}
                nutrientBasisQuantity={nutrientBasisQuantity}
              />
            )}
          </div>
        )
      })}
    </>
  )
}

export default NutritionInfo
