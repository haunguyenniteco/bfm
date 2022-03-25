const { gql } = require('apollo-server-micro')

export default gql`
  type Product {
    # Common fields of Product & ProductHit
    # TODO: Maybe merge these
    id: ID!
    extId: String
    gtin: String
    masterProductId: String
    brandName: String
    languageSpecificBrandName: LocaleField
    "Product name. ie description_short"
    name: LocaleField
    descriptionShort: LocaleField
    prices: Price
    media: [Media]
    percentageOfAlcoholByVolume: Float
    placeOfItemActivityInformation: PlaceInfo
    priceComparisonMeasurements: [MeasurementUnit]
    netContent: [MeasurementUnit]
    categories: [Category]
    tradeItemMarketingMessage: LocaleField
    promotions: [Promotion]
    additionalInformation: LocaleField
    additionalTradeItemDescription: LocaleField
    tradeItemDescription: LocaleField
    consumerUsageInstructions: LocaleField
    consumerStorageInstructions: LocaleField
    dietTypeDescription: LocaleField
    consumerSalesConditions: [ConsumerSalesCondition]
    allergenInformation: [AllergenInformation]
    ingredientStatement: LocaleField
    additionalIngredientStatement: LocaleField
    nutritionalClaimDetails: [NutritionalClaim]
    functionalName: LocaleField
    manufacturersOfTradeItem: [ManufacturersOfTradeItem]
    netWeight: MeasurementUnit
    grossWeight: MeasurementUnit
    drainedWeight: MeasurementUnit
    width: MeasurementUnit
    height: MeasurementUnit
    depth: MeasurementUnit
    nutrientHeaders: [NutrientHeader]
    safetyInformation: [SafetyInformation]
    packaging: [Packaging]
    foodAndBeverageIngredients: [FoodAndBeverageIngredient]
    priceByMeasureTypeCode: String
    xSellingUnitOfMeasureCode: String
    xSellingContentIncrement: Float
    xSellingContentInitial: Float
    inventory: Inventory
  }

  type FoodAndBeverageIngredient {
    name: LocaleField
    sequence: Int
    xNameEmphasis: XEmphasis
    ingredientContentPercentage: Float
  }

  type Packaging {
    packagingTypeName: LocaleField
  }

  type SafetyInformation {
    precautionaryStatements: [PrecautionaryStatement]
  }

  type PrecautionaryStatement {
    precautionaryStatementsDescription: LocaleField
  }

  type ManufacturersOfTradeItem {
    gln: String
    partyName: String
    partyAddress: String
  }

  type NutrientHeader {
    servingSizes: [MeasurementUnit]
    nutrientDetails: [NutrientDetail]
    preparationStateCode: String
    preparationStateName: LocaleField
    nutrientBasisQuantity: MeasurementUnit
    servingSizeDescription: LocaleField
    dailyValueIntakeReference: LocaleField
    preparationStateDescription: LocaleField
  }

  type NutrientDetail {
    nutrientTypeCode: String
    nutrientTypeName: LocaleField
    dailyValueIntakePercent: Float
    measurementPrecisionCode: String
    measurementPrecisionName: LocaleField
    quantityContained: [MeasurementUnit]
  }

  type NutritionalClaim {
    nutritionalClaimTypeCode: String
    nutritionalClaimTypeName: LocaleField
    nutritionalClaimNutrientElementCode: String
    nutritionalClaimNutrientElementName: LocaleField
  }

  type ConsumerSalesCondition {
    """
    Restrictions or requirements on the retailer for sales of the Trade Item to the consumer.
    """
    consumerSalesConditionName: LocaleField
    consumerSalesConditionCode: String
  }

  type AllergenInformation {
    allergen: [Allergen]
    allergenSpecificationName: String
    allergenSpecificationAgency: String
    allergenStatement: AllergenStatement
  }

  type Allergen {
    allergenTypeCode: String
    allergenTypeName: LocaleField
    levelOfContainmentCode: String
    levelOfContainmentName: LocaleField
  }

  type Promotion {
    id: String
    type: String
    name: LocaleField
    description: LocaleField
    priority: Int
    bricksUnitPrice: Float
    bricksPromotionPrice: Float
    bricksRebate: Float
    clicksUnitPrice: Float
    clicksPromotionPrice: Float
    clicksRebate: Float
    rebateRate: Int
    startsAt: String
    endsAt: String
    placeIds: [Int]
    freebies: [ProductIdAndQuantity]
    quantity: Int
    productIds: [ProductIdAndQuantity]
  }

  type AllergenStatement {
    fi: String
    en: String
    es: String
    pt: String
    xEmphasis: XEmphasis
  }

  type XEmphasis {
    fi: [XEmphasisValue]
    en: [XEmphasisValue]
    es: [XEmphasisValue]
    pt: [XEmphasisValue]
  }

  type XEmphasisValue {
    startAt: Int
    length: Int
  }

  type Query {
    product(storeId: String!, productId: String!): Product
  }

  type Inventory {
    softBuffer: Int
    hardBuffer: Int
    balance: Int
  }
`
