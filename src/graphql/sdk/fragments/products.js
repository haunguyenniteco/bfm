import { gql } from '@apollo/client'

export const nameFragment = gql`
  fragment NameFields on LocaleField {
    en
    fi
    pt
    es
  }
`

export const promotionFragment = gql`
  ${nameFragment}
  fragment PromotionFields on Promotion {
    id
    clicksPromotionPrice
    clicksRebate
    quantity
    #  name {
    #    ...NameFields
    #  }
    #  description {
    #    ...NameFields
    #  }

    #  startsAt
    #  endsAt
  }
`

export const mediaFragment = gql`
  fragment MediaFields on Media {
    mediaStorageKey
    mediaDimensionWidth
    mediaDimensionHeight
    mediaSequence
    mediaTypeCode
  }
`

export const measurementFragment = gql`
  ${nameFragment}
  fragment MeasurementFields on MeasurementUnit {
    value
    name {
      ...NameFields
    }
    measurementUnitCode
  }
`

export const paginationFragment = gql`
  fragment PaginationFields on Pagination {
    pageSize
    page
    nextPage
    prevPage
    totalPages
    totalCount
  }
`

export const nutrientHeaderFragment = gql`
  ${measurementFragment}
  ${nameFragment}
  fragment NutrientHeaderFields on NutrientHeader {
    servingSizes {
      ...MeasurementFields
    }
    nutrientDetails {
      nutrientTypeCode
      nutrientTypeName {
        ...NameFields
      }
      dailyValueIntakePercent
      measurementPrecisionCode
      measurementPrecisionName {
        ...NameFields
      }
      quantityContained {
        ...MeasurementFields
      }
    }
    preparationStateCode
    preparationStateName {
      ...NameFields
    }
    nutrientBasisQuantity {
      ...MeasurementFields
    }
    servingSizeDescription {
      ...NameFields
    }
    dailyValueIntakeReference {
      ...NameFields
    }
    preparationStateDescription {
      ...NameFields
    }
  }
`

export const categoryFragment = gql`
  fragment CategoryFields on Category {
    extId
    name {
      en
    }
    parentName {
      en
    }
    parentExtId
    level
    path
  }
`

export const basicProductFragment = gql`
  ${nameFragment}
  ${mediaFragment}
  ${measurementFragment}
  ${categoryFragment}
  ${promotionFragment}
  fragment BasicProductFields on ProductHit {
    extId
    gtin
    id
    masterProductId
    name {
      ...NameFields
    }
    description {
      ...NameFields
    }
    media {
      ...MediaFields
    }
    placeOfItemActivityInformation {
      countryOfOriginStatement {
        ...NameFields
      }
    }

    tradeItemMarketingMessage {
      ...NameFields
    }

    netContent {
      ...MeasurementFields
    }

    priceComparisonMeasurements {
      ...MeasurementFields
    }

    prices {
      clicksUnitPrice
      clicksUnitPriceWithoutVat
      clicksUnitPriceVatPercent
      bricksUnitPrice
      bricksUnitPriceWithoutVat
      bricksUnitPriceVatPercent
      depositPrice
      depositFactor
      comparisonPrices {
        comparisonPriceText
        comparisonPrice
        unitValue
        measurementUnitCode
        measurementUnitName
      }
    }

    categories {
      ...CategoryFields
    }
    promotions {
      ...PromotionFields
    }
    priceByMeasureTypeCode
    xSellingUnitOfMeasureCode
    xSellingContentIncrement
    xSellingContentInitial
    inventory {
      softBuffer
      hardBuffer
      balance
    }
  }
`

export const facetsFragment = gql`
  fragment FacetFields on Aggregation {
    facets {
      brand {
        value
        count
      }
      countryOfOrigin {
        value
        count
      }
    }
  }
`

export const productSearchFragment = gql`
  ${basicProductFragment}
  ${paginationFragment}
  ${facetsFragment}
  fragment SearchResults on Products {
    items {
      ...BasicProductFields
    }
    aggregations {
      ...FacetFields
    }
    pagination {
      ...PaginationFields
    }
  }
`

