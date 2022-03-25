import { FormattedMessage } from 'react-intl'
import { ItemBlockContent, Bold, Ingredients, AllergenNotice } from './elements'
import messages from './messages'

const ascendingByStartAt = (a, b) => a.startAt - b.startAt

const emphasize = (str, ranges) => {
  if (!ranges?.length) {
    return str
  }

  const strParts = []
  let currentIndex = 0

  ranges.sort(ascendingByStartAt).forEach(r => {
    strParts.push({ text: str.slice(currentIndex, r.startAt), bold: false })
    currentIndex += r.startAt - currentIndex
    strParts.push({ text: str.slice(r.startAt, r.startAt + r.length), bold: true })
    currentIndex += r.length
  })
  strParts.push({ text: str.slice(currentIndex), bold: false })

  return strParts.map(part => (part.bold ? <Bold key={part.text}>{part.text}</Bold> : part.text))
}

const IngredientInfo = props => {
  const {
    product: { foodAndBeverageIngredients, ingredientStatement, additionalIngredientStatement },
    locale,
    intl,
  } = props

  const hasIngredients =
    foodAndBeverageIngredients?.length > 0 ||
    (ingredientStatement && ingredientStatement[locale]) ||
    (additionalIngredientStatement && additionalIngredientStatement[locale])

  const IngredientList = () => (
    <>
      {foodAndBeverageIngredients.map((ingredient, index) => (
        <span key={ingredient.name[locale]}>
          {emphasize(ingredient.name[locale], ingredient.xNameEmphasis[locale])}
          {ingredient.ingredientContentPercentage && ` (${ingredient.ingredientContentPercentage}%)`}
          {index !== foodAndBeverageIngredients.length - 1 && ', '}
        </span>
      ))}
    </>
  )

  const IngredientStatements = () => (
    <>
      {ingredientStatement && ingredientStatement[locale] && <>{ingredientStatement[locale]}</>}
      {additionalIngredientStatement && additionalIngredientStatement[locale] && (
        <>{additionalIngredientStatement[locale]}</>
      )}
    </>
  )

  const IngredientText = foodAndBeverageIngredients?.length > 0 ? IngredientList : IngredientStatements

  return (
    <>
      {hasIngredients && (
        <ItemBlockContent title={intl.formatMessage(messages.ingredients)}>
          <Ingredients>
            <IngredientText />
          </Ingredients>
          {foodAndBeverageIngredients?.length > 0 && (
            <AllergenNotice>
              <FormattedMessage
                {...messages.allergenNotice}
                values={{
                  b: str => <Bold>{str}</Bold>,
                }}
              />
            </AllergenNotice>
          )}
        </ItemBlockContent>
      )}
    </>
  )
}

export default IngredientInfo