export const productDetailsFragment = gql`
  ${nameFragment}
  ${mediaFragment}
  ${measurementFragment}
  ${nutrientHeaderFragment}
  ${promotionFragment}
  fragment ProductFields on Product {
    id
    gtin
    extId
    masterProductId
    brandName
    languageSpecificBrandName {
      ...NameFields
    }
    name {
      ...NameFields
    }
    additionalTradeItemDescription {
      ...NameFields
    }
    tradeItemDescription {
      ...NameFields
    }
    percentageOfAlcoholByVolume
    placeOfItemActivityInformation {
      countryOfOriginStatement {
        ...NameFields
      }
    }
    media {
      ...MediaFields
    }
    prices {
      clicksUnitPrice
      clicksUnitPriceWithoutVat
      clicksUnitPriceVatPercent
      bricksUnitPrice
      bricksUnitPriceWithoutVat
      bricksUnitPriceVatPercent
      depositPrice
      depositFactor
      comparisonPrices {
        comparisonPriceText
        comparisonPrice
        unitValue
        measurementUnitCode
        measurementUnitName
      }
    }
    tradeItemMarketingMessage {
      ...NameFields
    }
    priceComparisonMeasurements {
      ...MeasurementFields
    }
    consumerUsageInstructions {
      ...NameFields
    }
    consumerStorageInstructions {
      ...NameFields
    }
    dietTypeDescription {
      ...NameFields
    }
    consumerSalesConditions {
      consumerSalesConditionName {
        ...NameFields
      }
    }
    promotions {
      ...PromotionFields
    }
    allergenInformation {
      allergen {
        allergenTypeCode
        allergenTypeName {
          ...NameFields
        }
        levelOfContainmentCode
        levelOfContainmentName {
          ...NameFields
        }
      }
      allergenStatement {
        en
        fi
        pt
        es
        xEmphasis {
          fi {
            startAt
            length
          }
          en {
            startAt
            length
          }
          pt {
            startAt
            length
          }
          es {
            startAt
            length
          }
        }
      }
      allergenSpecificationName
      allergenSpecificationAgency
    }
    categories {
      extId
      name {
        ...NameFields
      }
      parentName {
        ...NameFields
      }
      parentExtId
      level
      path
    }
    netWeight {
      ...MeasurementFields
    }
    netContent {
      ...MeasurementFields
    }
    grossWeight {
      ...MeasurementFields
    }
    drainedWeight {
      ...MeasurementFields
    }
    width {
      ...MeasurementFields
    }
    height {
      ...MeasurementFields
    }
    depth {
      ...MeasurementFields
    }
    manufacturersOfTradeItem {
      gln
      partyName
      partyAddress
    }
    functionalName {
      ...NameFields
    }
    additionalInformation {
      ...NameFields
    }
    ingredientStatement {
      ...NameFields
    }
    additionalIngredientStatement {
      ...NameFields
    }
    foodAndBeverageIngredients {
      name {
        ...NameFields
      }
      xNameEmphasis {
        en {
          startAt
          length
        }
        fi {
          startAt
          length
        }
        pt {
          startAt
          length
        }
        es {
          startAt
          length
        }
      }
      sequence
      ingredientContentPercentage
    }
    nutritionalClaimDetails {
      nutritionalClaimTypeCode
      nutritionalClaimTypeName {
        ...NameFields
      }
      nutritionalClaimNutrientElementCode
      nutritionalClaimNutrientElementName {
        ...NameFields
      }
    }
    nutrientHeaders {
      ...NutrientHeaderFields
    }
    safetyInformation {
      precautionaryStatements {
        precautionaryStatementsDescription {
          ...NameFields
        }
      }
    }
    packaging {
      packagingTypeName {
        ...NameFields
      }
    }
    priceByMeasureTypeCode
    xSellingUnitOfMeasureCode
    xSellingContentIncrement
    xSellingContentInitial
    inventory {
      softBuffer
      hardBuffer
      balance
    }
  }
`
